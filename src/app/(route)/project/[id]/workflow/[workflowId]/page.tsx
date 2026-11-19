"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Users, Play, Loader2 } from "lucide-react";
import Footer from "@/components/common/footer";
import { useTheme } from "@/providers/theme-provider";
import Header from "@/components/common/header";

import { Agent, AgentLLMConfig, WorkflowData } from "./components/workflowType";
import WorkflowOverviewCard from "./components/workflowOverviewCard";
import AgentCard from "./components/agentCard";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export default function WorkflowDetails() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  const workflowId = params.workflowId as string;

  const [workflowData, setWorkflowData] = useState<WorkflowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [projectInfo, setProjectInfo] = useState<{ name: string } | null>(null);
  const [liveMode, modeTypeLive] = useState(false);
  const [credits, setCredits] = useState(0);
  const [role, setRole] = useState<string>("");
  const [username, setUsername] = useState("");
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    fetchWorkflowDetails();
    fetchProjectInfo();
  }, [router, projectId, workflowId]);

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode == "live") {
      modeTypeLive(true);
    }
  }, []);

  const [selectedModels, setSelectedModels] = useState<Record<string, string>>(
    {},
  );

  const handleModelChange = (agentName: string, newModel: string) => {
    setSelectedModels((prev) => ({
      ...prev,
      [agentName]: newModel,
    }));
  };

  const fetchWorkflowDetails = async () => {
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
        const workflows: WorkflowData[] = await response.json();
        const workflow = workflows.find((w) => w.id === workflowId);

        if (workflow) {
          // Ensure extracted_config exists and has default values
          const safeWorkflow = {
            ...workflow,
            extracted_config: {
              ...workflow.extracted_config,
              project_name:
                workflow.extracted_config?.project_name || "Untitled Project",
              goal:
                workflow.extracted_config?.goal || "No description available",
              domain: workflow.extracted_config?.domain || "Unknown",
              agents: workflow.extracted_config?.agents || [],
            },
          };
          setWorkflowData(safeWorkflow);
        } else {
          setError("Workflow not found");
        }
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
            "Failed to fetch workflow details",
        );
      }
    } catch (error) {
      console.error("Fetch workflow details error:", error);
      setError("Network error. Please check your connection and try again.");
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

  useEffect(() => {
    if (!workflowData) return;

    const initialModels: Record<string, string> = {};

    workflowData.extracted_config.agents.forEach((agent) => {
      if (agent.agent_llm_config?.model) {
        initialModels[agent.agent_name] = agent.agent_llm_config.model;
      }
    });

    setSelectedModels(initialModels);
  }, [workflowData]);

  const updateAgentLlmConfig = async (
    projectId: string,
    workflowId: string,
    agentName: string,
    payload: AgentLLMConfig,
  ) => {
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";
      const response = await fetch(
        `${BASE_URL}/projects/${projectId}/workflows/${workflowId}/agents/${agentName}/llm-config`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenType} ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update LLM config");
      }
      return data;
    } catch (err) {
      console.error("Update LLM config error:", err);
      throw err;
    }
  };

  const handleApplyAllModels = async () => {
    if (!workflowData) return;

    try {
      const updates = workflowData.extracted_config.agents.map((agent) => {
        const selectedModel = selectedModels[agent.agent_name];

        if (!selectedModel || selectedModel === agent.agent_llm_config.model) {
          return null; // skip unchanged
        }

        const payload = {
          ...agent.agent_llm_config,
          model: selectedModel,
        };

        return updateAgentLlmConfig(
          projectId,
          workflowId,
          agent.agent_name,
          payload,
        );
      });

      await Promise.all(updates.filter(Boolean));
    } catch (err) {
      console.error("Failed updating models", err);
      throw err;
    }
  };

  const handleSaveAndNavigate = async (path: string) => {
    try {
      await handleApplyAllModels(); // save all agent models first
      router.push(path); // then navigate
    } catch (err) {
      console.error("Navigation blocked due to save failure", err);
    }
  };

  if (loading) {
    return (
      <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex items-center justify-center">
        <div className="flex items-center space-x-3 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg">Loading workflow details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex items-center justify-center">
        <div className="text-white text-xl">{error}</div>
      </div>
    );
  }

  if (!workflowData) {
    return (
      <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex items-center justify-center">
        <div className="text-white text-xl">Workflow not found</div>
      </div>
    );
  }

  const primaryAgents = (workflowData.extracted_config?.agents || []).filter(
    (agent) => agent?.role === "Primary",
  );
  const secondaryAgents = (workflowData.extracted_config?.agents || []).filter(
    (agent) => agent?.role === "Secondary",
  );

  return (
    <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex flex-col overflow-hidden">
      <Header
        showBackButton
        backLabel="Back to Workflows"
        onBack={() => router.push(`/project/${projectId}`)}
        breadcrumb={[
          { label: "Project", onClick: () => router.push("/dashboard") },
          {
            label: projectInfo?.name || "Project",
            onClick: () => router.push(`/project/${projectId}`),
          },
          { label: workflowData.workflow_name || "Workflow Details" },
        ]}
      />
      {/* Main Content */}
      <main className="flex-1 px-6 py-4 overflow-auto">
        <div className="space-y-6">
          {/* Workflow Overview */}
          <WorkflowOverviewCard workflowData={workflowData} liveMode={liveMode} />

          {/* Agent Hierarchy */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                <Users className="h-6 w-6 text-gray-300" />
                <span>Agent Hierarchy</span>
                <Badge className="bg-white/10 text-gray-200 border-white/20">
                  {primaryAgents.length} Primary • {secondaryAgents.length}{" "}
                  Secondary
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Primary Agent */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-gray-300" />
                  <span>Primary Agent</span>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </h3>
                <div className="space-y-4">
                  {primaryAgents.map((agent, index) => (
                    <AgentCard
                      key={index}
                      agent={agent}
                      variant="primary"
                      selectedModel={selectedModels[agent.agent_name]}
                      onModelChange={handleModelChange}
                    />
                  ))}
                </div>
              </div>

              {/* Secondary Agents */}
              {secondaryAgents.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <Bot className="h-5 w-5 text-gray-300" />
                    <span>Secondary Agents</span>
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {secondaryAgents.map((agent, index) => (
                      <AgentCard
                        key={index}
                        agent={agent}
                        variant="secondary"
                        selectedModel={selectedModels[agent.agent_name]}
                        onModelChange={handleModelChange}
                      />
                    ))}
                  </div>
                </div>
              )}

              {workflowData.workflow_status.toLowerCase() === "deployed" && (
                <div className="mb-4">
                  <Button
                    onClick={async (e) => {
                      e.stopPropagation();
                      await handleSaveAndNavigate(
                        `/project/${projectId}/workflow/${workflowData.id}/execute`,
                      );
                    }}
                    className="w-full bg-linear-to-r from-primary to-accent text-light"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Execute Workflow
                  </Button>
                </div>
              )}

              {workflowData.workflow_status.toLowerCase() !== "deployed" && (
                <div className="mb-4">
                  <Button
                    onClick={async (e) => {
                      e.stopPropagation();
                      await handleSaveAndNavigate(`/project/${projectId}`);
                    }}
                    className="w-full bg-linear-to-r from-primary to-accent text-light"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Continue
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}