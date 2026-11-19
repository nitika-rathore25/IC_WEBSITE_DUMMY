"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import JSZip from "jszip";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  X,
  BarChart3,
  LineChartIcon,
  AreaChartIcon,
  PieChartIcon,
  Maximize2,
  Minimize2,
  Download,
  Palette,
  Table as TableIcon,
  Pin,
  Plus,
  Loader2,
  Layers,
  ScatterChart,
  TreePine,
  TypeIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

// import dynamic from "next/dynamic";
import "highcharts/highcharts-more";
import "highcharts/modules/treemap";
import "highcharts/modules/wordcloud";
import { useTheme } from "@/providers/theme-provider";

interface WordCloudData {
  series: Array<{
    name: string;
    weight: number;
  }>;
}

interface EnhancedCsvData {
  cols: string[];
  x_axis: {
    title: string;
    categories: string[];
  };
  y_axis: Array<{
    title: string;
    unit: string;
  }>;
  chart_data: {
    data: Array<{
      name: string;
      data: number[];
    }>;
  };
  word_cloud_data?: {
    [key: string]: WordCloudData;
  };
  data_type?: string;
}

interface FallbackData {
  csvData?: EnhancedCsvData;
  responseType?: string;
}

type ChartType =
  | "bar"
  | "line"
  | "area"
  | "pie"
  | "table"
  | "stacked-bar"
  | "combination"
  | "scatter"
  | "column"
  | "bubble"
  | "treemap"
  | "wordcloud";

interface ChartConverterProps {
  fallbackData?: FallbackData;
  messageId: string;
  onClose: () => void;
  chartId: string;
}

const CHART_COLORS = [
  "#8B5CF6",
  "#4C1D95",
  "#A78BFA",
  "#632dbaff",
  "#6B46C1",
  "#7C3AED",
  "#581C87",
  "#F472B6",
  "#7C2D98",
  "#8B7FD1",
  "#9333EA",
  "#C084FC",
  "#A855F7",
  "#5790daff",
  "#E879F9",
  "#A0AEC0",
  "#810febff",
];

export function ChartConverter({
  fallbackData,
  onClose,
  messageId,
  chartId,
}: ChartConverterProps) {
  const [chartType, setChartType] = useState<ChartType>("column");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const { theme } = useTheme();
  const chartReference = useRef<HTMLDivElement | null>(null);
  const [isCreateDashboardOpen, setIsCreateDashboardOpen] = useState(false);
  const [dashboardName, setDashboardName] = useState("");
  const [dashboardDescription, setDashboardDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const projectId = params.id as string;
  const [dashboards, setDashboards] = useState<any[]>([]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     (window as any).JSZip = JSZip;
  //   }
  // }, []);
  // Safe access to fallback data
  const csvData = fallbackData?.csvData;
  const usingFallback = !!csvData;
  const dataType = csvData?.data_type || "numeric";
  const shouldShowOnlyTable = dataType === "mixed" || dataType === "categorical"; 
  const canShowCharts = dataType === "numeric";

  // Determine data type and whether to show charts with safe access
  // const dataType = csvData?. || "numeric";
  // const canShowCharts = dataType === "numeric";
  // const shouldShowOnlyTable =
  //   dataType === "categorical" || dataType === "mixed";

  // Convert CSV data to table format with safe access
  // function csvDataToTableData(csvData: EnhancedCsvData) {
  //   if (!csvData || !csvData.cols || !csvData.chart_data) {
  //     return { headers: [], rows: [] };
  //   }

  //   const headers = csvData.cols;
  //   const categories = csvData.x_axis?.categories || [];
  //   const chartData = csvData.chart_data.data || [];

  //   const rows: string[][] = [];

  //   // Create rows for each category
  //   categories.forEach((category, index) => {
  //     const row: string[] = [category];

  //     // Add data for each series
  //     chartData.forEach((series) => {
  //       if (series.data[index] !== undefined) {
  //         row.push(series.data[index].toString());
  //       }
  //     });

  //     rows.push(row);
  //   });

  //   return { headers, rows };
  // }

  function csvDataToTableData(csvData: EnhancedCsvData) {
  if (
    !csvData ||
    !Array.isArray(csvData.cols) ||
    !csvData.chart_data ||
    !Array.isArray(csvData.chart_data.data) ||
    !Array.isArray(csvData.x_axis?.categories)
  ) {
    return { headers: [], rows: [] };
  }

  const headers = csvData.cols;
  const categories = csvData.x_axis.categories;
  const chartData = csvData.chart_data.data;

  const rows: string[][] = [];

  categories.forEach((category, index) => {
    const row: string[] = [String(category ?? "")];

    chartData.forEach((series) => {
      const rawValue = series?.data?.[index];

      // ✅ SAFE conversion
      if (rawValue === null || rawValue === undefined) {
        row.push(""); // empty cell
      } else if (typeof rawValue === "number" && !Number.isNaN(rawValue)) {
        row.push(String(rawValue));
      } else {
        row.push(String(rawValue)); // fallback for strings, booleans, etc.
      }
    });

    rows.push(row);
  });

  return { headers, rows };
}


  // Get effective table data from fallback
  const effectiveTableData = useMemo(() => {
    if (usingFallback && csvData) {
      return csvDataToTableData(csvData);
    }
    return { headers: [], rows: [] };
  }, [usingFallback, csvData]);

  const [processedData, setProcessedData] = useState<any[]>([]);

  // Check if we have multiple columns for stacked charts with safe access
  // const hasMultipleColumns = useMemo(() => {
  //   if (usingFallback && csvData) {
  //     return (csvData.chart_data.data.length || 0) > 1;
  //   }
  //   return effectiveTableData.headers.length > 1;
  // }, [usingFallback, csvData, effectiveTableData]);

  // Check if we have multiple columns for stacked charts with safe access
  const hasMultipleColumns = useMemo(() => {
    if (usingFallback && csvData) {
      // Check if we have word cloud data - if so, return false since word cloud doesn't need multiple columns
      if (csvData.word_cloud_data) {
        return false;
      }
      // For regular chart data, check if chart_data exists and has multiple series
      return (csvData.chart_data?.data?.length || 0) > 1;
    }
    return effectiveTableData.headers.length > 1;
  }, [usingFallback, csvData, effectiveTableData]);

  // useEffect(() => {
  //   // Handle the new CSV data structure
  //   if (usingFallback && csvData) {
  //     const categories = csvData.x_axis?.categories || [];
  //     const chartData = csvData.chart_data?.data || [];
  //     const columns = csvData.cols || [];

  //     const processed = categories.map((category, index) => {
  //       const dataPoint: any = { name: category };

  //       // Add all series data
  //       chartData.forEach((series, seriesIndex) => {
  //         if (columns[seriesIndex]) {
  //           dataPoint[columns[seriesIndex]] = series.data[index] || 0;
  //         }
  //       });

  //       return dataPoint;
  //     });

  //     setProcessedData(processed);

  //     // Auto-select first column if available
  //     if (columns.length > 0 && selectedColumns.length === 0) {
  //       setSelectedColumns([columns[0]]);
  //     }
  //     return;
  //   }

  //   // If no fallback data, set empty processed data
  //   setProcessedData([]);
  // }, [usingFallback, csvData, selectedColumns]);

  useEffect(() => {
    // Handle the new CSV data structure
    if (usingFallback && csvData) {
      // If we have word cloud data, don't process as regular chart data
      if (csvData.word_cloud_data) {
        setProcessedData([]);
        return;
      }

      const categories = csvData.x_axis?.categories || [];
      const chartData = csvData.chart_data?.data || [];
      const columns = csvData.cols || [];

      const processed = categories.map((category, index) => {
        const dataPoint: any = { name: category };

        // Add all series data
        chartData.forEach((series, seriesIndex) => {
          if (columns[seriesIndex]) {
            dataPoint[columns[seriesIndex]] = series.data[index] || 0;
          }
        });

        return dataPoint;
      });

      setProcessedData(processed);

      // Auto-select first column if available
      if (columns.length > 0 && selectedColumns.length === 0) {
        setSelectedColumns([columns[0]]);
      }
      return;
    }

    // If no fallback data, set empty processed data
    setProcessedData([]);
  }, [usingFallback, csvData, selectedColumns]);

  // const numericColumns = useMemo(() => {
  //   if (usingFallback && csvData) {
  //     // For fallback data, assume all columns are numeric since they come from chart data
  //     return csvData.cols || [];
  //   }
  //   return [];
  // }, [usingFallback, csvData]);
  const numericColumns = useMemo(() => {
    if (usingFallback && csvData) {
      // For word cloud data, return empty array since there are no numeric columns
      if (csvData.word_cloud_data) {
        return [];
      }
      // For fallback data, assume all columns are numeric since they come from chart data
      return csvData.cols || [];
    }
    return [];
  }, [usingFallback, csvData]);

  // const columnsToShow =
  //   selectedColumns.length > 0 ? selectedColumns : numericColumns.slice(0, 1);

  // const strokeColor = theme === "dark" ? "#fff" : "#374151";

  // Chart selector - always include table as last option
  const availableChartTypes = useMemo(() => {
    const hasWordCloudData = fallbackData?.csvData?.word_cloud_data;

    // If we have word cloud data, only show word cloud
    if (hasWordCloudData) {
      return [
        { type: "wordcloud" as ChartType, icon: TypeIcon, label: "Word Cloud" },
      ];
    }
    const baseCharts = [
      { type: "table" as ChartType, icon: TableIcon, label: "Table" },
    ];

     if (shouldShowOnlyTable) {
    return baseCharts;
     }
  
    // Only add chart types if data is numeric
     if (canShowCharts && ((hasMultipleColumns) || (numericColumns.length > 0))) {
      const chartTypes = [
        { type: "column" as ChartType, icon: BarChart3, label: "Column" },
        { type: "bar" as ChartType, icon: BarChart3, label: "Bar" },
        { type: "line" as ChartType, icon: LineChartIcon, label: "Line" },
        { type: "area" as ChartType, icon: AreaChartIcon, label: "Area" },
        { type: "pie" as ChartType, icon: PieChartIcon, label: "Pie" },
        { type: "scatter" as ChartType, icon: ScatterChart, label: "Scatter" },
        { type: "bubble" as ChartType, icon: ScatterChart, label: "Bubble" },
        { type: "treemap" as ChartType, icon: TreePine, label: "Treemap" },
        // { type: "wordcloud" as ChartType, icon: TypeIcon, label: "Wordcloud" },
      ];

      // Add stacked charts only if we have multiple columns
      if (hasMultipleColumns) {
        chartTypes.splice(2, 0, {
          type: "stacked-bar" as ChartType,
          icon: Layers,
          label: "Stacked",
        });
        chartTypes.splice(8, 0, {
          type: "combination" as ChartType,
          icon: Layers,
          label: "Combination",
        });
      }

      // Return charts first, then table as last option
      return [...chartTypes, ...baseCharts];
    }

    // For non-numeric data, only show table
    return baseCharts;
  // }, [hasMultipleColumns, numericColumns.length]);
  }, [hasMultipleColumns, numericColumns.length, shouldShowOnlyTable, canShowCharts, fallbackData]);


  // Set default chart type based on data type
  // useEffect(() => {
  //   if (processedData.length > 0) {
  //     setChartType("column");
  //   } else {
  //     setChartType("table");
  //   }
  // }, [processedData.length]);

  useEffect(() => {
    const hasWordCloudData = fallbackData?.csvData?.word_cloud_data;

  //   if (hasWordCloudData) {
  //     setChartType("wordcloud");
  //   } else if (processedData.length > 0) {
  //     setChartType("column");
  //   } else {
  //     setChartType("table");
  //   }
  // }, [processedData.length, fallbackData]);

    if (hasWordCloudData) {
    setChartType("wordcloud");
  } else if (shouldShowOnlyTable) {
    // Force table view for mixed or categorical data type
    setChartType("table");
  } else if (processedData.length > 0 && canShowCharts) {
    setChartType("column");
  } else {
    setChartType("table");
  }
}, [processedData.length, fallbackData, shouldShowOnlyTable, canShowCharts]);

  // const toggleColumnSelection = (column: string) => {
  //   setSelectedColumns((prev) =>
  //     prev.includes(column)
  //       ? prev.filter((c) => c !== column)
  //       : [...prev, column]
  //   );
  // };

  // Table rendering
  const renderTable = () => {
    const data = effectiveTableData;
    const isDark = theme === "dark";

    // More comprehensive check for empty data
    if (
      !data ||
      !data.headers ||
      data.headers.length === 0 ||
      !data.rows ||
      data.rows.length === 0
    ) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400">
          <div className="text-center">
            <TableIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No data available to display</p>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`overflow-auto h-96 w-full rounded border ${
          isDark ? "bg-white/10 border-white/20" : "bg-white border-gray-300"
        }`}
      >
        <table
          className={`min-w-full border-collapse text-xs ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          <thead className="bg-linear-to-r from-purple-500 to-pink-500 text-light sticky top-0 z-10">
            <tr>
              {data.headers.map((header, i) => (
                <th
                  key={i}
                  className={`px-4 py-2 font-semibold border text-center align-middle ${
                    isDark
                      ? "bg-linear-to-r from-purple-950/80 to-purple-700/50 border-white/10"
                      : ""
                  }`}
                >
                  {header || `Column ${i + 1}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr
                key={i}
                className={
                  isDark
                    ? i % 2
                      ? "bg-white/5"
                      : "bg-black/20"
                    : i % 2
                    ? "bg-purple-50"
                    : "bg-white"
                }
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-4 py-2 border text-center align-middle ${
                      isDark ? "border-white/10" : "border-slate-300"
                    }`}
                  >
                    {cell || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Format numbers for Highcharts tooltips and labels
  const formatNumber = (value: number): string => {
    if (value === 0) return "0";

    const absValue = Math.abs(value);
    const sign = value < 0 ? "-" : "";

    if (absValue >= 1e12) return `${sign}${(absValue / 1e12).toFixed(1)}T`;
    if (absValue >= 1e9) return `${sign}${(absValue / 1e9).toFixed(1)}B`;
    if (absValue >= 1e6) return `${sign}${(absValue / 1e6).toFixed(1)}M`;
    if (absValue >= 1e3) return `${sign}${(absValue / 1e3).toFixed(1)}K`;

    if (absValue >= 1) return value.toString();
    if (absValue >= 0.01) return value.toFixed(2);
    if (absValue >= 0.001) return value.toFixed(3);

    return value.toExponential(1);
  };

  // Highcharts configuration generator
  const getHighchartsOptions = (): Highcharts.Options => {
    const isDark = theme === "dark";
    const textColor = isDark ? "#fff" : "#374151";
    const gridColor = isDark ? "#4B5563" : "#E5E7EB";

    const baseOptions: Highcharts.Options = {
      chart: {
        backgroundColor: "transparent",
        style: {
          fontFamily: "inherit",
        },
      },
      title: {
        text: undefined,
      },
      credits: {
        enabled: false,
      },
      legend: {
        itemStyle: {
          color: textColor,
        },
        itemHoverStyle: {
          color: textColor,
        },
      },
      xAxis: {
        lineColor: gridColor,
        tickColor: gridColor,
        labels: {
          style: {
            color: textColor,
          },
        },
        title: {
          style: {
            color: textColor,
          },
        },
      },
      yAxis: {
        lineColor: gridColor,
        tickColor: gridColor,
        labels: {
          style: {
            color: textColor,
          },
          formatter: function () {
            return formatNumber(this.value as number);
          },
        },
        title: {
          style: {
            color: textColor,
          },
        },
        gridLineColor: isDark ? "#374151" : "#F3F4F6",
      },
      tooltip: {
        backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
        borderColor: isDark ? "#374151" : "#E5E7EB",
        style: {
          color: textColor,
        },
      },
      plotOptions: {
        series: {
          animation: {
            duration: 300,
          },
        },
      },
    };

    if (!usingFallback || !csvData) {
      return baseOptions;
    }

    const columns = csvData.cols || [];
    const categories = csvData.x_axis?.categories || [];
    const chartData = csvData.chart_data?.data || [];

    // Process data based on API response structure
    const processedData = chartData.map((series) => ({
      name: series.name,
      data: series.data.map((value, index) => ({
        name: categories[index] || `Category ${index + 1}`,
        y: Number(value) || 0,
      })),
    }));

    // Bar Chart - Horizontal
    if (chartType === "bar") {
      const series: Highcharts.SeriesBarOptions[] = chartData.map(
        (seriesItem, index) => ({
          name: seriesItem.name,
          type: "bar",
          data: seriesItem.data.map((value) => Number(value) || 0),
          color: CHART_COLORS[index % CHART_COLORS.length],
        })
      );

      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: "bar",
        },
        xAxis: {
          ...baseOptions.xAxis,
          type: "category",
          categories: categories,
          title: {
            ...((baseOptions.xAxis as Highcharts.XAxisOptions)?.title || {}),
            text: csvData.x_axis?.title || "",
          },
        },
        yAxis: {
          ...baseOptions.yAxis,
          title: {
            ...((baseOptions.yAxis as Highcharts.YAxisOptions)?.title || {}),
            text: csvData.y_axis?.[0]?.title || "",
          },
        },
        series: series,
        tooltip: {
          ...baseOptions.tooltip,
          headerFormat: "<b>{point.key}</b><br/>",
          pointFormat: "{series.name}: <b>{point.y}</b>",
        },
      };
    }

    // Column Chart (vertical bars)
    if (chartType === "column") {
      const series: Highcharts.SeriesColumnOptions[] = chartData.map(
        (seriesItem, index) => ({
          name: seriesItem.name,
          type: "column",
          data: seriesItem.data.map((value) => Number(value) || 0),
          color: CHART_COLORS[index % CHART_COLORS.length],
        })
      );

      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: "column",
        },
        xAxis: {
          ...baseOptions.xAxis,
          type: "category",
          categories: categories,
          title: {
            ...((baseOptions.xAxis as Highcharts.XAxisOptions)?.title || {}),
            text: csvData.x_axis?.title || "",
          },
        },
        yAxis: {
          ...baseOptions.yAxis,
          title: {
            ...((baseOptions.yAxis as Highcharts.YAxisOptions)?.title || {}),
            text: csvData.y_axis?.[0]?.title || "",
          },
        },
        series: series,
        tooltip: {
          ...baseOptions.tooltip,
          headerFormat: "<b>{point.key}</b><br/>",
          pointFormat: "{series.name}: <b>{point.y}</b>",
        },
      };
    }

    // Stacked Bar Chart
    if (chartType === "stacked-bar") {
      const series: Highcharts.SeriesColumnOptions[] = chartData.map(
        (seriesItem, index) => ({
          name: seriesItem.name,
          type: "column",
          data: seriesItem.data.map((value) => Number(value) || 0),
          color: CHART_COLORS[index % CHART_COLORS.length],
        })
      );

      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: "column",
        },
        xAxis: {
          ...baseOptions.xAxis,
          categories: categories,
          title: {
            ...((baseOptions.xAxis as Highcharts.XAxisOptions)?.title || {}),
            text: csvData.x_axis?.title || "",
          },
        },
        yAxis: {
          ...baseOptions.yAxis,
          title: {
            ...((baseOptions.yAxis as Highcharts.YAxisOptions)?.title || {}),
            text: csvData.y_axis?.[0]?.title || "",
          },
        },
        plotOptions: {
          column: {
            stacking: "normal",
          },
        },
        series: series,
        tooltip: {
          ...baseOptions.tooltip,
          headerFormat: "<b>{point.key}</b><br/>",
          pointFormat: "{series.name}: <b>{point.y}</b>",
        },
      };
    }

    // Line Chart
    if (chartType === "line") {
      const series: Highcharts.SeriesLineOptions[] = chartData.map(
        (seriesItem, index) => ({
          name: seriesItem.name,
          type: "line",
          data: seriesItem.data.map((value) => Number(value) || 0),
          color: CHART_COLORS[index % CHART_COLORS.length],
          marker: {
            radius: 4,
          },
        })
      );

      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: "line",
        },
        xAxis: {
          ...baseOptions.xAxis,
          categories: categories,
          title: {
            ...((baseOptions.xAxis as Highcharts.XAxisOptions)?.title || {}),
            text: csvData.x_axis?.title || "",
          },
        },
        yAxis: {
          ...baseOptions.yAxis,
          title: {
            ...((baseOptions.yAxis as Highcharts.YAxisOptions)?.title || {}),
            text: csvData.y_axis?.[0]?.title || "",
          },
        },
        series: series,
      };
    }

    // Area Chart
    if (chartType === "area") {
      const series: Highcharts.SeriesAreaOptions[] = chartData.map(
        (seriesItem, index) => ({
          name: seriesItem.name,
          type: "area",
          data: seriesItem.data.map((value) => Number(value) || 0),
          color: CHART_COLORS[index % CHART_COLORS.length],
        })
      );

      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: "area",
        },
        xAxis: {
          ...baseOptions.xAxis,
          categories: categories,
          title: {
            ...((baseOptions.xAxis as Highcharts.XAxisOptions)?.title || {}),
            text: csvData.x_axis?.title || "",
          },
        },
        yAxis: {
          ...baseOptions.yAxis,
          title: {
            ...((baseOptions.yAxis as Highcharts.YAxisOptions)?.title || {}),
            text: csvData.y_axis?.[0]?.title || "",
          },
        },
        plotOptions: {
          area: {
            fillOpacity: 0.4,
            marker: {
              enabled: false,
            },
          },
        },
        series: series,
      };
    }

    // Pie Chart
    if (chartType === "pie") {
      // For pie chart, we only use the first series as it's typically for single series data
      const firstSeries = chartData[0];
      const data =
        firstSeries?.data.map((value, index) => ({
          name: categories[index] || `Category ${index + 1}`,
          y: Number(value) || 0,
          color: CHART_COLORS[index % CHART_COLORS.length],
        })) || [];

      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: "pie",
        },
        series: [
          {
            name: firstSeries?.name || "Value",
            type: "pie",
            data: data,
          } as Highcharts.SeriesPieOptions,
        ],
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
              style: {
                color: textColor,
              },
            },
          },
        },
      };
    }

    // Scatter Chart
    if (chartType === "scatter") {
      const series: Highcharts.SeriesScatterOptions[] = chartData.map(
        (seriesItem, index) => ({
          name: seriesItem.name,
          type: "scatter",
          data: seriesItem.data.map((value, dataIndex) => ({
            name: categories[dataIndex] || `Category ${dataIndex + 1}`,
            x: dataIndex,
            y: Number(value) || 0,
          })),
          color: CHART_COLORS[index % CHART_COLORS.length],
          marker: {
            radius: 6,
            symbol: "circle",
          },
        })
      );

      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: "scatter",
        },
        xAxis: {
          ...baseOptions.xAxis,
          categories: categories,
          title: {
            ...((baseOptions.xAxis as Highcharts.XAxisOptions)?.title || {}),
            text: csvData.x_axis?.title || "",
          },
        },
        yAxis: {
          ...baseOptions.yAxis,
          title: {
            ...((baseOptions.yAxis as Highcharts.YAxisOptions)?.title || {}),
            text: csvData.y_axis?.[0]?.title || "",
          },
        },
        series: series,
        tooltip: {
          ...baseOptions.tooltip,
          pointFormat:
            '<span style="color:{point.color}">●</span> {series.name}: <b>X: {point.x}, Y: {point.y}</b>',
        },
      };
    }

    // Bubble Chart
    if (chartType === "bubble") {
      const series: Highcharts.SeriesBubbleOptions[] = chartData.map(
        (seriesItem, index) => ({
          name: seriesItem.name,
          type: "bubble",
          data: seriesItem.data.map((value, dataIndex) => ({
            name: categories[dataIndex] || `Category ${dataIndex + 1}`,
            x: dataIndex,
            y: Number(value) || 0,
            z: Math.abs(Number(value)) || 1,
          })),
          color: CHART_COLORS[index % CHART_COLORS.length],
          marker: {
            fillOpacity: 0.7,
          },
        })
      );

      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: "bubble",
        },
        xAxis: {
          ...baseOptions.xAxis,
          categories: categories,
          title: {
            ...((baseOptions.xAxis as Highcharts.XAxisOptions)?.title || {}),
            text: csvData.x_axis?.title || "",
          },
        },
        yAxis: {
          ...baseOptions.yAxis,
          title: {
            ...((baseOptions.yAxis as Highcharts.YAxisOptions)?.title || {}),
            text: csvData.y_axis?.[0]?.title || "",
          },
        },
        series: series,
        tooltip: {
          ...baseOptions.tooltip,
          pointFormat:
            '<span style="color:{point.color}">●</span> {series.name}: <b>X: {point.x}, Y: {point.y}, Size: {point.z}</b>',
        },
      };
    }

    // Treemap Chart
    if (chartType === "treemap") {
      // For treemap, we only use the first series as it's typically for single series data
      const firstSeries = chartData[0];
      const data =
        firstSeries?.data.map((value, index) => ({
          name: categories[index] || `Category ${index + 1}`,
          value: Math.abs(Number(value)) || 1,
          color: CHART_COLORS[index % CHART_COLORS.length],
        })) || [];

      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: "treemap",
        },
        title: {
          text: undefined,
        },
        series: [
          {
            type: "treemap",
            layoutAlgorithm: "squarified",
            data: data,
          } as Highcharts.SeriesTreemapOptions,
        ],
        tooltip: {
          ...baseOptions.tooltip,
          pointFormat: "<b>{point.name}</b>: {point.value}",
        },
      };
    }

    // Combination Chart
    if (chartType === "combination") {
      const series: Highcharts.SeriesOptionsType[] = chartData.map(
        (seriesItem, index) => {
          let type: string;
          if (index === 0) type = "column";
          else if (index === 1) type = "line";
          else type = "area";

          return {
            name: seriesItem.name,
            type: type as any,
            data: seriesItem.data.map((value) => Number(value) || 0),
            color: CHART_COLORS[index % CHART_COLORS.length],
            ...(type === "line" && {
              marker: {
                radius: 4,
              },
            }),
            ...(type === "area" && {
              fillOpacity: 0.4,
            }),
          };
        }
      );

      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
        },
        xAxis: {
          ...baseOptions.xAxis,
          categories: categories,
          title: {
            ...((baseOptions.xAxis as Highcharts.XAxisOptions)?.title || {}),
            text: csvData.x_axis?.title || "",
          },
        },
        yAxis: {
          ...baseOptions.yAxis,
          title: {
            ...((baseOptions.yAxis as Highcharts.YAxisOptions)?.title || {}),
            text: csvData.y_axis?.[0]?.title || "",
          },
        },
        series: series,
      };
    }

    return baseOptions;
  };

  const getWordCloudOptions = (): Highcharts.Options => {
    const isDark = theme === "dark";
    const textColor = isDark ? "#fff" : "#374151";

    // Extract word cloud data from the API response
    const wordCloudData =
      fallbackData?.csvData?.word_cloud_data?.review_body?.series || [];

    const data = wordCloudData.map((item, index) => ({
      name: item.name,
      weight: item.weight,
      color: CHART_COLORS[index % CHART_COLORS.length],
    }));

    return {
      chart: {
        backgroundColor: "transparent",
        type: "wordcloud",
      },
      title: {
        text: undefined,
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          type: "wordcloud",
          data: data,
          rotation: {
            from: -60,
            to: 60,
            orientations: 5,
          },
          name: "Occurrences",
        } as any,
      ],
      tooltip: {
        backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
        borderColor: isDark ? "#374151" : "#E5E7EB",
        style: {
          color: textColor,
        },
        headerFormat: "",
        pointFormat:
          '<span style="color:{point.color}">●</span> <b>{point.name}</b>: {point.weight} occurrences',
      },
    };
  };
  // Chart rendering logic
  const renderChart = () => {
    // Check if we have word cloud data
    const hasWordCloudData = fallbackData?.csvData?.word_cloud_data;

    // If we have word cloud data, only show word cloud
    if (hasWordCloudData) {
      const chartHeight = isFullscreen ? 320 : 384;
      return (
        <div style={{ height: `${chartHeight}px`, width: "100%" }}>
          <HighchartsReact
            highcharts={Highcharts}
            options={getWordCloudOptions()}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      );
    }

    // Always show table if chart type is table
    if (chartType === "table" || shouldShowOnlyTable) {
      return renderTable();
    }

    // If no fallback data or not using charts, show table
    if (!usingFallback || !csvData || !canShowCharts) {
      return renderTable();
    }

    // Custom height calculation based on fullscreen mode
    const chartHeight = isFullscreen ? 320 : 384;

    return (
      <div style={{ height: `${chartHeight}px`, width: "100%" }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={getHighchartsOptions()}
          containerProps={{ style: { height: "100%", width: "100%" } }}
        />
      </div>
    );
  };
  // const renderChart = () => {
  //   // Always show table if chart type is table
  //   if (chartType === "table") {
  //     return renderTable();
  //   }

  //   // If data is categorical or mixed, only show table (even if another chart type is selected)
  //   // if (shouldShowOnlyTable) {
  //   //   return renderTable();
  //   // }

  //   // If no fallback data or not using charts, show table
  //   if (!usingFallback || !csvData) {
  //     return renderTable();
  //   }

  //   // Custom height calculation based on fullscreen mode
  //   const chartHeight = isFullscreen ? 320 : 384; // h-80 = 320px, h-96 = 384px

  //   return (
  //     <div style={{ height: `${chartHeight}px`, width: "100%" }}>
  //       <HighchartsReact
  //         highcharts={Highcharts}
  //         options={getHighchartsOptions()}
  //         containerProps={{ style: { height: "100%", width: "100%" } }}
  //       />
  //     </div>
  //   );
  // };
  const handleCreateDashboard = () => {
    setIsCreateDashboardOpen(false);
    setDashboardName("");
    setDashboardDescription("");
    fetchDashboards();
    setIsDialogOpen(true);
  };

  const createDashboard = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";
      const response = await fetch(`${BASE_URL}/dashboards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `${tokenType} ${token}`,
        },
        body: JSON.stringify({
          name: dashboardName,
          description: dashboardDescription,
          project_id: projectId,
        }),
      });

      const data = await response.json();
      toast.success("Dashboard created successfully!");
      return data;
    } catch (error) {
      toast.error("Failed to create dashboard");
    } finally {
      setLoading(false);
      handleCreateDashboard();
    }
  };

  const fetchDashboards = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      const response = await fetch(
        `${BASE_URL}/projects/${projectId}/dashboards`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `${tokenType} ${token}`,
          },
        }
      );

      const data = await response.json();
      setDashboards(data);
    } catch (err) {}
  };

  const handlePinClick = async (chartId: string) => {
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      // Fetch all dashboards for the project
      const response = await fetch(
        `${BASE_URL}/projects/${projectId}/dashboards`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `${tokenType} ${token}`,
          },
        }
      );

      if (response.ok) {
        const allDashboards = await response.json();
        setDashboards(allDashboards);

        // Find dashboards that contain this chart ID
        const dashboardsWithChart = allDashboards.filter((dashboard: any) =>
          dashboard.ordered_active_chart_ids?.includes(chartId)
        );

        // Find dashboards without this chart ID
        const dashboardsWithoutChart = allDashboards.filter(
          (dashboard: any) =>
            !dashboard.ordered_active_chart_ids?.includes(chartId)
        );

        // If chart exists in any dashboard, select the first one that has it
        if (dashboardsWithChart.length > 0) {
          setSelected(dashboardsWithChart[0].id);
        }
        // If chart doesn't exist in any dashboard, select the first dashboard without it
        else if (dashboardsWithoutChart.length > 0) {
          setSelected(dashboardsWithoutChart[0].id);
        }

        // Open the dialog
        setIsDialogOpen(true);
      }
    } catch (error) {
      toast.error("Failed to check chart across dashboards");
    }
  };

  useEffect(() => {
    fetchDashboards();
  }, [projectId]);

  const addChartData = async (e: any) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";
      const dashboard_ID = selected || dashboards[0]?.id;

      const response = await fetch(
        `${BASE_URL}/dashboards/${dashboard_ID}/charts/${messageId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token ? `${tokenType} ${token}` : "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setIsDialogOpen(false);
      toast.success("Chart data added successfully!");
      fetchDashboards();
      return data;
    } catch (error) {
      toast.error("Failed to add chart data");
    } finally {
      setLoading(false);
    }
  };

  // Add this useEffect to your ChartConverter component
  useEffect(() => {
    if (isDialogOpen && chartId && dashboards.length > 0) {
      // Find the first dashboard that contains this chart
      const dashboardWithChart = dashboards.find((dashboard) =>
        dashboard.ordered_active_chart_ids?.includes(chartId)
      );

      if (dashboardWithChart) {
        setSelected(dashboardWithChart.id);
      } else {
        // If no dashboard has this chart, select the first available dashboard
        setSelected(dashboards[0]?.id || null);
      }
    }
  }, [isDialogOpen, chartId, dashboards]);

  return (
    <div
      className={`mt-4 ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-lg p-4"
          : "relative"
      }`}
    >
      <Card className="bg-white/10 max-w-5xl backdrop-blur-lg border-white/20 h-full flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* <Palette className="h-5 w-5 text-gray-300" /> */}
              <CardTitle className="text-white">Data Visualization</CardTitle>
              {processedData.length > 0 && (
                <Badge className="bg-linear-to-r from-primary to-accent text-light">
                  {processedData.length} records
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              { dataType === "numeric"&&(  
                <Button
                onClick={() => {
                  setIsDialogOpen(true);
                  handlePinClick(chartId);
                }}
                variant="ghost"
                size="sm"
                title="Add to Dashboard"
                className="hover:bg-white/10 dark:text-light"
              >
                <Pin className="w-4 h-4" />
              </Button>)}

              <Button
                onClick={() => setIsFullscreen(!isFullscreen)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Show info message for categorical/mixed data */}
          {shouldShowOnlyTable && (
            <div className="mt-2 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 text-sm">
                <strong>Note:</strong> This data contains {dataType} values. Table view is recommended for better data representation.
              </p>
            </div>
          )}

          <div className="flex items-center space-x-2 mt-3">
            <span className="text-sm text-gray-300">Chart Type:</span>
            <Select
              value={chartType}
              onValueChange={(value) => setChartType(value as ChartType)}
            >
              <SelectTrigger className="text-sm bg-white/10 w-40 border-white/10 hover:bg-white/20 text-white">
                <div className="flex items-center gap-2">
                  {(() => {
                    const SelectedIcon = availableChartTypes.find(
                      (ct) => ct.type === chartType
                    )?.icon;
                    return SelectedIcon ? (
                      <SelectedIcon className="h-4 w-4" />
                    ) : null;
                  })()}
                  <SelectValue />
                </div>
              </SelectTrigger>

              <SelectContent className="w-40">
                {availableChartTypes.map(({ type, icon: Icon, label }) => (
                  <SelectItem key={type} value={type} icon={Icon}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <div className="w-full" ref={chartReference}>
            {renderChart()}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* <DialogContent className="max-w-lg dark:bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-white/20 text-white overflow-visible"> */}
        <DialogContent className="max-w-lg dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) border-white/20 text-white overflow-visible">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Select Dashboard
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            {dashboards.length > 0 ? (
              <>
                <Accordion
                  // type="single"
                  // collapsible
                  className="w-full text-white"
                >
                  <AccordionItem
                    value="dashboards"
                    className="border border-white/10 rounded-lg bg-white/5 overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 rounded-t-l">
                      Select Dashboard
                    </AccordionTrigger>
                    {/* <AccordionContent className="dark:bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-t border-white/10 max-h-52 overflow-y-auto rounded-b-lg"> */}
                    <AccordionContent className="dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) border-t border-white/10 max-h-52 overflow-y-auto rounded-b-lg">
                      {dashboards && dashboards.length > 0 ? (
                        <div className="flex flex-col space-y-2 px-2 py-2">
                          {/* Section 1: Already Selected - Dashboards that contain this chart (NOT SELECTABLE) */}
                          {dashboards.some(
                            (d) =>
                              d.ordered_active_chart_ids?.includes(chartId) &&
                              d.ordered_active_chart_ids.length > 0
                          ) && (
                            <>
                              <h4 className="text-lg font-semibold text-green-400 px-2 py-1">
                                Already Added
                              </h4>
                              {dashboards
                                .filter((d) =>
                                  d.ordered_active_chart_ids?.includes(chartId)
                                )
                                .map((item) => (
                                  <div
                                    key={item.id}
                                    className={cn(
                                      "w-full text-left px-3 py-2 rounded-md flex items-center justify-between cursor-not-allowed"
                                    )}
                                  >
                                    <span>{item.name}</span>
                                  </div>
                                ))}
                              <div className="h-px bg-white/10 my-1" />
                            </>
                          )}

                          {/* Section 2: Select Dashboard - All other dashboards (SELECTABLE) */}
                          {dashboards.some(
                            (d) =>
                              !d.ordered_active_chart_ids?.includes(chartId)
                          ) && (
                            <>
                              <h4 className="text-lg font-semibold text-blue-400 px-2 py-1">
                                Select Dashboard
                              </h4>
                              {dashboards
                                .filter(
                                  (d) =>
                                    !d.ordered_active_chart_ids?.includes(
                                      chartId
                                    )
                                )
                                .map((item) => (
                                  <button
                                    key={item.id}
                                    onClick={() => setSelected(item.id)}
                                    className={cn(
                                      "w-full text-left px-3 py-2 rounded-md transition-colors",
                                      selected === item.id
                                        ? "dark:bg-white/20 text-white"
                                        : "dark:hover:bg-white/10 hover:text-gray-400 text-gray-300"
                                    )}
                                  >
                                    {item.name}
                                  </button>
                                ))}
                            </>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-center py-2 text-sm">
                          No dashboards available
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            ) : (
              <p className="text-gray-400 text-center text-sm">
                No dashboards available
              </p>
            )}
          </div>

          <DialogFooter className="mt-6 flex justify-between gap-2">
            <Button
              onClick={() => {
                setIsDialogOpen(false);
                setIsCreateDashboardOpen(true);
              }}
              variant="default"
              // className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-light hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30"
              className="flex items-center text-light gap-2 bg-linear-to-r from-primary to-accent hover:from-(--primary)/90 hover:to-(--accent)/90 border border-gray-400/70"
            >
              <Plus size={16} />
              Create
            </Button>
            <Button
              disabled={!selected || loading}
              onClick={() => {
                if (!selected) return;
                addChartData(selected);
              }}
              variant="default"
              // className="bg-gradient-to-r from-purple-500 to-pink-500 text-light hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30"
              className="text-light bg-linear-to-r from-primary to-accent hover:from-(--primary)/90 hover:to-(--accent)/90 border border-gray-400/70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Add Chart</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isCreateDashboardOpen}
        onOpenChange={setIsCreateDashboardOpen}
      >
        <DialogContent className="border-white/20 text-white dark:bg-linear-to-r from-primary to-accent">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Create New Dashboard
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="dashboard-name" className="text-white">
                Dashboard Name
              </Label>
              <Input
                id="dashboard-name"
                placeholder="Enter dashboard name"
                value={dashboardName}
                onChange={(e) => setDashboardName(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dashboard-description" className="text-white">
                Description (Optional)
              </Label>
              <Textarea
                id="dashboard-description"
                placeholder="Enter dashboard description"
                value={dashboardDescription}
                onChange={(e) => setDashboardDescription(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-20"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                handleCreateDashboard();
              }}
              disabled={isCreating}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                createDashboard();
              }}
              disabled={isCreating || !dashboardName.trim()}
              // className="bg-gradient-to-r text-light from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              className="text-light border-white/20 border bg-linear-to-r from-primary to-accent hover:from-(--primary)/90 hover:to-(--accent)/90"
            >
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
