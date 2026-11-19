"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";

interface ProjectDialogsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  projectName: string;
  onProjectNameChange: (value: string) => void;
  projectDescription: string;
  onProjectDescriptionChange: (value: string) => void;
  createError: string;
  isCreating: boolean;
  onCancel: () => void;
  onSave: () => void;
}

export default function ProjectDialogs({
  open,
  onOpenChange,
  isEditMode,
  projectName,
  onProjectNameChange,
  projectDescription,
  onProjectDescriptionChange,
  createError,
  isCreating,
  onCancel,
  onSave,
}: ProjectDialogsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/20 text-white dark:bg-linear-to-r from-primary to-accent w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {isEditMode ? "Edit Project" : "Create New Project"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="project-name" className="text-white">
              Project Name
            </Label>
            <Input
              id="project-name"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => onProjectNameChange(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description" className="text-white">
              Description
            </Label>
            <Textarea
              id="project-description"
              placeholder="Enter project description"
              value={projectDescription}
              onChange={(e) => onProjectDescriptionChange(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-25"
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
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            disabled={isCreating || !projectName.trim() || !projectDescription.trim()}
            className="bg-linear-to-r from-primary to-accent text-light hover:from-(--primary)/90 hover:to-(--accent)/90 border border-white/20"
          >
            {isCreating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {isEditMode ? "Saving..." : "Creating..."}
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                {isEditMode ? "Save Changes" : "Create"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}