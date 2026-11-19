"use client";
import type React from "react";
import { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, MessageCircle, Send, Bot, User, Info, Loader2, } from "lucide-react";
import { ChatMessage } from "@/interface/interface";

interface ChatPanelProps {
  chatMessages: ChatMessage[];
  isSending: boolean;
  conversationComplete: boolean;
  newMessage: string;
  onNewMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  chatScrollAreaRef: RefObject<HTMLDivElement | null>;
  onOpenNewProject: () => void;
  isInfoDialogOpen: boolean;
  onInfoDialogOpenChange: (open: boolean) => void;
  selectedEntry: { title: string; info: string } | null;
  onInfoClick: () => void;
}

export default function ChatPanel({
  chatMessages,
  isSending,
  conversationComplete,
  newMessage,
  onNewMessageChange,
  onSendMessage,
  onKeyPress,
  textareaRef,
  chatScrollAreaRef,
  onOpenNewProject,
  isInfoDialogOpen,
  onInfoDialogOpenChange,
  selectedEntry,
  onInfoClick,
}: ChatPanelProps) {
  return (
    <div className="lg:col-span-2 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          <h2 className="text-xl font-bold text-white">AI Assistant</h2>
          <Info
            className="h-5 text-white cursor-pointer hover:text-gray-200 transition"
            onClick={onInfoClick}
          />
          <Dialog open={isInfoDialogOpen} onOpenChange={onInfoDialogOpenChange}>
            <DialogContent className="dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) border-white/20 text-white">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-white">
                  {selectedEntry?.title}
                </DialogTitle>
              </DialogHeader>

              <div className="text-gray-300 py-4 dark:text-white">
                <p className="leading-relaxed">{selectedEntry?.info}</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Button
          onClick={onOpenNewProject}
          className="bg-linear-to-r from-primary to-accent text-light hover:from-(--primary)/90 hover:to-(--accent)/90 border border-white/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <Card className="flex-1 bg-white/10 backdrop-blur-lg border-white/20 flex flex-col overflow-hidden">
        <CardHeader className="py-1 px-4 shrink-0 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-gray-300" />
            <span className="text-white font-medium">Chat Assistant</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 overflow-auto">
          <ScrollArea ref={chatScrollAreaRef} className="flex-1 p-3">
            <div className="space-y-6">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-xl ${
                      message.sender === "user"
                        ? "bg-linear-to-r from-primary to-accent hover:from-(--primary)/90 hover:to-(--accent)/90"
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
                        <p
                          className="text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: message.message }}
                        ></p>
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
            </div>
          </ScrollArea>
        </CardContent>
        <div className="pt-3 px-3 border-t border-white/20 shrink-0">
            <div className="flex space-x-2 items-end">
              <Textarea
                ref={textareaRef}
                placeholder="Type your message..."
                value={newMessage}
                disabled={isSending || conversationComplete}
                onChange={(e) => onNewMessageChange(e.target.value)}
                onKeyDown={onKeyPress}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 resize-none min-h-10 max-h-24 overflow-y-auto"
                rows={1}
              />
              <Button
                onClick={onSendMessage}
                size="icon"
                disabled={!newMessage.trim() || isSending || conversationComplete}
                className="bg-linear-to-r from-primary to-accent text-light hover:from-(--primary)/90 hover:to-(--accent)/90 h-10 w-10 border border-gray-300 shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
      </Card>
    </div>
  );
}