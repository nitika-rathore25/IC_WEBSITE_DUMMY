"use client";

import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Upload,
  File,
  Loader2,
  AlertCircle,
  CheckCircle,
  Plus,
  Clock,
  Zap,
  Info,
  Play,
  Rocket,
  RefreshCw,
} from "lucide-react";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { useWorkflowFiles } from "./components/useWorkflowFiles";
import FileUploadDialog from "./components/fileUploadDialog";
import WorkflowFileCard from "./components/workflowFileCard";

export default function WorkflowFiles() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  const workflowId = params.workflowId as string;

  const {
    fileInputRef,
    workflowInfo,
    filesData,
    loading,
    error,
    projectInfo,
    isUploadDialogOpen,
    setIsUploadDialogOpen,
    isUploadFirstDialogOpen,
    setIsUploadFirstDialogOpen,
    selectedFile,
    fileName,
    setFileName,
    fileDescription,
    setFileDescription,
    isUploading,
    uploadError,
    isPollingEmbeddings,
    lastPollingTime,
    liveMode,
    isInfoDialogOpen,
    setisInfoDialogOpen,
    selectedEntry,
    handleInfoClick,
    deployWorkflow,
    fetchWorkflowFiles,
    handleFileSelect,
    uploadFile,
    deleteFile,
    handleUploadDialogClose,
    hasFiles,
    readyForDeployment,
    pendingEmbeddingsCount,
  } = useWorkflowFiles(projectId, workflowId);

  if (loading) {
    return (
      <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex items-center justify-center">
        <div className="flex items-center space-x-3 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg">Loading workflow files...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">{error}</div>
          <Button
            onClick={() => router.push(`/project/${projectId}`)}
            className="bg-linear-to-r from-primary to-accent hover:from-(--primary)/90 hover:to-(--accent)/90"
          >
            Back to Workflows
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex flex-col overflow-hidden">
      {/* Header */}
      <Header
        showBackButton
        backLabel="Back to Workflows"
        onBack={() => router.push(`/project/${projectId}`)}
        breadcrumb={[
          { label: "Project", onClick: () => router.push("/dashboard") },
          {
            label: projectInfo?.name || "Project",
            onClick: () => router.push(`/project/${projectId}`),
          },
          {
            label: workflowInfo?.workflow_name || "Workflow",
            onClick: () =>
              router.push(`/project/${projectId}/workflow/${workflowId}`),
          },
          { label: "Files" },
        ]}
      />

      {/* File Requirements Status */}
      {filesData && (
        <div className="bg-white/5 backdrop-blur-lg border-b border-white/10">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      readyForDeployment
                        ? "bg-linear-to-r from-green-500 to-emerald-500"
                        : filesData.workflow_accepts_files &&
                            filesData.total_files === 0
                          ? "bg-linear-to-r from-yellow-500 to-amber-500"
                          : "bg-linear-to-r from-orange-500 to-red-500"
                    }`}
                  >
                    {readyForDeployment ? (
                      <CheckCircle className="w-3 h-3 text-white" />
                    ) : filesData.workflow_accepts_files &&
                      filesData.total_files === 0 ? (
                      <Upload className="w-3 h-3 text-white" />
                    ) : (
                      <Clock className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-white font-medium">
                    {readyForDeployment
                      ? "Ready for Deployment"
                      : filesData.workflow_accepts_files &&
                          filesData.total_files === 0
                        ? "Files Required"
                        : "Processing Embeddings"}
                  </span>
                  {isPollingEmbeddings && (
                    <div className="flex items-center space-x-1">
                      <Loader2 className="w-3 h-3 text-blue-400 animate-spin" />
                      <span className="text-blue-400 text-xs">
                        Auto-updating
                      </span>
                    </div>
                  )}
                </div>

                <Badge
                  className={
                    readyForDeployment
                      ? "bg-green-500/20 text-green-300 border-green-500/30"
                      : filesData.workflow_accepts_files &&
                          filesData.total_files === 0
                        ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                        : "bg-orange-500/20 text-orange-300 border-orange-500/30"
                  }
                >
                  {filesData.total_files} / {filesData.expected_formats.length}{" "}
                  files
                </Badge>

                {filesData.expected_formats.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-300 text-sm">Expected:</span>
                    <div className="flex space-x-1">
                      {filesData.expected_formats.map((format, index) => (
                        <Badge
                          key={index}
                          className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs"
                        >
                          {format.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {filesData.missing_formats.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-300 text-sm">Missing:</span>
                    <div className="flex space-x-1">
                      {filesData.missing_formats.map((format, index) => (
                        <Badge
                          key={index}
                          className="bg-red-500/20 text-red-300 border-red-500/30 text-xs"
                        >
                          {format.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {pendingEmbeddingsCount > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-300 text-sm">Pending:</span>
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs">
                      <Zap className="h-3 w-3 mr-1" />
                      {pendingEmbeddingsCount} embeddings
                    </Badge>
                  </div>
                )}
              </div>

              {!liveMode && (
                <div className="flex items-center space-x-2 text-xs text-gray-300">
                  {lastPollingTime && (
                    <span>
                      Last checked: {lastPollingTime.toLocaleTimeString()}
                    </span>
                  )}
                  <code className="bg-white/10 px-1 rounded">
                    {filesData.workflow_id}
                  </code>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 px-6 py-4 overflow-auto">
        <div className="space-y-6">
          {/* Deployment Status Card */}
          {filesData?.workflow_accepts_files && (
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        workflowInfo?.workflow_status?.toLowerCase() ===
                          "deployed" && readyForDeployment
                          ? "bg-linear-to-r from-green-500 to-emerald-500 pl-2"
                          : readyForDeployment
                            ? "bg-linear-to-r from-green-500 to-emerald-500"
                            : "bg-linear-to-r from-orange-500 to-red-500"
                      }`}
                    >
                      {workflowInfo?.workflow_status?.toLowerCase() ===
                        "deployed" && readyForDeployment ? (
                        <Play className="h-4 w-4 mr-2 text-white" />
                      ) : readyForDeployment ? (
                        <CheckCircle className="h-4 w-4 text-white" />
                      ) : (
                        <Clock className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">
                        {workflowInfo?.workflow_status?.toLowerCase() ===
                          "deployed" && readyForDeployment
                          ? "Ready for Execution"
                          : readyForDeployment
                            ? "Ready for Deployment"
                            : "Deployment Blocked"}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {readyForDeployment
                          ? "All files are uploaded and embeddings are ready"
                          : !hasFiles
                            ? "Upload required files to proceed with deployment"
                            : `Waiting for ${pendingEmbeddingsCount} file embeddings to complete`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!readyForDeployment && (
                      <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Blocked
                      </Badge>
                    )}
                    {readyForDeployment && (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Ready
                      </Badge>
                    )}
                    {isPollingEmbeddings && (
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Monitoring
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Files Section */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                  <File className="h-6 w-6 text-gray-300" />
                  <span>Workflow Files</span>
                  <Info
                    className="h-4 w-4 text-white ml-1 cursor-pointer hover:text-gray-300 transition"
                    onClick={() => handleInfoClick("workflow_files")}
                  />
                  <Dialog
                    open={isInfoDialogOpen}
                    onOpenChange={(open) => setisInfoDialogOpen(open)}
                  >
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
                  <Badge className="bg-white/10 text-gray-300 border-white/20">
                    {filesData?.total_files || 0}{" "}
                    {filesData?.total_files === 1 ? "file" : "files"}
                  </Badge>
                  {isPollingEmbeddings && (
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      <Zap className="h-3 w-3 mr-1" />
                      Live Updates
                    </Badge>
                  )}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={fetchWorkflowFiles}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  {filesData?.workflow_accepts_files && (
                    <FileUploadDialog
                      open={isUploadDialogOpen}
                      onOpenChange={setIsUploadDialogOpen}
                      trigger={
                        <Button className="bg-linear-to-r from-primary to-accent hover:from-(--primary)/90 hover:to-(--accent)/90 text-light">
                          <Plus className="h-4 w-4 mr-2" />
                          Upload File
                        </Button>
                      }
                      fileInputRef={fileInputRef}
                      selectedFile={selectedFile}
                      fileName={fileName}
                      setFileName={setFileName}
                      fileDescription={fileDescription}
                      setFileDescription={setFileDescription}
                      handleFileSelect={handleFileSelect}
                      uploadError={uploadError}
                      isUploading={isUploading}
                      onCancel={handleUploadDialogClose}
                      onUpload={uploadFile}
                      fileInputBgClass="file:bg-gray-200"
                      placeholderClass="placeholder:text-gray-400"
                    />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pr-4">
                {!filesData?.files || filesData.files.length === 0 ? (
                  <div className="text-center py-12">
                    <File className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-white text-lg font-semibold mb-2">
                      {filesData?.workflow_accepts_files
                        ? "No Files Uploaded"
                        : "No Files Required"}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {filesData?.workflow_accepts_files
                        ? "This workflow requires files to be uploaded before deployment."
                        : "This workflow doesn't require any files."}
                    </p>
                    {filesData?.workflow_accepts_files && (
                      <FileUploadDialog
                        open={isUploadFirstDialogOpen}
                        onOpenChange={setIsUploadFirstDialogOpen}
                        trigger={
                          <Button className="text-light bg-linear-to-r from-primary to-accent hover:from-(--primary)/90 hover:to-(--accent)/90">
                            <Plus className="h-4 w-4 mr-2" />
                            Upload Your First File
                          </Button>
                        }
                        fileInputRef={fileInputRef}
                        selectedFile={selectedFile}
                        fileName={fileName}
                        setFileName={setFileName}
                        fileDescription={fileDescription}
                        setFileDescription={setFileDescription}
                        handleFileSelect={handleFileSelect}
                        uploadError={uploadError}
                        isUploading={isUploading}
                        onCancel={handleUploadDialogClose}
                        onUpload={uploadFile}
                        fileInputBgClass="file:bg-gray-2000"
                        placeholderClass="placeholder:text-gray-300"
                      />
                    )}
                  </div>
                ) : (
                  filesData.files.map((file) => (
                    <WorkflowFileCard
                      key={file.id}
                      file={file}
                      liveMode={liveMode}
                      onDelete={deleteFile}
                    />
                  ))
                )}
              </div>

              {workflowInfo?.workflow_status.toLowerCase() === "deployed" &&
                readyForDeployment && (
                  <div className="mt-4">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/project/${projectId}/workflow/${workflowInfo?.id}/execute`,
                        );
                      }}
                      className="w-full bg-linear-to-r from-primary to-accent text-light"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Execute Workflow
                    </Button>
                  </div>
                )}

              {workflowInfo?.workflow_status.toLowerCase() !== "deployed" &&
                readyForDeployment && (
                  <div className="mt-4 mr-3">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        deployWorkflow(workflowInfo?.id);
                      }}
                      className="w-full bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-light"
                    >
                      <Rocket className="h-4 w-4 mr-2" />
                      Deploy Workflow
                    </Button>
                  </div>
                )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}