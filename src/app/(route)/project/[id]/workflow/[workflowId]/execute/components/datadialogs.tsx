"use client";

import { RefObject } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArchiveRestore,
  Download,
  GitBranch,
  Loader2,
  Upload,
} from "lucide-react";
import { FilePreviewResponse, formatFileSize } from "../components/type";

interface DataDialogsProps {
  // Versions dialog
  isVersionDialogOpen: boolean;
  setIsVersionDialogOpen: (open: boolean) => void;
  apiResponse: any[];
  activeVersionId: string | null;
  workflowId: string;
  restoreVersion: (
    workflowId: string,
    originalFileId: string,
    versionId: string,
    handleFetchVersions: () => Promise<void>,
  ) => Promise<any>;
  handleFetchVersions: () => Promise<void>;

  // Refresh / upload dialog
  isRefreshDialogOpen: boolean;
  setIsRefreshDialogOpen: (open: boolean) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  selectedFile: File | null;
  fileName: string;
  setFileName: (value: string) => void;
  fileDescription: string;
  setFileDescription: (value: string) => void;
  uploadError: string;
  isUploading: boolean;
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUploadDialogClose: () => void;
  uploadFileToRefresh: () => Promise<any>;

  // View dialog
  isViewDialogOpen: boolean;
  setIsViewDialogOpen: (open: boolean) => void;
  isViewLatestWorkflow: FilePreviewResponse | null;
  isLoading: boolean;
  isDownloading: boolean;
  handleDownload: () => Promise<void>;
  rowData: Record<string, string>[];
  columns: any[];
}

export default function DataDialogs({
  isVersionDialogOpen,
  setIsVersionDialogOpen,
  apiResponse,
  activeVersionId,
  workflowId,
  restoreVersion,
  handleFetchVersions,

  isRefreshDialogOpen,
  setIsRefreshDialogOpen,
  fileInputRef,
  selectedFile,
  fileName,
  setFileName,
  fileDescription,
  setFileDescription,
  uploadError,
  isUploading,
  handleFileSelect,
  handleUploadDialogClose,
  uploadFileToRefresh,

  isViewDialogOpen,
  setIsViewDialogOpen,
  isViewLatestWorkflow,
  isLoading,
  isDownloading,
  handleDownload,
  rowData,
  columns,
}: DataDialogsProps) {
  return (
    <>
      {/* Versions Dialog */}
      <Dialog
        open={isVersionDialogOpen}
        onOpenChange={(open) => setIsVersionDialogOpen(open)}
      >
        <DialogContent className="dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) max-w-5xl border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center text-xl font-bold text-white">
              <GitBranch /> Data Versions List
            </DialogTitle>
          </DialogHeader>
          {apiResponse.length === 0 ? (
            <div className="w-full min-h-50 flex items-center justify-center">
              <p className="text-gray-400 text-center">
                No versions available
              </p>
            </div>
          ) : (
            <Accordion className="space-y-3 border-white/20 text-white px-3">
              {apiResponse.map((item, index) => {
                const isActive = item.id === activeVersionId;
                return (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className={`border rounded-lg overflow-hidden ${
                      isActive
                        ? "border-green-500 bg-green-500/20" // ✅ highlight active version
                        : "border-white/10 bg-white/10"
                    }`}
                  >
                    <AccordionTrigger className="flex items-center justify-between gap-2 px-3 py-2">
                      <span className="flex-1 text-left font-medium">
                        {item.title}
                      </span>
                      {isActive && (
                        <span className="px-3 text-sm items-center rounded-full text-green-500 border-green-500 border">
                          Active
                        </span>
                      )}
                      {!isActive && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            restoreVersion(
                              workflowId,
                              item.originalFileId,
                              item.id,
                              handleFetchVersions,
                            );
                          }}
                          className="cursor-pointer text-sm px-3 text-light flex items-center py-1 gap-2 rounded-md bg-linear-to-r from-primary to-accent text-white hover:from-(--primary)/90 hover:to-(--accent)/90 border border-white/20 text-light"
                        >
                          <ArchiveRestore className="w-4 h-4" />
                          Restore
                        </div>
                      )}
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pb-3 space-y-3">
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {item.description || "No description available"}
                      </p>

                      {item.versionHistory?.length > 0 ? (
                        <div className="border border-white/10 rounded-lg mt-2 overflow-hidden">
                          <table className="w-full text-sm text-left border-collapse">
                            <thead className="bg-white/10">
                              <tr>
                                <th className="px-3 py-2 font-medium text-white">
                                  #
                                </th>
                                <th className="px-3 py-2 font-medium text-white">
                                  Rows
                                </th>
                                <th className="px-3 py-2 font-medium text-white">
                                  Columns
                                </th>
                                <th className="px-3 py-2 font-medium text-white">
                                  Refreshed At
                                </th>
                                <th>{/* Status */}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.versionHistory.map(
                                (vh: any, i: number) => {
                                  const isLast =
                                    i === item.versionHistory.length - 1;
                                  return (
                                    <tr
                                      key={i}
                                      className="border-t border-white/10 hover:bg-white/5 transition-colors"
                                    >
                                      <td className="px-3 py-2 text-gray-300">
                                        {i + 1}
                                      </td>
                                      <td className="px-3 py-2 text-gray-300">
                                        {vh.row_count}
                                      </td>
                                      <td className="px-3 py-2 text-gray-300">
                                        {vh.columns_count}
                                      </td>
                                      <td className="px-3 py-2 text-gray-300">
                                        {new Date(
                                          vh.refresh_timestamp,
                                        ).toLocaleString()}
                                      </td>
                                      {/* Latest indicator */}
                                      {isLast && (
                                        <td className="px-3 py-2 text-green-400 italic font-semibold">
                                          Latest
                                        </td>
                                      )}
                                      {!isLast && (
                                        <td className="px-3 py-2"></td>
                                      )}
                                    </tr>
                                  );
                                },
                              )}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-xs text-gray-300 italic mt-2">
                          No version history available
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </DialogContent>
      </Dialog>

      {/* Refresh Dialog  */}
      <Dialog
        open={isRefreshDialogOpen}
        onOpenChange={(open) => setIsRefreshDialogOpen(open)}
      >
        <DialogContent className="border-white/20 max-w-fit text-white dark:bg-linear-to-r from-primary to-accent">
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
                  className="bg-white/10 border-white/20 text-white file:bg-gray-200 file:border-0 file:text-light"
                />
              </div>
              {selectedFile && (
                <div className="text-sm text-gray-400">
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
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
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
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 min-h-20"
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
              onClick={handleUploadDialogClose}
              disabled={isUploading}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                uploadFileToRefresh();
              }}
              disabled={isUploading || !selectedFile}
              className="text-light bg-linear-to-r from-primary to-accent border border-white/20"
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

      {/* === View Dialog === */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {isViewLatestWorkflow?.name || "Data View"}
            </DialogTitle>
          </DialogHeader>

          {/* Scrollable Table */}
          <div className="h-[60vh] overflow-auto border border-white/10 rounded-lg mt-3">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
                <span className="text-lg">Loading...</span>
              </div>
            )}
            {isViewLatestWorkflow?.preview?.rows ? (
              <table className="min-w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-linear-to-r from-primary to-accent text-light sticky top-0 z-10">
                  <tr>
                    {columns.map((col: any) => (
                      <th key={col} className="px-3 py-2 border-b">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rowData.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-white/5 transition-colors"
                    >
                      {columns.map((col: any) => (
                        <td
                          key={col}
                          className="px-4 py-2 border-b border-white/10 max-w-xs truncate whitespace-nowrap"
                        >
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              !isLoading && (
                <div className="flex items-center justify-center h-32">
                  <p className="text-white/50">No data available</p>
                </div>
              )
            )}
          </div>
          {/* Footer with Download Button */}
          <DialogFooter className="mt-4">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-linear-to-r from-primary to-accent text-white hover:from-(--primary)/90 hover:to-(--accent)/90 border border-white/20 text-light flex items-center"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Downloading
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download CSV
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}