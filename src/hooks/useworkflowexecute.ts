"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ChatHistoryResponse,
  ChatMessage,
  DeleteChatResponse,
  ExecuteResponse,
  FilePreviewResponse,
  WorkflowInfo,
  csvDataToTableData,
  detectCSVData,
  normalizeCsvData,
} from "../app/(route)/project/[id]/workflow/[workflowId]/execute/components/type";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export function useWorkflowExecute(projectId: string, workflowId: string) {
  const router = useRouter();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [workflowInfo, setWorkflowInfo] = useState<WorkflowInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [projectInfo, setProjectInfo] = useState<{ name: string } | null>(
    null,
  );
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [isClearingChat, setIsClearingChat] = useState(false);
  const [showChartConverter, setShowChartConverter] = useState<{
    [key: string]: boolean;
  }>({});
  const [liveMode, modeTypeLive] = useState(false);
  const [apiResponse, setApiResponse] = useState<any[]>([]); // start with []
  const [activeVersionId, setActiveVersionId] = useState<string | null>(null);
  // for info icon
  const [isInfoDialogOpen, setisInfoDialogOpen] = useState(false);
  const [isCreateDashboardOpen, setIsCreateDashboardOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [dashboards, setDashboards] = useState<any[]>([]);
  const [dashboardName, setDashboardName] = useState("");
  const [dashboardDescription, setDashboardDescription] = useState("");
  const [isVersionDialogOpen, setIsVersionDialogOpen] = useState(false);
  const [isRefreshDialogOpen, setIsRefreshDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isViewLatestWorkflow, setIsViewLatestWorkflow] =
    useState<FilePreviewResponse | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<{
    title: string;
    info: string;
  } | null>(null);

  const [credits, setCredits] = useState(0);
  const [role, setRole] = useState<string>("");
  const [username, setUsername] = useState("");
  const [initials, setInitials] = useState("");

  const infoData = [
    {
      id: "workflow_execution",
      title: "Workflow Execution Info",
      info: "Indicates the workflow is deployed and active. Users can now interact with the agents.",
    },
  ];

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [chatMessages]);

  // Auto-focus input when assistant messages are added
  useEffect(() => {
    if (chatMessages.length > 0) {
      const lastMessage = chatMessages[chatMessages.length - 1];
      if (lastMessage.sender === "assistant" && textareaRef.current) {
        // Small delay to ensure the message is rendered
        setTimeout(() => {
          textareaRef.current?.focus();
        }, 100);
      }
    }
  }, [chatMessages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = 24; // Approximate line height in pixels
      const maxHeight = lineHeight * 4; // 4 lines max
      textarea.style.height = Math.min(scrollHeight, maxHeight) + "px";
    }
  }, [newMessage]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    fetchWorkflowInfo();
    fetchProjectInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, projectId, workflowId]);

  const handleInfoClick = (id: string) => {
    const entry = infoData.find((item) => item.id === id);
    if (entry) {
      setSelectedEntry({ title: entry.title, info: entry.info });
      setisInfoDialogOpen(true);
    }
  };

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode == "live") {
      modeTypeLive(true);
    }
  }, []);

  const fetchProjectInfo = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) {
        return;
      }

      const response = await fetch(`${BASE_URL}/projects/${projectId}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${tokenType} ${token}`,
        },
      });

      if (response.ok) {
        const project = await response.json();
        setProjectInfo({
          name: project.name || "Project",
        });
      }
    } catch (error) {
      setProjectInfo({
        name: "Project",
      });
    }
  };

  const fetchWorkflowInfo = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) {
        router.push("/");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/projects/${projectId}/workflows`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `${tokenType} ${token}`,
          },
        },
      );

      if (response.ok) {
        const workflows = await response.json();
        const workflow = workflows.find((w: any) => w.id === workflowId);

        if (workflow) {
          setWorkflowInfo({
            id: workflow.id,
            workflow_name: workflow.workflow_name || "Untitled Workflow",
            project_id: workflow.project_id,
            workflow_status: workflow.workflow_status,
            extracted_config: workflow.extracted_config,
          });
          // Remove the existing setChatMessages call and replace with:
          // Fetch chat history after workflow info is loaded
          fetchChatHistory(workflow);
        } else {
          router.push(`/project/${projectId}`);
        }
      } else if (response.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        router.push("/");
      } else {
        router.push(`/project/${projectId}`);
      }
    } catch (error) {
      router.push(`/project/${projectId}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchChatHistory = async (workflow: any) => {
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) {
        return;
      }

      const response = await fetch(
        `${BASE_URL}/workflows/${workflowId}/chat-history`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `${tokenType} ${token}`,
          },
        },
      );

      if (response.ok) {
        const historyData: ChatHistoryResponse = await response.json();

        if (historyData.messages && historyData.messages.length > 0) {
          // Set current chat ID if available
          if (historyData.chat_id) {
            setCurrentChatId(historyData.chat_id);
          }

          const convertedMessages: ChatMessage[] =
            historyData?.messages?.map((msg, index) => {
              let tableData;

              try {
                const csvData = normalizeCsvData(
                  msg.enhanced_response?.csvData,
                );

                if (csvData) {
                  tableData = csvDataToTableData(csvData);
                } else {
                  tableData = detectCSVData?.(msg.content);
                }
              } catch (error) {
                console.error("Table parsing failed:", error, msg);
              }

              return {
                id: msg.id || `history-${index}`,
                message: msg.content ?? "",
                sender: msg.role === "user" ? "user" : "assistant",
                timestamp: msg.created_at
                  ? new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "",
                chat_id: msg.chat_id,
                enhanced_response: msg.enhanced_response,
                execution_successful:
                  msg.role === "assistant" ? true : undefined,
                tableData: tableData || undefined,
                chart_id: msg.chart_id,
              };
            }) ?? [];

          // Set the chat messages with history
          setChatMessages(convertedMessages);

          setHistoryLoaded(true);
        } else {
          // No history, set initial welcome message
          setChatMessages([
            {
              id: "1",
              message: `Welcome! Your workflow "${workflow?.workflow_name}" is deployed and ready to execute. Send me a message to start interacting with your AI agents.`,
              sender: "assistant",
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]);
          setHistoryLoaded(true);
        }
      } else {
        // If history fetch fails, show welcome message
        setChatMessages([
          {
            id: "1",
            message: `Welcome! Your workflow "${workflow?.workflow_name}" is deployed and ready to execute. Send me a message to start interacting with your AI agents.`,
            sender: "assistant",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
        setHistoryLoaded(true);
      }
    } catch (error) {
      // On error, show welcome message
      setChatMessages([
        {
          id: "1",
          message: `Welcome! Your workflow "${workflow?.workflow_name} " is deployed and ready to execute. Send me a message to start interacting with your AI agents.`,
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setHistoryLoaded(true);
    }
  };

  const clearChatHistory = async () => {
    setIsClearingChat(true);

    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) {
        return;
      }

      const response = await fetch(
        `${BASE_URL}/workflows/${workflowId}/chat-history`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            Authorization: `${tokenType} ${token}`,
          },
        },
      );

      if (response.ok) {
        const result: DeleteChatResponse = await response.json();

        if (result.chat_cleared) {
          // Clear current chat messages and reset to welcome message
          setChatMessages([
            {
              id: "1",
              message: `Welcome! Your workflow "${workflowInfo?.workflow_name}" is deployed and ready to execute. Send me a message to start interacting with your AI agents.`,
              sender: "assistant",
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]);

          // Clear current chat ID
          setCurrentChatId(null);

          // Show success message temporarily
          const successMessage: ChatMessage = {
            id: "success-clear",
            message:
              "✅ Chat history cleared successfully. Starting a new conversation!",
            sender: "assistant",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            execution_successful: true,
          };

          setChatMessages((prev) => [...prev, successMessage]);

          // Remove success message after 3 seconds
          setTimeout(() => {
            setChatMessages((prev) =>
              prev.filter((msg) => msg.id !== "success-clear"),
            );
          }, 3000);
        }
      } else if (response.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        router.push("/");
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage: ChatMessage = {
          id: "error-clear",
          message: `Failed to clear chat history: ${
            errorData.detail || errorData.message || "Unknown error"
          }`,
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          execution_successful: false,
        };
        setChatMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: "error-clear",
        message:
          "Network error while clearing chat history. Please try again.",
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        execution_successful: false,
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsClearingChat(false);
    }
  };

  const executeWorkflow = async (query: string) => {
    if (!query.trim()) return;
    setIsExecuting(true);
    // Add user message immediately
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: query,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages((prev) => [...prev, userMessage]);

    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message: "Authentication error. Please login again.",
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          execution_successful: false,
        };
        setChatMessages((prev) => [...prev, errorMessage]);
        return;
      }

      const response = await fetch(
        `${BASE_URL}/workflows/${workflowId}/execute?query=${encodeURIComponent(
          query,
        )}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `${tokenType} ${token}`,
          },
          body: "",
        },
      );

      if (response.ok) {
        const result: ExecuteResponse = await response.json();

        // Update current chat ID
        if (result.chat_id) {
          setCurrentChatId(result.chat_id);
        }

        // Detect CSV data in the response
        let tableData;
        if (result.enhanced_response?.csvData) {
          tableData = csvDataToTableData(result.enhanced_response.csvData);
        } else {
          tableData = detectCSVData(result.result);
        }

        // Add assistant response
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 2).toString(),
          message:
            result.result || "No response received from the workflow.",
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          workflow_id: result.workflow_id,
          chat_id: result.chat_id,
          execution_successful: result.execution_successful,
          method: result.method,
          user_message_id: result.user_message_id,
          ai_message_id: result.ai_message_id,
          tableData: tableData || undefined,
          enhanced_response: result.enhanced_response,
          chart_id: result.chartID,
        };

        setChatMessages((prev) => [...prev, assistantMessage]);
      } else if (response.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        router.push("/");
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage: ChatMessage = {
          id: (Date.now() + 2).toString(),
          message: `Error: ${
            errorData.detail ||
            errorData.message ||
            "Failed to execute workflow"
          }`,
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          execution_successful: false,
        };
        setChatMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        message: "Network error. Please check your connection and try again.",
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        execution_successful: false,
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && !isExecuting) {
      executeWorkflow(newMessage.trim());
      setNewMessage("");

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChartConverter = (messageId: string) => {
    setShowChartConverter((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  };

  const handleFetchVersions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      const response = await fetch(
        `${BASE_URL}/workflows/${workflowId}/files/with-versions`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `${tokenType} ${token}`,
          },
        },
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const files = data.files_with_versions || {};

      let versions: any[] = [];
      let activeId: string | null = null;

      Object.values(files).forEach((file: any) => {
        const rootFileId = file?.version_tree?.root_file_id || null;
        if (file.active_version) {
          activeId = file.active_version.id;
        }

        if (file.all_versions) {
          versions = [
            ...versions,
            ...file.all_versions.map((v: any) => ({
              id: v.id,
              title: v.name,
              description: v.description || "-",
              originalFileId: rootFileId,
              versionHistory: v.version_history || [],
            })),
          ];
        }
      });

      setApiResponse(versions);
      setActiveVersionId(activeId);
    } catch (error) {
      toast.error(
        "Something went wrong while loading versions list. Please try again.",
      );
      setIsVersionDialogOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const restoreVersion = async (
    workflowId: string,
    originalFileId: string,
    versionId: string,
    handleFetchVersions: () => Promise<void>,
  ) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      const response = await fetch(
        `${BASE_URL}/workflows/${workflowId}/switch-file-version?original_file_id=${originalFileId}&target_version_id=${versionId}`,
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            Authorization: `${tokenType} ${token}`,
          },
          body: JSON.stringify({
            workflow_id: workflowId,
            original_file_id: originalFileId,
            target_version_id: versionId,
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`,
        );
      }

      const result = await response.json();
      // 🔄 refresh versions after successful restore
      await handleFetchVersions();
      return result;
    } catch (error) {
      toast.error("Failed to restore version. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDashboard = () => {
    setIsCreateDashboardOpen(false);
    setDashboardName("");
    setDashboardDescription("");
    fetchDashboards();
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
      toast.error("Failed to create dashboard. Please try again.");
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
        },
      );

      const data = await response.json();
      setDashboards(data);
    } catch (err) {}
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleUploadDialogClose = () => {
    setIsRefreshDialogOpen(false);
    setSelectedFile(null);
    setFileName("");
    setFileDescription("");
    setUploadError("");
  };

  const uploadFileToRefresh = async () => {
    setIsUploading(true);
    setUploadError("");
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile); // required
      }
      formData.append("workflow_id", workflowId);

      if (fileName.trim()) {
        formData.append("name", fileName.trim());
      }
      if (fileDescription.trim()) {
        formData.append("description", fileDescription.trim());
      }

      const response = await fetch(
        `${BASE_URL}/workflows/${workflowId}/upload-updated-file`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `${tokenType} ${token}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setIsRefreshDialogOpen(false);
      setSelectedFile(null);
      setFileName("");
      setFileDescription("");
      return data;
    } catch (error) {
      toast.error("Failed to refresh data. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const viewLatestWorkflow = async (rows: number = 20) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      const respo = await fetch(
        `${BASE_URL}/workflows/${workflowId}/file/view?rows=${rows}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `${tokenType} ${token}`,
          },
        },
      );
      const data = await respo.json();
      setIsViewLatestWorkflow(data);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  // First, assert the correct shape
  const getRowData = () => {
    const preview = isViewLatestWorkflow?.preview;
    if (!preview || !preview.rows || !preview.columns) return [];

    const { rows, columns } = preview;
    const rowCount =
      Object.values(rows)[0] && Object.values(rows)[0] instanceof Object
        ? Object.keys(Object.values(rows)[0]).length
        : 0;

    return Array.from({ length: rowCount }).map((_, rowIndex) => {
      const row: Record<string, string> = {};
      columns.forEach((col: any) => {
        row[col] = rows[col]?.[rowIndex] || "";
      });
      return row;
    });
  };

  const rowData = getRowData();
  const columns = isViewLatestWorkflow?.preview?.columns || [];

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      // Step 1: Get signed S3 URL
      const response = await fetch(
        `${BASE_URL}/workflows/${workflowId}/file/downloadNew?mode=url`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `${tokenType} ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to get download URL. Status: ${response.status}`,
        );
      }

      const data = await response.json();

      if (!data.url) {
        throw new Error("No file URL returned from backend");
      }

      // Step 2: Trigger browser download from that S3 URL
      const a = document.createElement("a");
      a.href = data.url;
      a.download = "workflow.csv"; // optional, browser may override name
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    fetchDashboards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const fetchAllOrganizations = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      const response = await fetch(`${BASE_URL}/organisations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load organizations");
      }

      const creditFromApi = data?.[0]?.credits ?? 0;

      setCredits(creditFromApi);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );

      const decoded = JSON.parse(jsonPayload);

      setRole(decoded.role);
      setUsername(decoded.sub);

      // Convert username to initials
      const name = decoded.sub.toUpperCase();
      const init = name
        .split(" ")
        .map((n: string) => n[0])
        .join("");
      setInitials(init);
    } catch (err) {}
  }, []);

  const truncateText = (text: string, maxLength = 15) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return {
    router,
    scrollAreaRef,
    textareaRef,
    fileInputRef,

    workflowInfo,
    loading,
    chatMessages,
    newMessage,
    setNewMessage,
    isExecuting,
    currentChatId,
    projectInfo,
    historyLoaded,
    isClearingChat,
    showChartConverter,
    liveMode,
    apiResponse,
    activeVersionId,

    isInfoDialogOpen,
    setisInfoDialogOpen,
    isCreateDashboardOpen,
    setIsCreateDashboardOpen,
    isCreating,
    dashboards,
    dashboardName,
    setDashboardName,
    dashboardDescription,
    setDashboardDescription,
    isVersionDialogOpen,
    setIsVersionDialogOpen,
    isRefreshDialogOpen,
    setIsRefreshDialogOpen,
    isViewDialogOpen,
    setIsViewDialogOpen,
    selectedFile,
    fileName,
    setFileName,
    fileDescription,
    setFileDescription,
    uploadError,
    isUploading,
    isLoading,
    isDownloading,
    isThemeOpen,
    setIsThemeOpen,
    isViewLatestWorkflow,
    selectedEntry,

    credits,
    role,
    username,
    initials,

    rowData,
    columns,

    handleInfoClick,
    fetchProjectInfo,
    fetchWorkflowInfo,
    fetchChatHistory,
    clearChatHistory,
    executeWorkflow,
    handleSendMessage,
    handleKeyPress,
    toggleChartConverter,
    handleFetchVersions,
    restoreVersion,
    handleCreateDashboard,
    createDashboard,
    fetchDashboards,
    handleFileSelect,
    handleUploadDialogClose,
    uploadFileToRefresh,
    viewLatestWorkflow,
    handleDownload,
    fetchAllOrganizations,
    truncateText,
  };
}