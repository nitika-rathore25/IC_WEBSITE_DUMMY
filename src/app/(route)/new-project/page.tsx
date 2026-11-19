"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, Lightbulb, Code, Palette } from "lucide-react";
import Header from "@/components/common/header";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

interface ChatMessage {
  id: string;
  message: string;
  sender: "user" | "assistant";
  timestamp: string;
}

export default function NewProject() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const projectId = searchParams.get("projectId");
  const projectName = searchParams.get("projectName");
  const [credits, setCredits] = useState(0);
  const [role, setRole] = useState<string>("");
  const [username, setUsername] = useState("");
  const [initials, setInitials] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      message:
        projectId && projectName
          ? `Great! I've created your project "${decodeURIComponent(projectName)}". Now let's build something amazing together! What kind of workflow would you like to create for this project?`
          : "Welcome to the New Project Creator! I'm here to help you bring your ideas to life. What kind of project would you like to create today?",
      sender: "assistant",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
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
      if (lastMessage.sender === "assistant" && inputRef.current) {
        // Small delay to ensure the message is rendered
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    }
  }, [chatMessages]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [router]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        message: newMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatMessages((prev) => [...prev, userMessage]);
      setNewMessage("");
      setTimeout(() => {
        const responses = [
          "That sounds like an exciting project! Let me help you plan the architecture and key features.",
          "Great idea! I can assist you with the technical requirements and implementation strategy.",
          "Excellent! Let's break down your project into manageable phases and define the scope.",
          "Perfect! I'll help you identify the best technologies and frameworks for your project.",
        ];

        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message: responses[Math.floor(Math.random() * responses.length)],
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setChatMessages((prev) => [...prev, assistantMessage]);
      }, 1500);
    }
  };

  const quickPrompts = [
    {
      icon: Code,
      text: "Build a web application",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Palette,
      text: "Design a mobile app",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Lightbulb,
      text: "Create an AI solution",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Sparkles,
      text: "Develop a SaaS platform",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const handleQuickPrompt = (prompt: string) => {
    setNewMessage(prompt);
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

  // const truncateText = (text: string, maxLength = 15) => {
  //   if (!text) return "";
  //   return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  // };

  return (
    <div
      className="h-screen bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to)
   flex flex-col overflow-hidden"
    >
      <Header
        showBackButton
        backLabel="Dashboard"
        breadcrumb={[
          { label: "Project", onClick: () => router.push("/dashboard") },
          {
            label: projectName
              ? `Project: ${decodeURIComponent(projectName)}`
              : "Create New Project",
          },
        ]}
      />
      <main className="flex-1 px-6 py-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden w-full">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 flex-1 flex flex-col overflow-hidden">
            <CardHeader className="py-1 px-4 shrink-0 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-linear-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-white font-medium">
                  AI Project Assistant
                </span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                {projectId && (
                  <span className="text-gray-400 text-sm">
                    • Project Created Successfully
                  </span>
                )}
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
                <div className="space-y-6">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] p-4 rounded-xl ${
                          message.sender === "user"
                            ? "bg-linear-to-r from-primary to-accent text-white"
                            : "bg-white/10 text-gray-200 border border-white/20"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.message}
                        </p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}

                  {chatMessages.length === 1 && !projectId && (
                    <div className="mt-8">
                      <p className="text-gray-300 text-sm mb-4 text-center">
                        Quick start prompts:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {quickPrompts.map((prompt, index) => (
                          <Button
                            key={index}
                            onClick={() => handleQuickPrompt(prompt.text)}
                            variant="outline"
                            className="bg-white/5 border-white/20 text-white hover:bg-white/10 p-4 h-auto justify-start"
                          >
                            <div
                              className={`w-8 h-8 bg-linear-to-r ${prompt.color} rounded-lg flex items-center justify-center mr-3`}
                            >
                              <prompt.icon className="w-4 h-4 text-white" />
                            </div>
                            <span>{prompt.text}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-3 border-t border-white/20 shrink-0">
                <div className="flex space-x-3">
                  <Input
                    ref={inputRef}
                    placeholder={
                      projectId
                        ? "Describe your workflow requirements..."
                        : "Describe your project idea in detail..."
                    }
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-base px-4"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-linear-to-r from-primary to-accent h-12 px-6 border border-gray-300"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-1 text-center">
                  Press Enter to send •{" "}
                  {projectId
                    ? "Start building your workflow"
                    : "Be specific about your requirements for better assistance"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
