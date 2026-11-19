"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  CreateWorkflowResponse,
  ProjectInfo,
  WorkflowFileRequirement,
  WorkflowItem,
} from "@/interface/interface";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export const infoData = [
  {
    id: "workflows",
    title: "Workflows Info",
    info: "A workflow is a structured sequence of tasks, information flow, and rules. It contains one or more agents that execute specific steps.",
  },
  {
    id: "manage_files",
    title: "Manage Files Info",
    info: "Information about files associated with a specific workflow.",
  },
];

/**
 * All state, side-effects, and business logic for the Project Workflows page,
 * extracted into a single hook so the page component itself can stay focused
 * on composing UI. Behavior is unchanged from the original implementation.
 */
export function useProjectWorkflows() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreateFirstDialogOpen, setIsCreateFirstDialogOpen] =
    useState(false);
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [credits, setCredits] = useState(0);
  const [role, setRole] = useState<string>("");
  const [username, setUsername] = useState("");
  const [initials, setInitials] = useState("");
  const [extractingWorkflows, setExtractingWorkflows] = useState<Set<string>>(
    new Set(),
  );
  const [extractionErrors, setExtractionErrors] = useState<
    Map<string, string>
  >(new Map());

  // Deployment State
  const [deployingWorkflows, setDeployingWorkflows] = useState<Set<string>>(
    new Set(),
  );
  const [deploymentErrors, setDeploymentErrors] = useState<
    Map<string, string>
  >(new Map());

  // File Management State
  const [workflowFileRequirements, setWorkflowFileRequirements] = useState<
    Map<string, WorkflowFileRequirement>
  >(new Map());
  const [checkingFileRequirements, setCheckingFileRequirements] = useState<
    Set<string>
  >(new Set());
  const [fileRequirementErrors, setFileRequirementErrors] = useState<
    Map<string, string>
  >(new Map());
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  // for info icon
  const [isInfoDialogOpen, setisInfoDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<{
    title: string;
    info: string;
  } | null>(null);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    fetchProjectWorkflows();
    fetchAllOrganizations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, projectId]);

  const handleInfoClick = (id: string) => {
    const entry = infoData.find((item) => item.id === id);
    if (entry) {
      setSelectedEntry({ title: entry.title, info: entry.info });
      setisInfoDialogOpen(true);
    }
  };

  const fetchProjectWorkflows = async () => {
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
        const data: WorkflowItem[] = await response.json();
        setWorkflows(data);
        // Replace with:
        // Fetch project info from project API
        await fetchProjectInfo();

        // Check file requirements for extracted workflows
        const extractedWorkflows = data.filter(
          (w) =>
            w.workflow_status.toLowerCase() === "extracted" ||
            w.workflow_status.toLowerCase() === "deployed",
        );

        for (const workflow of extractedWorkflows) {
          checkWorkflowFileRequirements(workflow.id);
        }
      } else if (response.status === 401 || response.status === 403) {
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
            "Failed to fetch workflows",
        );
      }
    } catch (error) {
      console.error("Fetch workflows error:", error);
      setError(
        "There was an error while performing your request. Please contact the administrator.",
      );
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
          id: projectId,
          name: project.name || "Untitled Project",
          description: project.description || "No description available",
          domain: project.domain || "Unknown",
        });
      }
    } catch (error) {
      console.error("Fetch project info error:", error);
      // Set fallback project info
      setProjectInfo({
        id: projectId,
        name: "Project",
        description: "Loading project information...",
        domain: "Unknown",
      });
    }
  };

  // File Management Functions
  const checkWorkflowFileRequirements = async (workflowId: string) => {
    if (checkingFileRequirements.has(workflowId)) return;

    setCheckingFileRequirements((prev) => new Set(prev).add(workflowId));
    setFileRequirementErrors((prev) => {
      const newMap = new Map(prev);
      newMap.delete(workflowId);
      return newMap;
    });

    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) {
        setFileRequirementErrors((prev) =>
          new Map(prev).set(workflowId, "Authentication required"),
        );
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
        const data = await response.json();
        // Check if any files have embeddings_ready: false
        const hasUnreadyEmbeddings =
          data.files &&
          data.files.some((file: any) => file.embeddings_ready === false);
        const totalFiles = data.total_files || 0;
        const requiresFiles = data.workflow_accepts_files || false;
        const noFilesUploaded = requiresFiles && totalFiles === 0;

        let description = "";
        if (noFilesUploaded) {
          description = `No files uploaded. This workflow requires ${data.expected_formats.join(", ")} files to be uploaded before deployment.`;
        } else if (data.missing_formats?.length > 0) {
          description = `Missing file formats: ${data.missing_formats.join(", ")}. Expected: ${data.expected_formats.join(", ")}`;
        } else if (hasUnreadyEmbeddings) {
          description =
            "Some files are still processing embeddings. Please wait for all files to complete processing before deploying.";
        } else {
          description = `Upload ${data.expected_formats.join(", ")} files for processing by the workflow agents`;
        }

        const requirement: WorkflowFileRequirement = {
          workflow_id: workflowId,
          requires_files: requiresFiles,
          expected_file_types: data.expected_formats || [],
          max_file_size: 10 * 1024 * 1024, // 10MB default - adjust as needed
          max_files_count: 10, // Default - adjust as needed
          description: description,
          has_unready_embeddings: hasUnreadyEmbeddings,
          total_files: totalFiles,
        };

        setWorkflowFileRequirements((prev) =>
          new Map(prev).set(workflowId, requirement),
        );
      } else if (response.status === 401) {
        setFileRequirementErrors((prev) =>
          new Map(prev).set(
            workflowId,
            "Session expired. Please login again.",
          ),
        );
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setFileRequirementErrors((prev) =>
          new Map(prev).set(
            workflowId,
            errorData.detail ||
              errorData.message ||
              "Failed to check file requirements",
          ),
        );
      }
    } catch (error) {
      console.error("Check file requirements error:", error);
      setFileRequirementErrors((prev) =>
        new Map(prev).set(workflowId, "Failed to check file requirements"),
      );
    } finally {
      setCheckingFileRequirements((prev) => {
        const newSet = new Set(prev);
        newSet.delete(workflowId);
        return newSet;
      });
    }
  };

  const createNewWorkflow = async () => {
    if (role !== "superadmin" && credits <= 0) {
      setCreateError(
        "Insufficient credits. Please recharge to create a workflow.",
      );
      return;
    }
    if (!workflowName.trim()) {
      setCreateError("Please enter a workflow name");
      return;
    }

    setIsCreating(true);
    setCreateError("");

    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) {
        setCreateError("No authentication token found. Please login again.");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/projects/${projectId}/start-workflow`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `${tokenType} ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            project_id: projectId,
            name: workflowName.trim(),
          }),
        },
      );

      if (response.ok) {
        const result: CreateWorkflowResponse = await response.json();

        // Close dialog and reset form
        setIsCreateDialogOpen(false);
        setWorkflowName("");
        setWorkflowDescription("");

        // Show success message (you could add a toast notification here)

        // Refresh the workflows list
        await fetchProjectWorkflows();

        // Navigate to the workflow chat page for new workflows
        if (result.workflow_id) {
          router.push(
            `/project/${projectId}/workflow/${result.workflow_id}/chat`,
          );
        }
      } else if (response.status === 401) {
        setCreateError("Session expired. Please login again.");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        router.push("/");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setCreateError(
          errorData.detail ||
            errorData.message ||
            "Failed to create workflow",
        );
      }
    } catch (error) {
      console.error("Create workflow error:", error);
      setCreateError(
        "There was an error while performing your request. Please contact the administrator.",
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleWorkflowClick = (workflow: WorkflowItem) => {
    // Check if workflow is completed but doesn't have extracted config
    if (
      workflow.workflow_status.toLowerCase() === "completed" &&
      !workflow.extracted_config
    ) {
      // Redirect to chat page for extraction
      router.push(`/project/${projectId}/workflow/${workflow.id}/chat`);
      return;
    }

    // Check if workflow needs configuration extraction
    if (!workflow.extracted_config && workflow.conversation_complete) {
      // Don't navigate - user needs to extract configuration first
      return;
    }

    // Check if workflow is extracted or completed - both can show agent details
    if (
      workflow.workflow_status.toLowerCase() === "extracted" ||
      (workflow.extracted_config && workflow.completed_at)
    ) {
      // Redirect to details page for extracted/completed workflows
      router.push(`/project/${projectId}/workflow/${workflow.id}`);
    } else if (!workflow.extracted_config || !workflow.completed_at) {
      // Redirect to chat page for incomplete workflows
      router.push(`/project/${projectId}/workflow/${workflow.id}/chat`);
    }
  };

  const handleFilesClick = (workflowId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/project/${projectId}/workflow/${workflowId}/files`);
  };

  const handleCreateDialogClose = () => {
    setIsCreateDialogOpen(false);
    setWorkflowName("");
    setWorkflowDescription("");
    setCreateError("");
  };

  const isWorkflowComplete = (workflow: WorkflowItem) => {
    return workflow.extracted_config && workflow.completed_at;
  };

  const isWorkflowExtracted = (workflow: WorkflowItem) => {
    return (
      workflow.workflow_status.toLowerCase() === "extracted" &&
      workflow.extracted_config
    );
  };

  const needsConfigurationExtraction = (workflow: WorkflowItem) => {
    return !workflow.extracted_config && workflow.conversation_complete;
  };

  const canShowAgentDetails = (workflow: WorkflowItem) => {
    return isWorkflowComplete(workflow) || isWorkflowExtracted(workflow);
  };

  const isWorkflowDeployed = (workflow: WorkflowItem) => {
    return workflow.workflow_status.toLowerCase() === "deployed";
  };

  const workflowRequiresFiles = (workflowId: string) => {
    const requirement = workflowFileRequirements.get(workflowId);
    return requirement?.requires_files || false;
  };

  const canShowFilesLink = (workflow: WorkflowItem) => {
    return (
      (isWorkflowExtracted(workflow) || isWorkflowDeployed(workflow)) &&
      workflowRequiresFiles(workflow.id)
    );
  };

  const filteredWorkflows = workflows.filter(
    (workflow) =>
      (workflow.workflow_name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (workflow.extracted_config?.goal || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (workflow.extracted_config?.project_name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const extractConfiguration = async (workflowId: string) => {
    setExtractingWorkflows((prev) => new Set(prev).add(workflowId));
    setExtractionErrors((prev) => {
      const newMap = new Map(prev);
      newMap.delete(workflowId);
      return newMap;
    });

    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) {
        setExtractionErrors((prev) =>
          new Map(prev).set(
            workflowId,
            "No authentication token found. Please login again.",
          ),
        );
        return;
      }

      const response = await fetch(
        `${BASE_URL}/workflows/${workflowId}/extract-configuration`,
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

        if (result.extraction_successful) {
          // Refresh the workflows list to get updated data
          await fetchProjectWorkflows();
        } else {
          setExtractionErrors((prev) =>
            new Map(prev).set(
              workflowId,
              "Configuration extraction failed. Please try again.",
            ),
          );
        }
      } else if (response.status === 401) {
        setExtractionErrors((prev) =>
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
        setExtractionErrors((prev) =>
          new Map(prev).set(
            workflowId,
            errorData.detail ||
              errorData.message ||
              "Failed to extract configuration",
          ),
        );
      }
    } catch (error) {
      console.error("Extract configuration error:", error);
      setExtractionErrors((prev) =>
        new Map(prev).set(
          workflowId,
          "There was an error while performing your request. Please contact the administrator.",
        ),
      );
    } finally {
      setExtractingWorkflows((prev) => {
        const newSet = new Set(prev);
        newSet.delete(workflowId);
        return newSet;
      });
    }
  };

  const deployWorkflow = async (workflowId: string) => {
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
        await fetchProjectWorkflows();
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

  const canDeployWorkflow = (workflowId: string) => {
    const requirement = workflowFileRequirements.get(workflowId);

    // If files are required but none are uploaded
    if (requirement?.requires_files && (requirement?.total_files || 0) === 0) {
      return false;
    }

    // If any files have unready embeddings
    if (requirement?.has_unready_embeddings) {
      return false;
    }

    return true;
  };

  const getDeploymentBlockReason = (workflowId: string) => {
    const requirement = workflowFileRequirements.get(workflowId);

    // If files are required but none are uploaded
    if (requirement?.requires_files && (requirement?.total_files || 0) === 0) {
      return "No files uploaded. Please upload required files before deploying.";
    }

    // If any files have unready embeddings
    if (requirement?.has_unready_embeddings) {
      return "Files are still processing. Deployment disabled until all embeddings are ready.";
    }

    return "";
  };

  const handleFileRequirementClick = (
    workflowId: string,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    router.push(`/project/${projectId}/workflow/${workflowId}/files`);
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
      console.log(decoded);

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

  return {
    router,
    projectId,

    // core data
    projectInfo,
    workflows,
    loading,
    error,
    filteredWorkflows,

    // search / dialogs
    searchTerm,
    setSearchTerm,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isCreateFirstDialogOpen,
    setIsCreateFirstDialogOpen,
    workflowName,
    setWorkflowName,
    workflowDescription,
    setWorkflowDescription,
    isCreating,
    createError,
    setCreateError,

    // account/credits/role
    credits,
    role,
    username,
    initials,

    // extraction
    extractingWorkflows,
    extractionErrors,
    extractConfiguration,

    // deployment
    deployingWorkflows,
    deploymentErrors,
    deployWorkflow,
    canDeployWorkflow,
    getDeploymentBlockReason,

    // files
    workflowFileRequirements,
    checkingFileRequirements,
    fileRequirementErrors,
    handleFilesClick,
    handleFileRequirementClick,

    // misc UI state
    isThemeOpen,
    setIsThemeOpen,
    isInfoDialogOpen,
    setisInfoDialogOpen,
    selectedEntry,
    isCreditsOpen,
    setIsCreditsOpen,
    infoData,
    handleInfoClick,

    // actions
    fetchProjectWorkflows,
    createNewWorkflow,
    handleWorkflowClick,
    handleCreateDialogClose,

    // status helpers
    isWorkflowComplete,
    isWorkflowExtracted,
    needsConfigurationExtraction,
    canShowAgentDetails,
    isWorkflowDeployed,
    workflowRequiresFiles,
    canShowFilesLink,
  };
}

export type UseProjectWorkflowsReturn = ReturnType<typeof useProjectWorkflows>;