import { toast } from "sonner";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export interface WorkflowInfo {
  id: string;
  workflow_name: string;
  project_id: string;
  workflow_status: string;
  extracted_config?: {
    project_name: string;
    goal: string;
    domain: string;
  };
}

export interface WordCloudData {
  series: Array<{
    name: string;
    weight: number;
  }>;
}

// Updated interface to match the new response format
export interface EnhancedCsvData {
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
}

export interface FallbackData {
  csvData?: EnhancedCsvData;
  chart_csvData?: EnhancedCsvData; // Add this line
  responseType?: string;
  word_cloud_data?: {
    [key: string]: WordCloudData;
  };
}

export type ChartData = {
  id: string;
  title: string;
  insights: string;
  description: string;
  fallbackData?: FallbackData;
  chartType?: string;
};

export type FetchedChartData = {
  title: string;
  description: string;
  insights: string;
  fallbackData?: FallbackData;
  chartType?: string;
};

// Parse JSON response to fallback data structure - UPDATED FOR WORD CLOUD DATA
export const parseJsonToFallbackData = (
  jsonData: any,
): FallbackData | undefined => {
  if (!jsonData || typeof jsonData !== "object") {
    return undefined;
  }

  // Handle word cloud data structure from your API response
  if (jsonData.chart_csvData?.word_cloud_data) {
    return {
      chart_csvData: jsonData.chart_csvData,
      responseType: "text-csv",
      word_cloud_data: jsonData.chart_csvData.word_cloud_data,
    };
  }

  // Handle the new chart_csvData structure from the API response
  if (jsonData.chart_csvData) {
    const csvData = jsonData.chart_csvData;

    // Check if the data matches the new EnhancedCsvData structure
    if (
      csvData.cols &&
      csvData.x_axis &&
      csvData.x_axis.categories &&
      csvData.chart_data &&
      csvData.chart_data.data
    ) {
      const enhancedData: EnhancedCsvData = {
        cols: csvData.cols,
        x_axis: {
          title: csvData.x_axis.title || "Category",
          categories: csvData.x_axis.categories,
        },
        y_axis: csvData.y_axis || [{ title: "Value", unit: "numeric" }],
        chart_data: {
          data: csvData.chart_data.data.map((series: any) => ({
            name: series.name || "Series",
            data: series.data || [],
          })),
        },
      };

      return {
        csvData: enhancedData,
        responseType: "enhanced-csv",
      };
    }
  }

  // Handle the code_info structure as fallback
  if (jsonData.code_info?.codeformattedresponse) {
    const csvData = jsonData.code_info.codeformattedresponse;

    if (csvData.cols && Array.isArray(csvData.chart_data)) {
      const convertedData: EnhancedCsvData = {
        cols: csvData.cols,
        x_axis: {
          title: "Category",
          categories: csvData.chart_data.map(
            (item: any, index: number) =>
              item.x_axis_field?.toString() || `Category ${index + 1}`,
          ),
        },
        y_axis: [{ title: "Value", unit: "numeric" }],
        chart_data: {
          data: csvData.cols
            .filter((col: string) => col !== "x_axis_field")
            .map((col: string) => ({
              name: col,
              data: csvData.chart_data.map(
                (item: any) => Number(item[col]) || 0,
              ),
            })),
        },
      };

      return {
        csvData: convertedData,
        responseType: "formatted",
      };
    }
  }

  // Handle raw csv_data as fallback
  if (jsonData.code_info?.raw?.csv_data) {
    const csvData = jsonData.code_info.raw.csv_data;

    if (csvData.cols && Array.isArray(csvData.chart_data)) {
      const convertedData: EnhancedCsvData = {
        cols: csvData.cols,
        x_axis: {
          title: "Category",
          categories: csvData.chart_data
            .map(
              (item: any, index: number) =>
                Object.keys(item)
                  .find((key) => !csvData.cols.includes(key))
                  ?.toString() || `Category ${index + 1}`,
            )
            .filter(Boolean) as string[],
        },
        y_axis: [{ title: "Value", unit: "numeric" }],
        chart_data: {
          data: csvData.cols.map((col: string) => ({
            name: col,
            data: csvData.chart_data.map(
              (item: any) => Number(item[col]) || 0,
            ),
          })),
        },
      };

      return {
        csvData: convertedData,
        responseType: "raw",
      };
    }
  }

  return undefined;
};

// Get all chart IDs for a dashboard.
// Returns null when the fetch failed / response was not ok (caller should
// leave existing state untouched, matching the original behavior).
export const fetchDashboardIds = async (
  dashboardId: string,
): Promise<string[] | null> => {
  try {
    const token = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type") || "Bearer";
    const only_active = true;
    const queryParams = new URLSearchParams({
      only_active: only_active.toString(),
    });

    const response = await fetch(
      `${BASE_URL}/dashboards/${dashboardId}/charts?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${tokenType} ${token}`,
        },
      },
    );

    if (!response.ok) {
      const errData = await response.json();
      return null;
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    toast.error("Failed to fetch dashboards");
    return null;
  }
};

// Get chart data by chart_id - UPDATED FOR NEW FORMAT
export const fetchDashboardsCharts = async (
  dashboardId: string,
  chartId: string,
): Promise<FetchedChartData | null> => {
  try {
    const token = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type") || "Bearer";

    const response = await fetch(
      `${BASE_URL}/dashboards/${dashboardId}/charts/${chartId}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${tokenType} ${token}`,
        },
      },
    );

    if (!response.ok) {
      const errData = await response.json();
      return null;
    }

    const data = await response.json();
    const fallbackData = parseJsonToFallbackData(data);

    // Extract data from the new structure - prioritize direct chart fields
    return {
      title:
        data.chart_Title || data.code_info?.llmresponse?.title || "Chart",
      description:
        data.chart_Description ||
        data.code_info?.llmresponse?.description ||
        "",
      insights:
        data.chart_Insights || data.code_info?.llmresponse?.insights || "",
      fallbackData,
      chartType: data.chart_Type || data.code_info?.llmresponse?.chart_type,
    };
  } catch (err) {
    toast.error(`Failed to fetch chart ${chartId}`);
    return null;
  }
};

export const reOrderdCharts = async (
  dashboardId: string,
  chartsIds: string[],
) => {
  try {
    const token = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type") || "Bearer";

    if (!token) throw new Error("No token found in localStorage");

    const response = await fetch(
      `${BASE_URL}/dashboards/${dashboardId}/charts/order`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `${tokenType} ${token}`,
        },
        body: JSON.stringify({
          ordered_active_chart_ids: chartsIds,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to reorder charts: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Get chart data for a single chart - UPDATED FOR NEW FORMAT
export const getChartData = async (dashboardId: string, chartId: string) => {
  try {
    const token = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type") || "Bearer";

    const response = await fetch(
      `${BASE_URL}/dashboards/${dashboardId}/charts/${chartId}/getChartData`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token ? `${tokenType} ${token}` : "",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};