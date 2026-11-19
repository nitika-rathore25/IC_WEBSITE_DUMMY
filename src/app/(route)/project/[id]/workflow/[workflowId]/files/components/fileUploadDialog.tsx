"use client";

import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload } from "lucide-react";
import { formatFileSize } from "./useWorkflowFiles";

interface FileUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  selectedFile: File | null;
  fileName: string;
  setFileName: (value: string) => void;
  fileDescription: string;
  setFileDescription: (value: string) => void;
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadError: string;
  isUploading: boolean;
  onCancel: () => void;
  onUpload: () => void;
  // Preserves the small class-name differences between the two original dialogs
  fileInputBgClass?: string;
  placeholderClass?: string;
}

export default function FileUploadDialog({
  open,
  onOpenChange,
  trigger,
  fileInputRef,
  selectedFile,
  fileName,
  setFileName,
  fileDescription,
  setFileDescription,
  handleFileSelect,
  uploadError,
  isUploading,
  onCancel,
  onUpload,
  fileInputBgClass = "file:bg-gray-200",
  placeholderClass = "placeholder:text-gray-400",
}: FileUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="border-white/20 text-white dark:bg-linear-to-r from-primary to-accent">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Upload File
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload" className="text-white">
              Select File
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                onChange={handleFileSelect}
                className={`bg-white/10 border-white/20 text-white ${fileInputBgClass} file:border-0 file:text-light`}
              />
            </div>
            {selectedFile && (
              <div className="text-sm text-gray-300">
                Selected: {selectedFile.name} (
                {formatFileSize(selectedFile.size)})
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="file-name" className="text-white">
              File Name (Optional)
            </Label>
            <Input
              id="file-name"
              placeholder="Enter custom file name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className={`bg-white/10 border-white/20 text-white ${placeholderClass}`}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="file-description" className="text-white">
              Description (Optional)
            </Label>
            <Textarea
              id="file-description"
              placeholder="Enter file description"
              value={fileDescription}
              onChange={(e) => setFileDescription(e.target.value)}
              className={`bg-white/10 border-white/20 text-white ${placeholderClass} min-h-20`}
            />
          </div>
          {uploadError && (
            <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded border border-red-500/20">
              {uploadError}
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isUploading}
            className="bg-white/10 border-white/20 text-light hover:bg-white/20"
          >
            Cancel
          </Button>
          <Button
            onClick={onUpload}
            disabled={isUploading || !selectedFile}
            className="text-light border border-white/20 bg-linear-to-r from-primary to-accent hover:from-(--primary)/90 hover:to-(--accent)/90"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}