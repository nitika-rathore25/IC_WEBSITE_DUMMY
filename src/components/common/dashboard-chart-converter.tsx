"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import JSZip from "jszip";
import {
  X,
  BarChart3,
  LineChartIcon,
  AreaChartIcon,
  PieChartIcon,
  Maximize2,
  Minimize2,
  Table as TableIcon,
  Info,
  ChevronDown,
  RefreshCcw,
  ScatterChart,
  Combine,
  TreePine,
  Cloud,
  PinOff,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// This import automatically extends Highcharts with bubble chart capability
import "highcharts/highcharts-more";
import "highcharts/modules/treemap";
import "highcharts/modules/wordcloud";
import "highcharts/modules/accessibility";
import { toast } from "sonner";
import { useTheme } from "@/providers/theme-provider";

interface WordCloudData {
  series: Array<{
    name: string;
    weight: number;
  }>;
}

interface EnhancedCsvData {
  cols?: string[];
  x_axis?: {
    title: string;
    categories: string[];
  };
  y_axis?: Array<{
    title: string;
    unit: string;
  }>;
  chart_data?: {
    data: Array<{
      name: string;
      data: number[];
    }>;
  };
  word_cloud_data?: {
    [key: string]: WordCloudData;
  };
  data_type?: "numeric" | "categorical" | "mixed"; // Add data_type to the interface
}

interface FallbackData {
  csvData?: EnhancedCsvData;
  chart_csvData?: EnhancedCsvData;
  responseType?: string;
  word_cloud_data?: {
    [key: string]: WordCloudData;
  };
  chart_Title?: string;
  chart_Description?: string;
  chart_Insights?: string;
  chart_Type?: string;
}

type ChartType =
  | "bar"
  | "line"
  | "area"
  | "pie"
  | "stacked"
  | "table"
  | "combination"
  | "scatter"
  | "column"
  | "bubble"
  | "treemap"
  | "wordcloud";

interface ChartConverterProps {
  fallbackData?: FallbackData;
  onClose: () => void;
  title: string;
  description?: string;
  insights?: string;
  chartId: string;
  dashboardId: string;
  chartHeight?: number | string;
  fullscreenHeight?: number | string;
  onTitleClick?: () => void;
  isSelected?: boolean;
  chartType?: string;
  onPinOff: () => void;
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

export function DashboardChartConverter({
  fallbackData,
  title,
  description,
  dashboardId,
  chartId,
  onTitleClick,
  chartHeight = 300,
  fullscreenHeight = "calc(100vh - 250px)",
  chartType: initialChartType = "",
  onPinOff,
}: ChartConverterProps) {
  const [chartType, setChartType] = useState<string>(initialChartType);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [isUnpinConfirmation, setIsUnpinConfirmation] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const { theme } = useTheme();
  const chartReference = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     // (window as any).JSZip = JSZip;
  //   }
  // }, []);

  // Get data type from API response
  const dataType = useMemo(() => {
    const csvData = fallbackData?.csvData || fallbackData?.chart_csvData;
    return csvData?.data_type || "numeric"; // Default to numeric if not specified
  }, [fallbackData]);

  // Check if data is numeric (can show charts)
  const isNumericData = dataType === "numeric";

  // Check if data is categorical or mixed (should only show table)
  const isTableOnlyData = dataType === "categorical" || dataType === "mixed";

  // Check if we have word cloud data in the response
  const hasWordCloudData = useMemo(() => {
    const hasChartCsvWordCloud = fallbackData?.chart_csvData?.word_cloud_data;
    const hasCsvWordCloud = fallbackData?.csvData?.word_cloud_data;
    const hasDirectWordCloud = fallbackData?.word_cloud_data;
    return hasChartCsvWordCloud || hasCsvWordCloud || hasDirectWordCloud;
  }, [fallbackData]);

  // Check if we have regular chart data
  const hasValidData = useMemo(() => {
    // If we have word cloud data, don't treat as regular chart data
    if (hasWordCloudData) return false;

    // Check both possible locations for regular chart data
    const csvData = fallbackData?.csvData || fallbackData?.chart_csvData;
    return !!(
      csvData?.cols &&
      csvData.x_axis?.categories &&
      csvData.chart_data?.data &&
      Array.isArray(csvData.chart_data.data) &&
      csvData.chart_data.data.length > 0
    );
  }, [fallbackData, hasWordCloudData]);

  // Process data for charts - ONLY for regular data, not word cloud
  const [processedData, setProcessedData] = useState<any[]>([]);

  useEffect(() => {
    // Don't process if we have word cloud data
    if (hasWordCloudData) {
      setProcessedData([]);
      return;
    }

    if (!hasValidData) {
      setProcessedData([]);
      return;
    }

    // Use either csvData or chart_csvData
    const csvData = fallbackData!.csvData || fallbackData!.chart_csvData!;
    const categories = csvData.x_axis!.categories || [];
    const seriesData = csvData.chart_data!.data || [];

    // Process data into the format expected by charts
    const processed = categories.map((category, index) => {
      const dataPoint: any = { name: "" };

      // Add all series data
      seriesData.forEach((series, seriesIndex) => {
        const columnName =
          csvData.cols![seriesIndex] ||
          series.name ||
          `Series ${seriesIndex + 1}`;
        if (series.data[index] !== undefined) {
          dataPoint[columnName] = series.data[index];
        }
      });

      return dataPoint;
    });

    setProcessedData(processed);

    // Auto-select the first column if available
    if (
      csvData.cols &&
      csvData.cols.length > 0 &&
      selectedColumns.length === 0
    ) {
      setSelectedColumns([csvData.cols[0]]);
    }
  }, [fallbackData, selectedColumns, hasValidData, hasWordCloudData]);

  // Get numeric columns from fallback data
  const numericColumns = useMemo(() => {
    if (!hasValidData || hasWordCloudData) {
      return [];
    }

    const csvData = fallbackData!.csvData || fallbackData!.chart_csvData!;
    return csvData.cols || [];
  }, [fallbackData, hasValidData, hasWordCloudData]);

  const isDark = theme === "dark";

  // Chart selector: Handle different data types
  const availableChartTypes = useMemo(() => {
    // If we have word cloud data, only show word cloud
    if (hasWordCloudData) {
      return [
        { type: "wordcloud" as ChartType, icon: Cloud, label: "Word Cloud" },
      ];
    }

    // If data is categorical or mixed, only show table
    if (isTableOnlyData) {
      return [
        { type: "table" as ChartType, icon: TableIcon, label: "Table" },
      ];
    }

    // Otherwise, show all regular chart types for numeric data
    if (hasValidData && isNumericData) {
      const types = [
        { type: "column" as ChartType, icon: BarChart3, label: "Column" },
        { type: "bar" as ChartType, icon: BarChart3, label: "Bar" },
        { type: "line" as ChartType, icon: LineChartIcon, label: "Line" },
        { type: "area" as ChartType, icon: AreaChartIcon, label: "Area" },
        { type: "pie" as ChartType, icon: PieChartIcon, label: "Pie" },
        { type: "scatter" as ChartType, icon: ScatterChart, label: "Scatter" },
        { type: "bubble" as ChartType, icon: ScatterChart, label: "Bubble" },
        { type: "treemap" as ChartType, icon: TreePine, label: "Tree Map" },
        { type: "table" as ChartType, icon: TableIcon, label: "Table" },
      ];

      // Only add stacked for 3D data
      const csvData = fallbackData!.csvData || fallbackData!.chart_csvData!;
      const isThreeDimensional =
        hasValidData && csvData.chart_data!.data.length >= 2;

      if (isThreeDimensional) {
        types.splice(2, 0, {
          type: "stacked" as ChartType,
          icon: BarChart3,
          label: "Stacked",
        });
        types.splice(8, 0, {
          type: "combination" as ChartType,
          icon: Combine,
          label: "Combination",
        });
      }
      return types;
    }

    // If no valid data at all, show empty
    return [];
  }, [hasWordCloudData, hasValidData, fallbackData, isNumericData, isTableOnlyData]);

  // Auto-set chart type based on data type
  useEffect(() => {
    if (hasWordCloudData && chartType !== "wordcloud") {
      setChartType("wordcloud");
    } else if (isTableOnlyData && chartType !== "table") {
      // Force table view for categorical/mixed data
      setChartType("table");
    } else if (!hasWordCloudData && hasValidData && isNumericData && !chartType) {
      // Set default chart type for numeric data if not set
      const defaultType = fallbackData?.chart_Type || "column";
      setChartType(defaultType);
    } else if (fallbackData?.chart_Type && !chartType) {
      // Use the chart type from the API response
      setChartType(fallbackData.chart_Type);
    }
  }, [hasWordCloudData, hasValidData, chartType, fallbackData, isNumericData, isTableOnlyData]);

  const chartTypeUpdate = async (newChartType: string) => {
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      const response = await fetch(
        `${BASE_URL}/dashboards/${dashboardId}/charts/${chartId}/chart_type`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `${tokenType} ${token}`,
          },
          body: JSON.stringify({
            chart_type: newChartType,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update chart type: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      toast.error("Error updating chart type");
      throw error;
    }
  };

  const chartDelete = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      const response = await fetch(
        `${BASE_URL}/dashboards/${dashboardId}/charts/${chartId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `${tokenType} ${token}`,
          },
          body: JSON.stringify({
            is_active: false,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update chart type: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      toast.error("Error updating chart type");
      throw error;
    }
  };

  const handlePinOff = async () => {
    try {
      await chartDelete();
      toast.success("Chart removed!");
      onPinOff();
    } catch {
      toast.error("Failed to remove chart");
    }
  };

  const handleChartTypeChange = async (newType: string) => {
    try {
      setChartType(newType);
      await chartTypeUpdate(newType);
    } catch (error) {
      // Revert the chart type if the API call fails
      setChartType((prevType) => prevType);
    }
  };

  function formatNumber(value: number): string {
    if (value === undefined || value === null || isNaN(value)) {
      return "0";
    }
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

    if (absValue > 0) {
      return value.toExponential(1);
    }

    return "0";
  }

  const getHeightStyle = (height: number | string): string => {
    if (typeof height === "number") {
      return `${height}px`;
    }
    return height;
  };

  // Common base configuration
  const getBaseOptions = (): Highcharts.Options => {
    const textColor = isDark ? "#fff" : "#374151";
    const gridColor = isDark ? "#4B5563" : "#E5E7EB";
    const tooltipBgColor = isDark ? "#1F2937" : "#fff";
    const tooltipBorderColor = isDark ? "#374151" : "#E5E7EB";
    const gridLineColor = isDark ? "#374151" : "#F3F4F6";

    return {
      chart: {
        backgroundColor: "transparent",
        style: { fontFamily: "inherit" },
        height: getHeightStyle(chartHeight),
      },
      title: {
        text: undefined,
      },
      credits: { enabled: false },
      legend: {
        itemStyle: { color: textColor },
        itemHoverStyle: { color: textColor },
      },
      xAxis: {
        lineColor: gridColor,
        tickColor: gridColor,
        labels: { style: { color: textColor } },
        title: { style: { color: textColor } },
      },
      yAxis: {
        lineColor: gridColor,
        tickColor: gridColor,
        labels: {
          style: { color: textColor },
          formatter: function () {
            return formatNumber(this.value as number);
          },
        },
        title: { style: { color: textColor } },
        gridLineColor: gridLineColor,
      },
      tooltip: {
        backgroundColor: tooltipBgColor,
        borderColor: tooltipBorderColor,
        style: { color: textColor },
      },
      plotOptions: {
        series: {
          animation: { duration: 300 },
        },
      },
    };
  };

  // Helper function to get chart data from API response
  const getChartData = () => {
    return fallbackData!.csvData || fallbackData!.chart_csvData!;
  };

  // Get word cloud data from the response
  const getWordCloudData = (): WordCloudData | null => {
    if (!hasWordCloudData) return null;
    
    let wordCloudData = null;

    if (fallbackData?.chart_csvData?.word_cloud_data) {
      const firstKey = Object.keys(
        fallbackData.chart_csvData.word_cloud_data
      )[0];
      wordCloudData = fallbackData.chart_csvData.word_cloud_data[firstKey];
    }
    else if (fallbackData?.csvData?.word_cloud_data) {
      const firstKey = Object.keys(fallbackData.csvData.word_cloud_data)[0];
      wordCloudData = fallbackData.csvData.word_cloud_data[firstKey];
    }
    else if (fallbackData?.word_cloud_data) {
      const firstKey = Object.keys(fallbackData.word_cloud_data)[0];
      wordCloudData = fallbackData.word_cloud_data[firstKey];
    }
    return wordCloudData;
  };

  // Word Cloud Chart
  const getWordCloudOptions = (): Highcharts.Options => {
    const wordCloudData = getWordCloudData();

    if (!wordCloudData) {
      return {
        ...getBaseOptions(),
        title: { text: "No word cloud data available" },
        series: [],
      };
    }

    const wordData = wordCloudData.series.map((item) => ({
      name: item.name,
      weight: item.weight,
    }));

    const options: Highcharts.Options = {
      ...getBaseOptions(),
      series: [
        {
          type: "wordcloud",
          data: wordData,
          name: "Occurrences",
        } as Highcharts.SeriesWordcloudOptions,
      ],
      title: {
        text: "",
        style: {
          color: isDark ? "#fff" : "#374151",
          fontSize: "14px",
        },
      },
      tooltip: {
        ...getBaseOptions().tooltip,
        headerFormat: "",
        pointFormat:
          '<span style="color:{point.color}">\u25CF</span> <b>{point.name}</b>: {point.weight} occurrences',
      },
    };

    return options;
  };

  // Bar Chart (Horizontal)
  const getBarChartOptions = (): Highcharts.Options => {
    const csvData = getChartData();
    const categories = csvData.x_axis!.categories;
    const seriesData = csvData.chart_data!.data;

    const series: Highcharts.SeriesBarOptions[] = seriesData.map(
      (series, index) => ({
        name: series.name,
        type: "bar",
        data: series.data,
        color: CHART_COLORS[index % CHART_COLORS.length],
      })
    );

    return {
      ...getBaseOptions(),
      chart: {
        ...getBaseOptions().chart,
        type: "bar",
      },
      xAxis: {
        ...getBaseOptions().xAxis,
        categories: categories,
        title: {
          text: csvData.x_axis!.title || "",
          style: { color: isDark ? "#fff" : "#374151" },
        },
      },
      yAxis: {
        ...getBaseOptions().yAxis,
        title: {
          text: csvData.y_axis![0]?.title,
          style: { color: isDark ? "#fff" : "#374151" },
        },
      },
      series: series,
      plotOptions: {
        ...getBaseOptions().plotOptions,
        bar: { borderRadius: 3 },
      },
      tooltip: {
        ...getBaseOptions().tooltip,
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: "{series.name}: <b>{point.y}</b>",
      },
    };
  };

  // Column Chart (Vertical)
  const getColumnChartOptions = (): Highcharts.Options => {
    const csvData = getChartData();
    const categories = csvData.x_axis!.categories;
    const seriesData = csvData.chart_data!.data;

    const series: Highcharts.SeriesColumnOptions[] = seriesData.map(
      (series, index) => ({
        name: series.name,
        type: "column",
        data: series.data,
        color: CHART_COLORS[index % CHART_COLORS.length],
      })
    );

    return {
      ...getBaseOptions(),
      chart: {
        ...getBaseOptions().chart,
        type: "column",
      },
      xAxis: {
        ...getBaseOptions().xAxis,
        categories: categories,
        title: {
          text: csvData.x_axis!.title !== "Category"? csvData.x_axis!.title:"",
          style: { color: isDark ? "#fff" : "#374151" },
        },
      },
      yAxis: {
        ...getBaseOptions().yAxis,
        title: {
          text: csvData.y_axis![0]?.title,
          style: { color: isDark ? "#fff" : "#374151" },
        },
      },
      series: series,
      plotOptions: {
        ...getBaseOptions().plotOptions,
        column: { borderRadius: 3 },
      },
      tooltip: {
        ...getBaseOptions().tooltip,
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: "{series.name}: <b>{point.y}</b>",
      },
    };
  };

  // Line Chart
  const getLineChartOptions = (): Highcharts.Options => {
    const csvData = getChartData();
    const categories = csvData.x_axis!.categories;
    const seriesData = csvData.chart_data!.data;

    const series: Highcharts.SeriesLineOptions[] = seriesData.map(
      (series, index) => ({
        name: series.name,
        type: "line",
        data: series.data,
        color: CHART_COLORS[index % CHART_COLORS.length],
        marker: { radius: 4 },
      })
    );

    return {
      ...getBaseOptions(),
      xAxis: {
        ...getBaseOptions().xAxis,
        categories,
        title: {
          text: csvData.x_axis!.title,
          style: { color: isDark ? "#fff" : "#374151" },
        },
      },
      yAxis: {
        ...getBaseOptions().yAxis,
        title: {
          text: csvData.y_axis![0]?.title,
          style: { color: isDark ? "#fff" : "#374151" },
        },
      },
      series: series,
      plotOptions: {
        ...getBaseOptions().plotOptions,
        line: { marker: { radius: 4 } },
      },
      tooltip: {
        ...getBaseOptions().tooltip,
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: "{series.name}: <b>{point.y}</b>",
      },
    };
  };

  // Area Chart
  const getAreaChartOptions = (): Highcharts.Options => {
    const csvData = getChartData();
    const categories = csvData.x_axis!.categories;
    const seriesData = csvData.chart_data!.data;

    const series: Highcharts.SeriesAreaOptions[] = seriesData.map(
      (series, index) => ({
        name: series.name,
        type: "area",
        data: series.data,
        color: CHART_COLORS[index % CHART_COLORS.length],
        fillOpacity: 0.4,
      })
    );

    return {
      ...getBaseOptions(),
      xAxis: {
        ...getBaseOptions().xAxis,
        categories,
        title: {
          text: csvData.x_axis!.title,
          style: { color: isDark ? "#fff" : "#374151" },
        },
      },
      yAxis: {
        ...getBaseOptions().yAxis,
        title: {
          text: csvData.y_axis![0]?.title,
          style: { color: isDark ? "#fff" : "#374151" },
        },
      },
      series: series,
      plotOptions: {
        ...getBaseOptions().plotOptions,
        area: { marker: { radius: 4 } },
      },
      tooltip: {
        ...getBaseOptions().tooltip,
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: "{series.name}: <b>{point.y}</b>",
      },
    };
  };

  // Pie Chart
  const getPieChartOptions = (): Highcharts.Options => {
    const csvData = getChartData();
    const categories = csvData.x_axis!.categories;
    const seriesData = csvData.chart_data!.data;

    // For pie chart, use the first series
    const firstSeries = seriesData[0];
    const chartData = categories.map((category, index) => ({
      name: category,
      y: firstSeries?.data[index] || 0,
      color: CHART_COLORS[index % CHART_COLORS.length],
    }));

    return {
      ...getBaseOptions(),
      chart: {
        ...getBaseOptions().chart,
        type: "pie",
      },
      series: [
        {
          type: "pie",
          name: firstSeries?.name,
          data: chartData,
          innerSize: "0%",
        },
      ],
      tooltip: {
        ...getBaseOptions().tooltip,
        shared: false,
        pointFormat: "<b>{point.name}</b>: {point.y}",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.y}",
            style: { color: isDark ? "#fff" : "#374151" },
          },
        },
      },
    };
  };

  // Stacked Chart
  const getStackedChartOptions = (): Highcharts.Options => {
    const csvData = getChartData();
    const categories = csvData.x_axis!.categories;
    const seriesData = csvData.chart_data!.data;

    const series: Highcharts.SeriesColumnOptions[] = seriesData.map(
      (series, index) => ({
        name: series.name,
        type: "column",
        data: series.data,
        color: CHART_COLORS[index % CHART_COLORS.length],
      })
    );

    return {
      ...getBaseOptions(),
      chart: {
        ...getBaseOptions().chart,
        type: "column",
      },
      xAxis: {
        ...getBaseOptions().xAxis,
        categories,
        title: {
          text: csvData.x_axis!.title,
          style: { color: isDark ? "#fff" : "#374151" },
        },
      },
      yAxis: {
        ...getBaseOptions().yAxis,
        title: {
          text: csvData.y_axis![0]?.title,
          style: { color: isDark ? "#fff" : "#374151" },
        },
      },
      series: series,
      tooltip: {
        ...getBaseOptions().tooltip,
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: "{series.name}: <b>{point.y}</b>",
      },
      plotOptions: {
        column: {
          stacking: "normal",
          borderRadius: 3,
        },
      },
    };
  };

  // Scatter Plot
  const getScatterPlotOptions = (): Highcharts.Options => {
    const csvData = getChartData();
    const categories = csvData.x_axis!.categories;
    const seriesData = csvData.chart_data!.data;

    // Use first two series for scatter plot
    const xSeries = seriesData[0];
    const ySeries = seriesData[1] || seriesData[0];

    const scatterData = categories.map((category, index) => ({
      x: index,
      y: ySeries?.data[index] || 0,
      name: category,
      color: CHART_COLORS[index % CHART_COLORS.length],
    }));

    return {
      ...getBaseOptions(),
      chart: {
        ...getBaseOptions().chart,
        type: "scatter",
      },
      xAxis: {
        ...getBaseOptions().xAxis,
        title: {
          text: xSeries?.name || csvData.x_axis!.title || "X Axis",
          style: { color: isDark ? "#fff" : "#374151" },
        },
        gridLineWidth: 1,
      },
      yAxis: {
        ...getBaseOptions().yAxis,
        title: {
          text: csvData.y_axis![0]?.title || "Y Axis",
          style: { color: isDark ? "#fff" : "#374151" },
        },
      },
      series: [
        {
          type: "scatter",
          name: `${xSeries?.name || "X"}`,
          data: scatterData,
          marker: {
            radius: 6,
            symbol: "circle",
            lineWidth: 1,
            lineColor: isDark ? "#fff" : "#000",
          },
        },
      ],
      legend: { enabled: false },
      tooltip: {
        ...getBaseOptions().tooltip,
        pointFormat: "<b>{point.name}</b><br/>X: {point.x}<br/>Y: {point.y}",
      },
    };
  };

  // Bubble Chart
  const getBubbleChartOptions = (): Highcharts.Options => {
    if (!hasValidData) {
      return {
        chart: {
          type: "bubble",
          backgroundColor: "transparent",
          height: getHeightStyle(chartHeight),
        },
        title: { text: "No data available" },
        series: [],
      };
    }

    const csvData = getChartData();
    const categories = csvData.x_axis!.categories;
    const seriesData = csvData.chart_data!.data;

    // For bubble chart, we need at least 3 series (x, y, z)
    const xSeries = seriesData[0];
    const ySeries = seriesData[1] || seriesData[0];
    const zSeries = seriesData[2] || seriesData[0];

    const bubbleData = categories.map((category, index) => ({
      x: index,
      y: ySeries?.data[index] || 0,
      z: Math.max(Math.abs(zSeries?.data[index] || 1), 1),
      name: category,
      color: CHART_COLORS[index % CHART_COLORS.length],
    }));

    return {
      ...getBaseOptions(),
      chart: {
        ...getBaseOptions().chart,
        type: "bubble",
      },
      xAxis: {
        ...getBaseOptions().xAxis,
        title: {
          text: xSeries?.name || csvData.x_axis!.title || "X Axis",
          style: { color: isDark ? "#fff" : "#374151" },
        },
        gridLineWidth: 1,
      },
      yAxis: {
        ...getBaseOptions().yAxis,
        title: {
          text: csvData.y_axis![0]?.title || "Y Axis",
          style: { color: isDark ? "#fff" : "#374151" },
        },
      },
      series: [
        {
          type: "bubble",
          name: xSeries?.name,
          data: bubbleData,
        },
      ],
      legend: { enabled: false },
      tooltip: {
        ...getBaseOptions().tooltip,
        pointFormat:
          "<b>{point.name}</b><br/>X: {point.x}<br/>Y: {point.y}<br/>Size: {point.z}",
      },
      plotOptions: {
        bubble: {
          minSize: 10,
          maxSize: 50,
          marker: {
            fillOpacity: 0.7,
            lineWidth: 1,
            lineColor: isDark ? "#fff" : "#000",
          },
        },
      },
    };
  };

  // TreeMap Chart
  const getEnhancedTreeMapOptions = (): Highcharts.Options => {
    if (!hasValidData) {
      return {
        chart: {
          type: "treemap",
          backgroundColor: "transparent",
          height: getHeightStyle(chartHeight),
        },
        title: { text: "No data available" },
        series: [],
      };
    }

    const csvData = getChartData();
    const categories = csvData.x_axis!.categories;
    const seriesData = csvData.chart_data!.data;
    const valueSeries = seriesData[0];
    const seriesName = valueSeries.name;
    const treemapData = categories.map((category, index) => {
      const value = Math.max(Math.abs(valueSeries?.data[index] || 1), 1);
      return {
        name: category,
        value: value,
        color: CHART_COLORS[index % CHART_COLORS.length],
        colorValue: index,
      };
    });

    let hierarchicalData = treemapData;

    if (seriesData.length >= 2) {
      const parentSeries = seriesData[0];
      const childSeries = seriesData[1];

      hierarchicalData = categories.flatMap((category, index) => {
        const parentValue = Math.max(
          Math.abs(parentSeries?.data[index] || 1),
          1
        );
        const childValue = Math.max(Math.abs(childSeries?.data[index] || 1), 1);
        const parentId = `parent-${index}`;

        return [
          {
            id: parentId,
            name: category,
            value: parentValue,
            color: CHART_COLORS[index % CHART_COLORS.length],
            colorValue: index,
          },
          {
            name: `${childSeries?.name || "Child"} ${index + 1}`,
            value: childValue,
            parent: parentId,
            color: CHART_COLORS[(index + 1) % CHART_COLORS.length],
            colorValue: index + 1,
          },
        ];
      });
    }

    return {
      ...getBaseOptions(),
      chart: {
        ...getBaseOptions().chart,
        type: "treemap",
      },
      series: [
        {
          type: "treemap",
          layoutAlgorithm: "stripes",
          alternateStartingDirection: true,
          levels: [
            {
              level: 1,
              layoutAlgorithm: "sliceAndDice",
              dataLabels: {
                enabled: true,
                align: "center",
                verticalAlign: "center",
                style: {
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#fff",
                  textOutline: "none",
                },
              },
            },
          ],
          data: hierarchicalData,
        } as Highcharts.SeriesTreemapOptions,
      ],
      colorAxis: {
        minColor: CHART_COLORS[0],
        maxColor: CHART_COLORS[CHART_COLORS.length - 1],
      },
      legend: { enabled: false },
      tooltip: {
        ...getBaseOptions().tooltip,
        pointFormat: `<b>${seriesName}</b><br/> {point.value}`,
      },
      plotOptions: {
        treemap: {
          dataLabels: {
            enabled: true,
            format: "{point.name}",
            style: {
              color: isDark ? "#fff" : "#374151",
              textOutline: "none",
              fontWeight: "normal",
              fontSize: "10px",
            },
          },
          states: {
            hover: {
              borderColor: "#8B5CF6",
              brightness: 0.1,
            },
          },
        },
      },
    };
  };

  // Combination Chart (Line + Column)
  const getCombinationChartOptions = (): Highcharts.Options => {
    const csvData = getChartData();
    const categories = csvData.x_axis!.categories;
    const seriesData = csvData.chart_data!.data;

    const series = [
      {
        type: "column",
        name: seriesData[0]?.name || "Column Series",
        data: seriesData[0]?.data || [],
        color: CHART_COLORS[0],
      },
      {
        type: "line",
        name: seriesData[1]?.name || "Line Series",
        data: seriesData[1]?.data || seriesData[0]?.data || [],
        color: CHART_COLORS[1],
        marker: { radius: 4 },
      },
    ] as Highcharts.SeriesOptionsType[];

    return {
      ...getBaseOptions(),
      xAxis: {
        ...getBaseOptions().xAxis,
        categories,
        title: {
          text: csvData.x_axis!.title,
          style: { color: isDark ? "#fff" : "#374151" },
        },
      },
      yAxis: {
        ...getBaseOptions().yAxis,
        title: {
          text: csvData.y_axis![0]?.title,
          style: { color: isDark ? "#fff" : "#374151" },
        },
      },
      series: series,
      plotOptions: {
        ...getBaseOptions().plotOptions,
        column: { borderRadius: 3 },
      },
      tooltip: {
        ...getBaseOptions().tooltip,
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: "{series.name}: <b>{point.y}</b>",
      },
    };
  };

  // Table rendering for fallback data
 // Table rendering for fallback data
const renderTable = () => {
  if (!hasValidData) {
    return (
      <div className="flex items-center justify-center h-full text-gray-300">
        No data available for table
      </div>
    );
  }

  const csvData = getChartData();
  const categories = csvData.x_axis!.categories;
  const seriesData = csvData.chart_data!.data;

  // Create headers - include all columns from cols array
  const headers = csvData.cols || [];

  const rows = categories.map((category, index) => {
    const row: string[] = [category]; // First column is the category name

    // Add values for each series
    seriesData.forEach((series) => {
      const value = series.data[index];
      // Format numbers to 2 decimal places for better readability
      const formattedValue = typeof value === 'number' ? value.toFixed(2) : String(value || "0");
      row.push(formattedValue);
    });

    return row;
  });

  return (
    <div
      className={`overflow-auto w-full rounded border ${
        isDark ? "bg-white/10 border-white/20" : "bg-white border-gray-300"
      }`}
      style={{
        height: isFullscreen
          ? getHeightStyle(fullscreenHeight)
          : getHeightStyle(chartHeight),
      }}
    >
      <table
        className={`min-w-full border-collapse text-xs ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        <thead className="bg-linear-to-r from-primary to-accent text-light sticky top-0 z-10">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className={`px-4 py-2 font-semibold border text-center text-light align-middle ${
                  isDark
                    ? "bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) border-white/10"
                    : ""
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
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
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

  // Get Highcharts options based on chart type
  const getHighchartsOptions = (): Highcharts.Options | undefined => {
    if (chartType === "table") {
      return undefined;
    }

    // Handle word cloud separately
    if (chartType === "wordcloud") {
      const options = getWordCloudOptions();
      if (isFullscreen) {
        return {
          ...options,
          chart: {
            ...options.chart,
            height: getHeightStyle(fullscreenHeight),
          },
        };
      }
      return options;
    }

    const optionsMap: Record<ChartType, () => Highcharts.Options> = {
      bar: getBarChartOptions,
      column: getColumnChartOptions,
      line: getLineChartOptions,
      area: getAreaChartOptions,
      pie: getPieChartOptions,
      stacked: getStackedChartOptions,
      scatter: getScatterPlotOptions,
      bubble: getBubbleChartOptions,
      treemap: getEnhancedTreeMapOptions,
      combination: getCombinationChartOptions,
      table: getBarChartOptions, // This won't be used due to the table check above
      wordcloud: getWordCloudOptions, // This won't be reached due to the special case above
    };

    // Type guard to ensure chartType is a valid ChartType
    const validChartType = chartType as ChartType;

    if (optionsMap[validChartType]) {
      const options = optionsMap[validChartType]();

      // Apply fullscreen height if in fullscreen mode
      if (isFullscreen) {
        return {
          ...options,
          chart: {
            ...options.chart,
            height: getHeightStyle(fullscreenHeight),
          },
        };
      }

      return options;
    }

    // Fallback to bar chart if chartType is invalid
    const fallbackOptions = getBarChartOptions();
    if (isFullscreen) {
      return {
        ...fallbackOptions,
        chart: {
          ...fallbackOptions.chart,
          height: getHeightStyle(fullscreenHeight),
        },
      };
    }
    return fallbackOptions;
  };

  // Chart rendering logic
  const renderChart = () => {
    // Handle word cloud case
    if (hasWordCloudData) {
      if (chartType === "wordcloud") {
        return (
          <HighchartsReact
            highcharts={Highcharts}
            options={getHighchartsOptions()}
            containerProps={{
              style: {
                height: "100%",
                width: "100%",
              },
            }}
          />
        );
      } else {
        return (
          <div
            className="flex items-center justify-center text-gray-300 w-full"
            style={{
              height: isFullscreen
                ? getHeightStyle(fullscreenHeight)
                : getHeightStyle(chartHeight),
            }}
          >
            <div className="text-center">
              <Cloud className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Word Cloud Data Available</p>
              <p className="text-sm">Please select Word Cloud chart type</p>
            </div>
          </div>
        );
      }
    }

    // Handle table-only data (categorical/mixed)
    if (isTableOnlyData) {
      return renderTable();
    }

    // Handle regular chart data case (numeric)
    if (!hasValidData) {
      return (
        <div
          className="flex items-center justify-center text-gray-300 w-full"
          style={{
            height: isFullscreen
              ? getHeightStyle(fullscreenHeight)
              : getHeightStyle(chartHeight),
          }}
        >
          <div className="text-center">
            <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No data available for chart</p>
          </div>
        </div>
      );
    }

    if (chartType === "table") {
      return renderTable();
    }

    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={getHighchartsOptions()}
        containerProps={{
          style: {
            height: "100%",
            width: "100%",
          },
        }}
      />
    );
  };

  return (
    <div
      className={cn(
        isFullscreen
          ? "fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-lg h-screen p-4"
          : "relative h-full"
      )}
    >
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 h-full flex flex-col">
        <CardHeader className="pb-4" onClick={onTitleClick}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center min-w-0 flex-1 space-x-2">
              <CardTitle
                className="text-white text-lg sm:text-xl cursor-pointer truncate shrink min-w-0"
                title={title}
              >
                {title}
              </CardTitle>
              <Info
                className="w-4 h-4 shrink-0 cursor-pointer"
                onClick={() => setIsInfoDialogOpen(true)}
              />
            </div>

            <div className="flex items-center space-x-2 shrink-0 ml-4">
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
                title="Pin Off"
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={() => {
                  setIsUnpinConfirmation(true);
                }}
              >
                <PinOff />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-3">
            <span className="text-sm text-gray-300">Chart Type:</span>
            <Select
              value={chartType}
              onValueChange={(value: any) => handleChartTypeChange(value)}
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
                  <SelectValue placeholder="Select chart type" />
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
        <CardContent className="flex-1 px-2 pb-1">
          <div
            className="w-full"
            style={{
              height: isFullscreen
                ? getHeightStyle(fullscreenHeight)
                : getHeightStyle(chartHeight),
            }}
            ref={chartReference}
          >
            {renderChart()}
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={isInfoDialogOpen}
        onOpenChange={(open) => setIsInfoDialogOpen(open)}
      >
        <DialogContent className="dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Description
            </DialogTitle>
          </DialogHeader>

          <div className="text-gray-300 py-4 dark:text-white">
            {description && (
              <p className="text-normal text-gray-300 eading-relaxed wrap-break-word">
                {description}
              </p>
            )}
            {fallbackData?.chart_Description && !description && (
              <p className="text-normal text-gray-300 leading-relaxed wrap-break-word">
                {fallbackData.chart_Description}
              </p>
            )}
            {fallbackData?.chart_Insights && (
              <div className="mt-4">
                <h4 className="font-semibold text-white mb-2">Insights:</h4>
                <div className="text-sm text-gray-300 leading-relaxed">
                  {fallbackData.chart_Insights
                    .split("•")
                    .filter((item) => item.trim())
                    .map((insight, index) => (
                      <div key={index} className="flex items-start mb-1">
                        <span className="mr-2">•</span>
                        <span>{insight.trim()}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Pin Off Modal  */}
      <Dialog
        open={isUnpinConfirmation}
        onOpenChange={(open) => setIsUnpinConfirmation(open)}
      >
        <DialogContent className="dark:bg-linear-to-r from-primary to-accent border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Confirmation</DialogTitle>
          </DialogHeader>
          <div className="py-3">
          <p className="text-gray-300 py-3 text-sm">
           Are you sure you want to unpin this chart?
          </p>
          <p className="text-gray-300 text-sm">
            This action will hide the chart from your dashboard until you pin it again.
          </p>
          </div>
          <DialogFooter className="flex items-center justify-end gap-3 mt-4">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => setIsUnpinConfirmation(false)}
            >
              No
            </Button>

            <Button
              className="bg-linear-to-r from-primary to-accent text-light border border-gray-400/80 hover:opacity-90"
              onClick={() => {
                handlePinOff()
              }}
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}