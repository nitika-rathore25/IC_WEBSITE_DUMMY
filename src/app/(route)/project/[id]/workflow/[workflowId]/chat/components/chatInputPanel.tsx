import { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Loader2, Send, Settings } from "lucide-react";
import { WorkflowInfo } from "@/interface/interface";

interface ChatInputPanelProps {
  workflowInfo: WorkflowInfo | null;
  conversationComplete: boolean;
  newMessage: string;
  setNewMessage: (value: string) => void;
  isSending: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  handleSendMessage: () => void;
  error: string;
  isExtracting: boolean;
  extractionError: string;
  extractionSuccess: boolean;
  extractConfiguration: () => void;
}

export default function ChatInputPanel({
  workflowInfo,
  conversationComplete,
  newMessage,
  setNewMessage,
  isSending,
  inputRef,
  handleSendMessage,
  error,
  isExtracting,
  extractionError,
  extractionSuccess,
  extractConfiguration,
}: ChatInputPanelProps) {
  return (
    <div className="p-3 border-t border-white/20 shrink-0">
      {conversationComplete ? (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span className="text-green-300 font-medium">
              Configuration Complete
            </span>
          </div>
          <p className="text-gray-300 text-sm mb-4">
            {workflowInfo?.workflow_status.toLowerCase() === "completed"
              ? "The workflow conversation has been completed and is ready for configuration extraction"
              : "The workflow configuration is complete. Return to the workflows page to extract the configuration"}{" "}
            or click extract button to extract the configuration.
          </p>

          {!extractionSuccess && (
            <div className="space-y-3">
              <Button
                onClick={extractConfiguration}
                disabled={isExtracting}
                className="bg-linear-to-r from-primary to-accent text-light"
              >
                {isExtracting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Extracting Configuration...
                  </>
                ) : (
                  <>
                    <Settings className="h-4 w-4 mr-2" />
                    Extract Configuration
                  </>
                )}
              </Button>

              {extractionError && (
                <div className="text-red-400 text-sm bg-red-500/10 p-2 rounded border border-red-500/20">
                  {extractionError}
                </div>
              )}
            </div>
          )}

          {extractionSuccess && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <CheckCircle className="h-4 w-4 text-blue-400" />
                <span className="text-blue-300 font-medium text-sm">
                  Extraction Successful
                </span>
              </div>
              <p className="text-gray-300 text-xs">
                Redirecting to workflow details...
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="flex space-x-3">
            <Input
              ref={inputRef}
              placeholder="Describe your workflow requirements and goals..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSendMessage()
              }
              disabled={isSending || conversationComplete}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-200 h-12 text-base px-4"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-linear-to-r from-primary to-accent text-light h-12 px-6 border border-gray-300/60"
              disabled={!newMessage.trim() || isSending || conversationComplete}
            >
              {isSending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-1 text-center">
            Press Enter to send • Describe your workflow goals and
            requirements for AI assistance
          </p>
        </>
      )}

      {error && (
        <div className="mt-2 text-red-400 text-sm bg-red-500/10 p-2 rounded border border-red-500/20">
          {error}
        </div>
      )}
    </div>
  );
}