import { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sparkles,
  Lightbulb,
  Code,
  Palette,
  Loader2,
  Bot,
  User,
} from "lucide-react";
import { ChatMessageChat, WorkflowInfo } from "@/interface/interface";

const quickPrompts = [
  {
    icon: Code,
    text: "Create a data processing workflow",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    text: "Design a content generation pipeline",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Lightbulb,
    text: "Build an analysis and reporting workflow",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Sparkles,
    text: "Set up an automated decision workflow",
    color: "from-green-500 to-emerald-500",
  },
];

interface ChatMessagesProps {
  chatMessages: ChatMessageChat[];
  isSending: boolean;
  conversationComplete: boolean;
  workflowInfo: WorkflowInfo | null;
  scrollAreaRef: RefObject<HTMLDivElement | null>;
  onQuickPrompt: (prompt: string) => void;
}

export default function ChatMessages({
  chatMessages,
  isSending,
  conversationComplete,
  scrollAreaRef,
  onQuickPrompt,
}: ChatMessagesProps) {
  return (
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
                  ? "bg-linear-to-r from-primary to-accent text-light"
                  : "bg-white/10 text-gray-200 border border-white/20"
              }`}
            >
              <div className="flex items-start space-x-3">
                {message.sender === "assistant" && (
                  <div className="shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-orange-400" />
                  </div>
                )}
                {message.sender === "user" && (
                  <div className="shrink-0 mt-1">
                    <User className="w-4 h-4 text-light" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">{message.message}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex justify-start">
            <div className="bg-white/10 text-gray-200 border border-white/20 max-w-[85%] p-4 rounded-xl">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-4 h-4 text-orange-400 animate-spin" />
                <span className="text-sm">Processing your message...</span>
              </div>
            </div>
          </div>
        )}

        {chatMessages.length === 1 && !conversationComplete && (
          <div className="mt-8">
            <p className="text-gray-300 text-sm mb-4 text-center">
              Quick configuration prompts:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  onClick={() => onQuickPrompt(prompt.text)}
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 p-4 h-auto justify-start"
                  disabled={conversationComplete}
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
  );
}