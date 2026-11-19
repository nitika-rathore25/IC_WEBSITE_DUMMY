"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus } from "lucide-react";

interface CreateWorkflowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The trigger element rendered as the direct child of <Dialog>, exactly
   * as in the original markup (a manually-controlled Button, not
   * DialogTrigger). */
  trigger: ReactNode;
  workflowName: string;
  setWorkflowName: (value: string) => void;
  workflowDescription: string;
  setWorkflowDescription: (value: string) => void;
  createError: string;
  isCreating: boolean;
  onCreate: () => void;
  onCancel: () => void;
  /** The original "create first workflow" empty-state dialog rendered the
   * error message a second time below the action buttons. Preserved here
   * behind a flag so both call sites keep their original, exact markup. */
  showDuplicateError?: boolean;
}

export default function CreateWorkflowDialog({
  open,
  onOpenChange,
  trigger,
  workflowName,
  setWorkflowName,
  workflowDescription,
  setWorkflowDescription,
  createError,
  isCreating,
  onCreate,
  onCancel,
  showDuplicateError = false,
}: CreateWorkflowDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger}
      <DialogContent className="border-white/20 text-white max-w-xl dark:bg-linear-to-r from-primary to-accent">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Create New Workflow
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="workflow-name" className="text-white">
              Workflow Name
            </Label>
            <Input
              id="workflow-name"
              placeholder="Enter workflow name"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="workflow-description" className="text-white">
              Description (Optional)
            </Label>
            <Textarea
              id="workflow-description"
              placeholder="Enter workflow description"
              value={workflowDescription}
              onChange={(e) => setWorkflowDescription(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-20"
            />
          </div>
          {createError && (
            <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded border border-red-500/20">
              {createError}
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isCreating}
            className="bg-white/10 border-white/20 text-light hover:bg-white/20"
          >
            Cancel
          </Button>
          <Button
            onClick={onCreate}
            disabled={isCreating || !workflowName.trim()}
            className="bg-linear-to-r from-primary to-accent text-light border border-white/20"
          >
            {isCreating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Create
              </>
            )}
          </Button>
        </div>
        {showDuplicateError && createError && (
          <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded border border-red-500/20">
            {createError}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}