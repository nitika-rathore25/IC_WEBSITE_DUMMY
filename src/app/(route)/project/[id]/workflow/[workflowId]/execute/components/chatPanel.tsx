"use client";

import { RefObject } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  BarChart3,
  Bot,
  CheckCircle,
  Info,
  Loader2,
  RefreshCw,
  Send,
  User,
} from "lucide-react";
import { ChatMessage, WorkflowInfo, containsHTML, parseHTMLContent } from "../components/type";

const ChartConverter = dynamic(
  () =>
    import("@/components/common/chart-converter").then((mod) => ({
      default: mod.ChartConverter,
    })),
  { ssr: false },
);

interface ChatPanelProps {
  workflowInfo: WorkflowInfo | null;
  chatMessages: ChatMessage[];
  isExecuting: boolean;
  historyLoaded: boolean;
  isClearingChat: boolean;
  showChartConverter: { [key: string]: boolean };
  newMessage: string;
  setNewMessage: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  toggleChartConverter: (messageId: string) => void;
  clearChatHistory: () => Promise<void>;
  handleInfoClick: (id: string) => void;
  scrollAreaRef: RefObject<HTMLDivElement | null>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

export default function ChatPanel({
  workflowInfo,
  chatMessages,
  isExecuting,
  historyLoaded,
  isClearingChat,
  showChartConverter,
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleKeyPress,
  toggleChartConverter,
  clearChatHistory,
  handleInfoClick,
  scrollAreaRef,
  textareaRef,
}: ChatPanelProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 flex-1 flex flex-col overflow-hidden">
      <CardHeader className="py-1 px-4 shrink-0 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <Bot className="w-3 h-3 text-white" />
            </div>
            <span className="text-white font-medium">Workflow Execution</span>
            <Info
              className="h-4 w-4 text-white ml-1 cursor-pointer hover:text-gray-300 transition"
              onClick={() => handleInfoClick("workflow_execution")}
            />

            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            {workflowInfo && (
              <span className="text-gray-300 text-sm">
                • {workflowInfo.workflow_name}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={clearChatHistory}
              disabled={isClearingChat || isExecuting}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-gray-300/30 hover:border-gray-300/30"
            >
              {isClearingChat ? (
                <>
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  Clearing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Start New Conversation
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-3 overflow-auto flex-1">
        <ScrollArea ref={scrollAreaRef} className="flex-1">
          {!historyLoaded && (
            <div className="flex justify-center py-4">
              <div className="bg-white/10 text-gray-200 border border-white/20 p-3 rounded-xl">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                  <span className="text-sm">Loading chat history...</span>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-6">
            {chatMessages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-xl ${
                      message.sender === "user"
                        ? "bg-linear-to-r from-primary to-accent text-light"
                        : message.execution_successful === false
                          ? "bg-red-500/20 dark:text-red-200 border border-red-500/30"
                          : "bg-white/10 text-gray-200 border border-white/20"
                    } ${
                      containsHTML(message.message) ? "prose-container" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3  ">
                      {message.sender === "assistant" && (
                        <div className="shrink-0 mt-1">
                          {message.execution_successful === false ? (
                            <AlertCircle className="w-4 h-4 text-red-400" />
                          ) : (
                            <Bot className="w-4 h-4 text-green-300" />
                          )}
                        </div>
                      )}
                      {message.sender === "user" && (
                        <div className="shrink-0 mt-1">
                          <User className="w-4 h-4 text-light" />
                        </div>
                      )}

                      <div className="flex-1">
                        {message.message && (
                          <div className="text-sm leading-relaxed whitespace-pre-wrap">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: parseHTMLContent(message.message),
                              }}
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs opacity-70">
                            {message.timestamp}
                          </p>
                          <div className="flex items-center space-x-2">
                            {message.execution_successful !== undefined && (
                              <div className="flex items-center space-x-1">
                                {message.execution_successful ? (
                                  <CheckCircle className="w-3 h-3 text-green-400" />
                                ) : (
                                  <AlertCircle className="w-3 h-3 text-red-400" />
                                )}
                                <span className="text-xs opacity-70">
                                  {message.execution_successful
                                    ? "Success"
                                    : "Failed"}
                                </span>
                              </div>
                            )}
                            {message?.enhanced_response?.responseType &&
                              message?.enhanced_response?.responseType !==
                                "text" && (
                                <Button
                                  onClick={() =>
                                    toggleChartConverter(message.id)
                                  }
                                  variant="default"
                                  size="sm"
                                  className="h-6 px-2 text-xs bg-linear-to-r from-primary to-accent text-light hover:from-(--primary)/90 hover:to-(--accent)/90 border border-white/20"
                                >
                                  <BarChart3 className="w-3 h-3 mr-1" />
                                  Chart
                                </Button>
                              )}
                          </div>
                        </div>
                        {message.method && (
                          <div className="mt-1">
                            <Badge className="bg-white/10 text-gray-300 border-white/20 text-xs">
                              {message.method}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart Converter */}
                {message?.enhanced_response?.responseType &&
                  message?.enhanced_response?.responseType !== "text" &&
                  showChartConverter[message.id] && (
                    <ChartConverter
                      fallbackData={message.enhanced_response}
                      messageId={message.ai_message_id || message.id}
                      chartId={message.chart_id ?? ""}
                      onClose={() => toggleChartConverter(message.id)}
                    />
                  )}
              </div>
            ))}

            {isExecuting && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-gray-200 border border-white/20 max-w-[85%] p-4 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                    <span className="text-sm">Executing workflow...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      
        <div className="pt-3 px-3 border-t border-white/20 shrink-0">
          <div className="flex space-x-3">
            <Textarea
              ref={textareaRef}
              placeholder="Send a message to execute the workflow..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isExecuting}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-300 resize-none min-h-10 max-h-16 h-full overflow-y-auto text-base px-4"
              rows={1}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-linear-to-r from-primary to-accent hover:from-(--primary)/90 hover:to-(--accent)/90 h-10 text-light px-4 border border-gray-300 shrink-0"
              disabled={!newMessage.trim() || isExecuting}
            >
              {isExecuting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-1 text-center">
            Press Enter to send • Your message will be processed by the
            deployed AI workflow
          </p>
        </div>
      {/* </CardFooter> */}
    </Card>
  );
}