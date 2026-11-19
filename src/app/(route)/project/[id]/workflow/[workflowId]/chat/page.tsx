"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, CheckCircle } from "lucide-react";
import {
  ChatMessageChat,
  SendMessageResponseChat,
  WorkflowInfo,
} from "@/interface/interface";
import Header from "@/components/common/header";
import ChatMessages from "./components/chatMessages";
import ChatInputPanel from "./components/chatInputPanel";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export default function WorkflowChat() {
  const router = useRouter();
  const params = useParams();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const projectId = params.id as string;
  const workflowId = params.workflowId as string;

  const [workflowInfo, setWorkflowInfo] = useState<WorkflowInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessageChat[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [conversationComplete, setConversationComplete] = useState(false);
  const [error, setError] = useState("");

  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionError, setExtractionError] = useState("");
  const [extractionSuccess, setExtractionSuccess] = useState(false);
  const [projectInfo, setProjectInfo] = useState<{ name: string } | null>(null);
  const [credits, setCredits] = useState(0);
  const [role, setRole] = useState<string>("");
  const [username, setUsername] = useState("");
  const [initials, setInitials] = useState("");

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
      if (
        lastMessage.sender === "assistant" &&
        inputRef.current &&
        !conversationComplete
      ) {
        // Small delay to ensure the message is rendered
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    }
  }, [chatMessages, conversationComplete]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    fetchWorkflowInfo();
    fetchProjectInfo();
  }, [router, projectId, workflowId]);

  const fetchWorkflowInfo = async () => {
    setLoading(true);
    setError("");

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
            conversation_complete: workflow.conversation_complete,
          });

          // Check if workflow is completed but doesn't have extracted config
          if (
            workflow.workflow_status.toLowerCase() === "completed" &&
            !workflow.extracted_config
          ) {
            setConversationComplete(true);
            setChatMessages([
              {
                id: "1",
                message: `Workflow "${workflow.workflow_name || "Untitled Workflow"}" conversation has been completed! The configuration is ready for extraction.`,
                sender: "assistant",
                timestamp: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ]);
          }
          // Check if conversation is already complete
          else if (workflow.conversation_complete) {
            setConversationComplete(true);
            setChatMessages([
              {
                id: "1",
                message: `Configuration for "${workflow.workflow_name || "Untitled Workflow"}" has been completed! The workflow is ready for configuration extraction.`,
                sender: "assistant",
                timestamp: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ]);
          } else {
            // Set initial chat message for active conversations
            setChatMessages([
              {
                id: "1",
                message: `Welcome to the workflow configuration for "${workflow.workflow_name || "Untitled Workflow"}"! I'm here to help you set up and configure your workflow. What would you like this workflow to accomplish?`,
                sender: "assistant",
                timestamp: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ]);
          }
        } else {
          setError("Workflow not found");
          setTimeout(() => router.push(`/project/${projectId}`), 2000);
        }
      } else if (response.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        router.push("/");
      } else {
        setError("Failed to load workflow information");
        setTimeout(() => router.push(`/project/${projectId}`), 2000);
      }
    } catch (error) {
      console.error("Fetch workflow info error:", error);
      setError("Network error occurred");
      setTimeout(() => router.push(`/project/${projectId}`), 2000);
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

  const sendMessage = async (message: string) => {
    if (!message.trim() || isSending || conversationComplete) return;

    setIsSending(true);
    setError("");

    // Add user message immediately
    const userMessage: ChatMessageChat = {
      id: Date.now().toString(),
      message: message,
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
        setError("Authentication token not found. Please login again.");
        localStorage.removeItem("isAuthenticated");
        router.push("/");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/workflow/${workflowId}/send-message`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `${tokenType} ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            workflow_id: workflowId,
            message: message,
          }),
        },
      );

      if (response.ok) {
        const result: SendMessageResponseChat = await response.json();

        // Add assistant response
        const assistantMessage: ChatMessageChat = {
          id: (Date.now() + 1).toString(),
          message: result.ai_response || "No response received.",
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          workflow_id: result.workflow_id,
        };

        setChatMessages((prev) => [...prev, assistantMessage]);

        // Check if conversation is complete
        if (result.conversation_complete) {
          setConversationComplete(true);

          // Add completion message
          const completionMessage: ChatMessageChat = {
            id: (Date.now() + 2).toString(),
            message:
              "🎉 Great! I have gathered all the information needed to configure your workflow. The conversation is now complete and ready for configuration extraction.",
            sender: "assistant",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };

          setChatMessages((prev) => [...prev, completionMessage]);

          // Update workflow info
          setWorkflowInfo((prev) =>
            prev ? { ...prev, conversation_complete: true } : null,
          );
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
          errorData.detail || errorData.message || "Failed to send message",
        );

        // Add error message to chat
        const errorMessage: ChatMessageChat = {
          id: (Date.now() + 1).toString(),
          message: `Error: ${errorData.detail || errorData.message || "Failed to send message"}`,
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setChatMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Send message error:", error);
      setError("Network error. Please check your connection and try again.");

      // Add error message to chat
      const errorMessage: ChatMessageChat = {
        id: (Date.now() + 1).toString(),
        message: "Network error. Please check your connection and try again.",
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const extractConfiguration = async () => {
    if (isExtracting) return;

    setIsExtracting(true);
    setExtractionError("");

    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) {
        setExtractionError(
          "Authentication token not found. Please login again.",
        );
        localStorage.removeItem("isAuthenticated");
        router.push("/");
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
          setExtractionSuccess(true);

          // Add success message to chat
          const successMessage: ChatMessageChat = {
            id: (Date.now() + 3).toString(),
            message: `✅ Configuration extracted successfully! Your workflow "${result.project_configuration?.project_name || workflowInfo?.workflow_name}" is now ready for deployment.`,
            sender: "assistant",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setChatMessages((prev) => [...prev, successMessage]);

          // Redirect to workflow details after a short delay
          setTimeout(() => {
            router.push(`/project/${projectId}/workflow/${workflowId}`);
          }, 2000);
        } else {
          setExtractionError(
            "Configuration extraction failed. Please try again.",
          );
        }
      } else if (response.status === 401) {
        setExtractionError("Session expired. Please login again.");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        router.push("/");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setExtractionError(
          errorData.detail ||
            errorData.message ||
            "Failed to extract configuration",
        );
      }
    } catch (error) {
      console.error("Extract configuration error:", error);
      setExtractionError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && !isSending && !conversationComplete) {
      sendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    if (!conversationComplete) {
      setNewMessage(prompt);
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

  const truncateText = (text: string, maxLength = 15) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  if (loading) {
    return (
      // <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex items-center justify-center">
        <div className="flex items-center space-x-3 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg">Loading workflow...</span>
        </div>
      </div>
    );
  }

  if (error && !workflowInfo) {
    return (
      <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">{error}</div>
          <div className="text-gray-300">Redirecting...</div>
        </div>
      </div>
    );
  }

  return (
    // <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col overflow-hidden">
    <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex flex-col overflow-hidden">
      {/* Header */}
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
          {
            label: workflowInfo?.workflow_name || "Workflow",
            onClick: () =>
              router.push(`/project/${projectId}/workflow/${workflowId}`),
          },
          { label: "Configure" },
        ]}
      />
      {/* Status Bar */}
      {workflowInfo && (
        <div className="bg-white/5 backdrop-blur-lg border-b border-white/10">
          <div className="px-6 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      conversationComplete
                        ? "bg-linear-to-r from-green-500 to-emerald-500"
                        : "bg-linear-to-r from-orange-500 to-yellow-500"
                    }`}
                  >
                    {conversationComplete ? (
                      <CheckCircle className="w-3 h-3 text-white" />
                    ) : (
                      <Sparkles className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-white font-medium">
                    {workflowInfo.workflow_name}
                  </span>
                </div>
                <Badge
                  className={
                    conversationComplete
                      ? "bg-green-500/20 text-green-300 border-green-500/30"
                      : "bg-orange-500/20 text-orange-300 border-orange-500/30"
                  }
                >
                  {conversationComplete ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Configuration Complete
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3 mr-1" />
                      Configuring
                    </>
                  )}
                </Badge>
              </div>
              <div className="text-xs text-gray-400">
                Workflow ID:{" "}
                <code className="bg-white/10 px-1 rounded">
                  {workflowInfo.id}
                </code>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 px-6 py-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden w-full">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 flex-1 flex flex-col overflow-hidden">
            <CardHeader className="py-1 px-4 shrink-0 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-linear-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-white font-medium">
                  Workflow Configuration Assistant
                </span>
                <div
                  className={`w-2 h-2 rounded-full ${
                    conversationComplete
                      ? "bg-green-400"
                      : "bg-green-400 animate-pulse"
                  }`}
                ></div>
                {workflowInfo && (
                  <span className="text-gray-300 text-sm">
                    • {workflowInfo.workflow_name}
                  </span>
                )}
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 overflow-auto">
              <ChatMessages
                chatMessages={chatMessages}
                isSending={isSending}
                conversationComplete={conversationComplete}
                workflowInfo={workflowInfo}
                scrollAreaRef={scrollAreaRef}
                onQuickPrompt={handleQuickPrompt}
              />

              <ChatInputPanel
                workflowInfo={workflowInfo}
                conversationComplete={conversationComplete}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                isSending={isSending}
                inputRef={inputRef}
                handleSendMessage={handleSendMessage}
                error={error}
                isExtracting={isExtracting}
                extractionError={extractionError}
                extractionSuccess={extractionSuccess}
                extractConfiguration={extractConfiguration}
              />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-white/5 backdrop-blur-lg border-t border-white/10">
        <div className="container mx-auto px-4 py-1">
          <div className="flex items-center justify-center text-xs">
            <div className="text-gray-400">© 2025 Talknact</div>
          </div>
        </div>
      </footer>
    </div>
  );
}