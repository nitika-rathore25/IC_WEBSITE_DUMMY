"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  File,
  FileText,
  FileSpreadsheet,
  FileImage,
  FileVideo,
  FileAudio,
  Archive,
  Loader2,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  EmbeddingStatusResponse,
  WorkflowFilesResponse,
  WorkflowForFiles,
  WorkflowInfoFiles,
} from "@/interface/interface";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

// ---------------------------------------------------------------------------
// Formatting / status helpers (shared by WorkflowFileCard and the parent page)
// ---------------------------------------------------------------------------

export const getFileIcon = (fileType: string) => {
  const type = fileType.toLowerCase();
  if (type.includes("image")) return FileImage;
  if (type.includes("video")) return FileVideo;
  if (type.includes("audio")) return FileAudio;
  if (
    type.includes("spreadsheet") ||
    type.includes("csv") ||
    type.includes("excel")
  )
    return FileSpreadsheet;
  if (type.includes("text") || type.includes("document")) return FileText;
  if (type.includes("archive") || type.includes("zip")) return Archive;
  return File;
};

export const getFileTypeColor = (fileType: string) => {
  const type = fileType.toLowerCase();
  if (type.includes("image"))
    return "bg-green-500/20 text-green-300 border-green-500/30";
  if (type.includes("video"))
    return "bg-purple-500/20 text-purple-300 border-purple-500/30";
  if (type.includes("audio"))
    return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
  if (
    type.includes("spreadsheet") ||
    type.includes("csv") ||
    type.includes("excel")
  )
    return "bg-blue-500/20 text-blue-300 border-blue-500/30";
  if (type.includes("text") || type.includes("document"))
    return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  return "bg-orange-500/20 text-orange-300 border-orange-500/30";
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "processed":
      return "bg-green-500/20 text-green-300 border-green-500/30";
    case "processing":
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    case "failed":
      return "bg-red-500/20 text-red-300 border-red-500/30";
    default:
      return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  }
};

export const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "processed":
      return CheckCircle;
    case "processing":
      return Loader2;
    case "failed":
      return AlertCircle;
    default:
      return AlertCircle;
  }
};

export const getEmbeddingStatusColor = (
  embeddingsReady: boolean,
  embeddingProgress: string,
) => {
  if (embeddingsReady) {
    return "bg-green-500/20 text-green-300 border-green-500/30";
  }
  if (
    embeddingProgress === "processing" ||
    embeddingProgress === "in_progress"
  ) {
    return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
  }
  if (embeddingProgress === "failed") {
    return "bg-red-500/20 text-red-300 border-red-500/30";
  }
  return "bg-gray-500/20 text-gray-300 border-gray-500/30";
};

export const getEmbeddingStatusIcon = (
  embeddingsReady: boolean,
  embeddingProgress: string,
) => {
  if (embeddingsReady) {
    return CheckCircle;
  }
  if (
    embeddingProgress === "processing" ||
    embeddingProgress === "in_progress"
  ) {
    return Loader2;
  }
  if (embeddingProgress === "failed") {
    return AlertCircle;
  }
  return Clock;
};

export const getEmbeddingStatusText = (
  embeddingsReady: boolean,
  embeddingProgress: string,
) => {
  if (embeddingsReady) {
    return "Ready";
  }
  if (
    embeddingProgress === "processing" ||
    embeddingProgress === "in_progress"
  ) {
    return "Processing";
  }
  if (embeddingProgress === "failed") {
    return "Failed";
  }
  return "Pending";
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

export const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  } catch {
    return "Unknown";
  }
};

export const getEmbeddingProgress = (file: WorkflowForFiles) => {
  if (file.embeddings_ready) return 100;
  if (
    file.embedding_progress === "processing" ||
    file.embedding_progress === "in_progress"
  )
    return 50;
  if (file.embedding_progress === "failed") return 0;
  return 0;
};

export const truncateText = (text: string, maxLength = 15) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

// ---------------------------------------------------------------------------
// Main hook: all state, effects, and handlers for the workflow files page
// ---------------------------------------------------------------------------

export function useWorkflowFiles(projectId: string, workflowId: string) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [workflowInfo, setWorkflowInfo] = useState<WorkflowInfoFiles | null>(
    null,
  );
  const [filesData, setFilesData] = useState<WorkflowFilesResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [projectInfo, setProjectInfo] = useState<{ name: string } | null>(
    null,
  );
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isUploadFirstDialogOpen, setIsUploadFirstDialogOpen] =
    useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Embedding polling state
  const [isPollingEmbeddings, setIsPollingEmbeddings] = useState(false);
  const [lastPollingTime, setLastPollingTime] = useState<Date | null>(null);
  const [liveMode, modeTypeLive] = useState(false);
  const [credits, setCredits] = useState(0);
  const [role, setRole] = useState<string>("");
  const [username, setUsername] = useState("");
  const [initials, setInitials] = useState("");

  // for info icon
  const [isInfoDialogOpen, setisInfoDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<{
    title: string;
    info: string;
  } | null>(null);

  // Deployment State
  const [deployingWorkflows, setDeployingWorkflows] = useState<Set<string>>(
    new Set(),
  );
  const [deploymentErrors, setDeploymentErrors] = useState<
    Map<string, string>
  >(new Map());

  const infoData = [
    {
      id: "workflow_files",
      title: "Workflow Files Info",
      info: "Files uploaded by the user inside a workflow. Agents can access these files to perform their tasks.",
    },
  ];

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    fetchWorkflowInfo();
    fetchWorkflowFiles();
    fetchProjectInfo();

    // Cleanup polling on unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [router, projectId, workflowId]);

  // Start/stop embedding polling based on file states
  useEffect(() => {
    if (filesData?.files) {
      const pendingFiles = filesData.files.filter(
        (file) =>
          !file.embeddings_ready && file.embedding_progress !== "failed",
      );

      if (pendingFiles.length > 0) {
        startEmbeddingPolling(pendingFiles);
      } else {
        stopEmbeddingPolling();
      }
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [filesData?.files]);

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode == "live") {
      modeTypeLive(true);
    }
  }, []);

  const handleInfoClick = (id: string) => {
    const entry = infoData.find((item) => item.id === id);
    if (entry) {
      setSelectedEntry({ title: entry.title, info: entry.info });
      setisInfoDialogOpen(true);
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
          });
        } else {
          setError("Workflow not found");
        }
      } else if (response.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        router.push("/");
      } else {
        setError("Failed to load workflow information");
      }
    } catch (error) {
      console.error("Fetch workflow info error:", error);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

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
      console.error("Fetch project info error:", error);
      setProjectInfo({
        name: "Project",
      });
    }
  };

  const fetchWorkflowFiles = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) {
        setError("No authentication token found. Please login again.");
        localStorage.removeItem("isAuthenticated");
        router.push("/");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/workflows/${workflowId}/files`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `${tokenType} ${token}`,
          },
        },
      );

      if (response.ok) {
        const data: WorkflowFilesResponse = await response.json();
        setFilesData(data);
      } else if (response.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        router.push("/");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(
          errorData.detail ||
            errorData.message ||
            "Failed to fetch workflow files",
        );
      }
    } catch (error) {
      console.error("Fetch workflow files error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const checkEmbeddingStatus = useCallback(
    async (fileId: string): Promise<EmbeddingStatusResponse | null> => {
      try {
        const token = localStorage.getItem("access_token");
        const tokenType = localStorage.getItem("token_type") || "Bearer";

        if (!token) return null;

        const response = await fetch(
          `${BASE_URL}/files/${fileId}/embedding-status`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `${tokenType} ${token}`,
            },
          },
        );

        if (response.ok) {
          const data: EmbeddingStatusResponse = await response.json();
          return data;
        } else if (response.status === 401) {
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("access_token");
          localStorage.removeItem("token_type");
          router.push("/");
        }
      } catch (error) {
        console.error("Check embedding status error:", error);
      }
      return null;
    },
    [router],
  );

  const updateFileEmbeddingStatus = useCallback(
    (fileId: string, embeddingData: EmbeddingStatusResponse) => {
      setFilesData((prevData) => {
        if (!prevData) return prevData;

        const updatedFiles = prevData.files.map((file) => {
          if (file.id === fileId) {
            return {
              ...file,
              embeddings_ready: embeddingData.embeddings_ready,
              embedding_progress: embeddingData.embedding_progress,
              embedding_status: embeddingData.embedding_status,
              chunk_count: embeddingData.chunk_count,
              embedding_completed_at: embeddingData.embedding_completed_at,
              error: embeddingData.embedding_error,
              status: embeddingData.status,
            };
          }
          return file;
        });

        return {
          ...prevData,
          files: updatedFiles,
        };
      });
    },
    [],
  );

  const startEmbeddingPolling = useCallback(
    (pendingFiles: WorkflowForFiles[]) => {
      // Clear existing interval
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }

      setIsPollingEmbeddings(true);

      const pollEmbeddings = async () => {
        setLastPollingTime(new Date());

        for (const file of pendingFiles) {
          const embeddingStatus = await checkEmbeddingStatus(file.id);
          if (embeddingStatus) {
            updateFileEmbeddingStatus(file.id, embeddingStatus);

            // Log status changes
            if (embeddingStatus.embeddings_ready && !file.embeddings_ready) {
            } else if (
              embeddingStatus.embedding_progress === "failed" &&
              file.embedding_progress !== "failed"
            ) {
            }
          }

          // Small delay between requests to avoid overwhelming the API
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      };

      // Poll immediately, then every 5 seconds
      pollEmbeddings();
      pollingIntervalRef.current = setInterval(pollEmbeddings, 5000);
    },
    [checkEmbeddingStatus, updateFileEmbeddingStatus],
  );

  const stopEmbeddingPolling = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    setIsPollingEmbeddings(false);
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) {
        setUploadError("No authentication token found. Please login again.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("workflow_id", workflowId);
      if (fileName.trim()) {
        formData.append("name", fileName.trim());
      }
      if (fileDescription.trim()) {
        formData.append("description", fileDescription.trim());
      }

      const response = await fetch(`${BASE_URL}/files`, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `${tokenType} ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result: WorkflowForFiles = await response.json();

        // Close dialog and reset form
        setIsUploadDialogOpen(false);
        setSelectedFile(null);
        setFileName("");
        setFileDescription("");

        // Refresh the files list
        await fetchWorkflowFiles();
      } else if (response.status === 401) {
        setUploadError("Session expired. Please login again.");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        router.push("/");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setUploadError(
          errorData.detail || errorData.message || "Failed to upload file",
        );
      }
    } catch (error) {
      console.error("Upload file error:", error);
      setUploadError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const deleteFile = async (fileId: string, fileName: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${fileName}"? This action cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) {
        setError("No authentication token found. Please login again.");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/workflows/${workflowId}/files/${fileId}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            Authorization: `${tokenType} ${token}`,
          },
        },
      );

      if (response.ok) {
        const result = await response.json();

        // Show success message if detail is provided
        if (result.detail) {
        }

        // Refresh the files list
        await fetchWorkflowFiles();
      } else if (response.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        router.push("/");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(
          errorData.detail || errorData.message || "Failed to delete file",
        );
      }
    } catch (error) {
      console.error("Delete file error:", error);
      setError("Network error. Please check your connection and try again.");
    }
  };

  const handleUploadDialogClose = () => {
    setIsUploadDialogOpen(false);
    setSelectedFile(null);
    setFileName("");
    setFileDescription("");
    setUploadError("");
  };

  const deployWorkflow = async (workflowId: any) => {
    setDeployingWorkflows((prev) => new Set(prev).add(workflowId));
    setDeploymentErrors((prev) => {
      const newMap = new Map(prev);
      newMap.delete(workflowId);
      return newMap;
    });

    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) {
        setDeploymentErrors((prev) =>
          new Map(prev).set(
            workflowId,
            "No authentication token found. Please login again.",
          ),
        );
        return;
      }

      const response = await fetch(
        `${BASE_URL}/workflows/${workflowId}/deploy`,
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
        const result = await response.json();

        // Refresh the workflows list to get updated status
        await fetchWorkflowInfo();
      } else if (response.status === 401) {
        setDeploymentErrors((prev) =>
          new Map(prev).set(
            workflowId,
            "Session expired. Please login again.",
          ),
        );
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        router.push("/");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setDeploymentErrors((prev) =>
          new Map(prev).set(
            workflowId,
            errorData.detail ||
              errorData.message ||
              "Failed to deploy workflow",
          ),
        );
      }
    } catch (error) {
      console.error("Deploy workflow error:", error);
      setDeploymentErrors((prev) =>
        new Map(prev).set(
          workflowId,
          "There was an error while performing your request. Please contact the administrator.",
        ),
      );
    } finally {
      setDeployingWorkflows((prev) => {
        const newSet = new Set(prev);
        newSet.delete(workflowId);
        return newSet;
      });
    }
  };

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

  const allEmbeddingsReady =
    filesData?.files.every((file) => file.embeddings_ready) ?? false;
  const hasFiles = (filesData?.total_files ?? 0) > 0;
  const readyForDeployment = filesData?.workflow_accepts_files
    ? hasFiles && allEmbeddingsReady
    : true;
  const pendingEmbeddingsCount =
    filesData?.files.filter(
      (file) =>
        !file.embeddings_ready && file.embedding_progress !== "failed",
    ).length ?? 0;

  return {
    router,
    fileInputRef,

    // core data
    workflowInfo,
    filesData,
    loading,
    error,
    projectInfo,

    // upload dialog state
    isUploadDialogOpen,
    setIsUploadDialogOpen,
    isUploadFirstDialogOpen,
    setIsUploadFirstDialogOpen,
    selectedFile,
    fileName,
    setFileName,
    fileDescription,
    setFileDescription,
    isUploading,
    uploadError,

    // embedding polling
    isPollingEmbeddings,
    lastPollingTime,
    liveMode,
    credits,
    role,
    username,
    initials,

    // info dialog
    isInfoDialogOpen,
    setisInfoDialogOpen,
    selectedEntry,
    infoData,
    handleInfoClick,

    // deployment
    deployingWorkflows,
    deploymentErrors,
    deployWorkflow,

    // handlers
    fetchWorkflowInfo,
    fetchProjectInfo,
    fetchWorkflowFiles,
    handleFileSelect,
    uploadFile,
    deleteFile,
    handleUploadDialogClose,
    fetchAllOrganizations,
    truncateText,

    // derived values
    allEmbeddingsReady,
    hasFiles,
    readyForDeployment,
    pendingEmbeddingsCount,
  };
}