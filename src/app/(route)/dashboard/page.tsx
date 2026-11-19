"use client";
import { useEffect, useState, useRef } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { ChatMessage, Project, SendMessageResponse } from "@/interface/interface";
import ProjectDialogs from "./projectDialog";
import ProjectsList from "./projectsList";
import ChatPanel from "./chatpnale";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
const INFO_DATA = [
  {
    id: "ai_assistant",
    title: "AI Assistant Info",
    info: "A smart assistant that helps you find information related to projects and the agents within them.",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const chatScrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      message: "Hello! How can I help you with your projects today?",
      sender: "assistant",
      timestamp: "10:30 AM",
      project_id: "",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [conversationComplete, setConversationComplete] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  // Project create/edit dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProjectId, setEditProjectId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  // Info dialog
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<{
    title: string;
    info: string;
  } | null>(null);

  useEffect(() => {
    if (chatScrollAreaRef.current) {
      const scrollContainer = chatScrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [chatMessages]);

  useEffect(() => {
    const lastMessage = chatMessages[chatMessages.length - 1];
    if (lastMessage?.sender === "assistant") {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [chatMessages]);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = 24;
      const maxHeight = lineHeight * 4;
      textarea.style.height = Math.min(scrollHeight, maxHeight) + "px";
    }
  }, [newMessage]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/");
      return;
    }
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleInfoClick = () => {
    const entry = INFO_DATA.find((item) => item.id === "ai_assistant");
    if (entry) {
      setSelectedEntry({ title: entry.title, info: entry.info });
      setIsInfoDialogOpen(true);
    }
  };

  const fetchProjects = async () => {
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
      const response = await fetch(`${BASE_URL}/projects`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${tokenType} ${token}`,
        },
      });

      if (response.ok) {
        const data: Project[] = await response.json();
        setProjects(data);
      } else if (response.status === 401 || response.status === 403) {
        setError("Session expired. Please login again.");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        router.push("/");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(
          errorData.detail || errorData.message || "Failed to fetch projects",
        );
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const createNewProject = async () => {
    if (!projectName.trim() || !projectDescription.trim()) {
      setCreateError("Please fill in both name and description");
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

      const response = await fetch(`${BASE_URL}/projects`, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `${tokenType} ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: projectName.trim(),
          description: projectDescription.trim(),
        }),
      });

      if (response.ok) {
        const newProject: Project = await response.json();
        setIsDialogOpen(false);
        setProjectName("");
        setProjectDescription("");
        router.push(`/project/${newProject.id}`);
      } else if (response.status === 401) {
        setCreateError("Session expired. Please login again.");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        router.push("/");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setCreateError(
          errorData.detail || errorData.message || "Failed to create project",
        );
      }
    } catch (error) {
      setCreateError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsCreating(false);
    }
  };

  const updateProject = async () => {
    if (!projectName.trim()) {
      setCreateError("Please fill in both name and description");
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

      const response = await fetch(`${BASE_URL}/projects/${editProjectId}`, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `${tokenType} ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: projectName.trim(),
          description: projectDescription.trim(),
        }),
      });

      if (response.ok) {
        setIsDialogOpen(false);
        resetDialog();
        fetchProjects();
      } else if (response.status === 401) {
        setCreateError("Session expired. Please login again.");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        router.push("/");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setCreateError(
          errorData.detail || errorData.message || "Failed to update project",
        );
      }
    } catch (error) {
      setCreateError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleProjectClick = (projectId: string) => {
    router.push(`/project/${projectId}`);
  };

  const sendMessage = async (message: string) => {
    if (!message.trim() || isSending || conversationComplete) return;

    setIsSending(true);
    setError("");

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      project_id: "",
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

      const response = await fetch(`${BASE_URL}/project-chat/message`, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `${tokenType} ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        const result: SendMessageResponse = await response.json();
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message: result.response || "No response received.",
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          project_id: result.project_id,
        };
        setChatMessages((prev) => [...prev, assistantMessage]);
        if (result.conversation_complete) {
          setConversationComplete(true);

          const completionMessage: ChatMessage = {
            id: (Date.now() + 2).toString(),
            message:
              "🎉 Great! I have gathered all the information needed to configure your workflow. The conversation is now complete and ready for configuration extraction.",
            sender: "assistant",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            project_id: result.project_id,
          };

          setChatMessages((prev) => [...prev, completionMessage]);
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
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message: `Error: ${errorData.detail || errorData.message || "Failed to send message"}`,
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          project_id: "",
        };
        setChatMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: "Network error. Please check your connection and try again.",
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        project_id: "",
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && !isSending && !conversationComplete) {
      sendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetDialog = () => {
    setIsEditMode(false);
    setEditProjectId(null);
    setProjectName("");
    setProjectDescription("");
    setCreateError("");
  };

  const openCreateDialog = () => {
    resetDialog();
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: {
    id: string;
    name: string;
    description: string;
  }) => {
    setIsEditMode(true);
    setEditProjectId(project.id);
    setProjectName(project.name || "");
    setProjectDescription(project.description || "");
    setCreateError("");
    setIsDialogOpen(true);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) resetDialog();
  };

  const handleSaveProject = async () => {
    if (isEditMode && editProjectId) {
      await updateProject();
    } else {
      await createNewProject();
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      (project.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (project.summary || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex items-center space-x-3 text-light">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-lg">Loading your projects...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 max-w-md">
            <CardContent className="p-6 text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto" />
              <h3 className="text-white text-lg font-semibold">
                Error Loading Projects
              </h3>
              <p className="text-gray-300">{error}</p>
              <Button
                onClick={fetchProjects}
                className="bg-linear-to-r from-primary to-accent text-light"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex flex-col overflow-hidden">
     <Header />
      <main className="flex-1 px-6 py-2 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
          <ProjectsList
            projects={filteredProjects}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onRefresh={fetchProjects}
            onProjectClick={handleProjectClick}
            onEditProject={handleEditProject}
            onCreateFirst={openCreateDialog}
          />

          <ChatPanel
            chatMessages={chatMessages}
            isSending={isSending}
            conversationComplete={conversationComplete}
            newMessage={newMessage}
            onNewMessageChange={setNewMessage}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
            textareaRef={textareaRef}
            chatScrollAreaRef={chatScrollAreaRef}
            onOpenNewProject={openCreateDialog}
            isInfoDialogOpen={isInfoDialogOpen}
            onInfoDialogOpenChange={setIsInfoDialogOpen}
            selectedEntry={selectedEntry}
            onInfoClick={handleInfoClick}
          />
        </div>
      </main>

      <ProjectDialogs
        open={isDialogOpen}
        onOpenChange={handleDialogOpenChange}
        isEditMode={isEditMode}
        projectName={projectName}
        onProjectNameChange={setProjectName}
        projectDescription={projectDescription}
        onProjectDescriptionChange={setProjectDescription}
        createError={createError}
        isCreating={isCreating}
        onCancel={() => handleDialogOpenChange(false)}
        onSave={handleSaveProject}
      />

      <Footer />
    </div>
  );
}