export interface ChatMessage {
  id: string;
  message: string;
  sender: "user" | "assistant";
  timestamp: string;
  workflow_id?: string;
  chat_id?: string;
  execution_successful?: boolean;
  method?: string;
  user_message_id?: string;
  ai_message_id?: string;
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  enhanced_response?: EnhancedResponse;
  chart_id?: string;
}

export interface EnhancedResponse {
  responseType: string;
  csvData: {
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
  };
}

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

export interface ExecuteResponse {
  workflow_id: string;
  chat_id: string;
  query: string;
  execution_successful: boolean;
  result: string;
  method: string;
  user_message_id: string;
  ai_message_id: string;
  enhanced_response?: EnhancedResponse;
  chartID?: string;
}

export interface ChatHistoryResponse {
  workflow_id: string;
  chat_id: string;
  chat_name: string;
  messages: {
    content: string;
    role: "user" | "assistant";
    chat_id: string;
    id: string;
    created_at: string;
    enhanced_response?: EnhancedResponse;
    chart_id?: string;
  }[];
  total_messages: number;
  chart_id?: string;
}

export interface DeleteChatResponse {
  workflow_id: string;
  chat_cleared: boolean;
  message: string;
}

export interface FilePreviewResponse {
  workflow_id: string;
  file_id: string;
  name: string;
  file_type: string;
  size: number;
  status: string;
  version: number;
  created_at: string;
  s3_key: string;
  path: string;
  preview: {
    columns: any;
    rows: Array<Record<string, any>>;
  };
}

export interface WorkflowPreview {
  preview?: {
    rows: Record<string, Record<string, string>>;
    columns: string[];
    total_rows: number;
  };
}

// Enhanced CSV/table detection function
export const detectCSVData = (content: string) => {
  content = content.replace(/<br\s*\/?>/gi, "\n");

  // Method 1: Look for CSV-like data with commas
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length >= 2) {
    // Try comma-separated values
    const firstLine = lines[0];
    if (firstLine.includes(",")) {
      const headers = firstLine
        .split(",")
        .map((h) => h.trim().replace(/['"]/g, ""))
        .filter((h) => h.length > 0);

      if (headers.length >= 2) {
        const rows: string[][] = [];

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          if (line.includes(",")) {
            const cells = line
              .split(",")
              .map((cell) => cell.trim().replace(/['"]/g, ""));

            if (cells.length === headers.length) {
              rows.push(cells);
            }
          }
        }

        if (rows.length > 0) {
          return { headers, rows };
        }
      }
    }

    // Try pipe-separated values
    if (firstLine.includes("|")) {
      const headers = firstLine
        .split("|")
        .map((h) => h.trim())
        .filter((h) => h.length > 0);

      if (headers.length >= 2) {
        const rows: string[][] = [];

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          if (line.includes("|")) {
            const cells = line
              .split("|")
              .map((cell) => cell.trim())
              .filter((cell) => cell.length > 0);

            if (cells.length === headers.length) {
              rows.push(cells);
            }
          }
        }

        if (rows.length > 0) {
          return { headers, rows };
        }
      }
    }

    // Try tab-separated values
    if (firstLine.includes("\t")) {
      const headers = firstLine
        .split("\t")
        .map((h) => h.trim())
        .filter((h) => h.length > 0);

      if (headers.length >= 2) {
        const rows: string[][] = [];

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          if (line.includes("\t")) {
            const cells = line.split("\t").map((cell) => cell.trim());

            if (cells.length === headers.length) {
              rows.push(cells);
            }
          }
        }

        if (rows.length > 0) {
          return { headers, rows };
        }
      }
    }

    // Try space-separated values (for fixed-width data)
    const potentialHeaderLine = lines.find((line) => {
      const words = line.split(/\s+/).filter((word) => word.length > 0);
      return (
        words.length >= 3 &&
        words.some((word) => word.match(/^[A-Z][A-Z_\s]*$/))
      );
    });

    if (potentialHeaderLine) {
      const headerIndex = lines.indexOf(potentialHeaderLine);
      const headers = potentialHeaderLine
        .split(/\s{2,}|\t+/)
        .map((h) => h.trim())
        .filter((h) => h.length > 0);

      if (headers.length < 3) {
        const singleSpaceHeaders = potentialHeaderLine
          .split(/\s+/)
          .filter((h) => h.length > 0);
        if (singleSpaceHeaders.length >= 3) {
          headers.splice(0, headers.length, ...singleSpaceHeaders);
        }
      }

      if (headers.length >= 3) {
        const rows: string[][] = [];

        for (
          let i = headerIndex + 1;
          i < lines.length && i < headerIndex + 20;
          i++
        ) {
          const line = lines[i];
          const words = line.split(/\s+/).filter((word) => word.length > 0);

          if (words.length >= 3) {
            let cells = line
              .split(/\s{2,}|\t+/)
              .map((cell) => cell.trim())
              .filter((cell) => cell.length > 0);

            if (cells.length < headers.length - 1) {
              cells = line.split(/\s+/).filter((cell) => cell.length > 0);
            }

            if (cells.length > headers.length) {
              const lastCells = cells.slice(headers.length - 1);
              cells = cells.slice(0, headers.length - 1);
              cells.push(lastCells.join(" "));
            }

            if (cells.length >= headers.length - 1) {
              while (cells.length < headers.length) {
                cells.push("");
              }
              rows.push(cells);
            }
          }
        }

        if (rows.length >= 2) {
          return { headers, rows };
        }
      }
    }
  }
  return null;
};

// Add this helper function after the interfaces
export const parseHTMLContent = (content: string) => {
  // First, convert \n to <br> tags for line breaks
  const processedContent = content.replace(/\n/g, "<br>");

  // Basic HTML sanitization - remove potentially dangerous tags
  const sanitizedContent = processedContent
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "")
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "") // Remove event handlers
    .replace(/on\w+='[^']*'/gi, "") // Remove event handlers
    .replace(/javascript:/gi, ""); // Remove javascript: URLs

  return sanitizedContent;
};

// Add this helper function to check if content contains HTML or line breaks
export const containsHTML = (content: string) => {
  return /<[a-z][\s\S]*>/i.test(content) || content.includes("\n");
};

export const normalizeCsvData = (
  csvData?: EnhancedResponse["csvData"],
): EnhancedResponse["csvData"] | null => {
  if (
    !csvData ||
    !Array.isArray(csvData.cols) ||
    !csvData.chart_data ||
    !Array.isArray(csvData.chart_data.data) ||
    !csvData.x_axis ||
    !Array.isArray(csvData.x_axis.categories)
  ) {
    return null;
  }

  return csvData;
};

export const csvDataToTableData = (
  csvData: EnhancedResponse["csvData"],
): { headers: string[]; rows: string[][] } => {
  const safeCsvData = normalizeCsvData(csvData);

  if (!safeCsvData) {
    return { headers: [], rows: [] };
  }

  const headers = safeCsvData.cols;
  const categories = safeCsvData.x_axis.categories;
  const chartData = safeCsvData.chart_data.data;

  const rows: string[][] = [];

  categories.forEach((category, index) => {
    const row: string[] = [String(category)];

    chartData.forEach((series) => {
      const value = series?.data?.[index];
      row.push(value !== undefined ? String(value) : "");
    });

    rows.push(row);
  });

  return { headers, rows };
};

export const getDomainColor = (domain: string) => {
  switch (domain.toLowerCase()) {
    case "medical":
    case "healthcare":
      return "bg-red-500/20 text-red-300 border-red-500/30";
    case "finance":
    case "financial":
      return "bg-green-500/20 text-green-300 border-green-500/30";
    case "education":
      return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    case "technology":
    case "tech":
      return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    default:
      return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  }
};

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  );
};