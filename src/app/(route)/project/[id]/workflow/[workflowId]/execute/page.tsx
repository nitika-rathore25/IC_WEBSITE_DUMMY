"use client";

import { useParams, useRouter } from "next/navigation";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ChatPanel from "./components/chatPanel";
import WorkflowInfoBar from "./components/workflowinfobar";
import GeneralDialogs from "./components/dialogs";
import DataDialogs from "./components/datadialogs";
import { useWorkflowExecute } from "@/hooks/useworkflowexecute";
import { Loader2 } from "lucide-react";

export default function WorkflowExecute() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  const workflowId = params.workflowId as string;

  const w = useWorkflowExecute(projectId, workflowId);

  if (w.loading || !w.historyLoaded) {
    return (
      <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex items-center justify-center">
        <div className="flex items-center space-x-3 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg">Loading workflow...</span>
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
            label: w.projectInfo?.name || "Project",
            onClick: () => router.push(`/project/${projectId}`),
          },
          {
            label: w.workflowInfo?.workflow_name || "Workflow",
            onClick: () =>
              router.push(`/project/${projectId}/workflow/${workflowId}`),
          },
          { label: "Execute" },
        ]}
      />

      {/* Workflow Info Bar */}
      {w.workflowInfo && (
        <WorkflowInfoBar
          workflowInfo={w.workflowInfo}
          currentChatId={w.currentChatId}
          liveMode={w.liveMode}
          projectId={projectId}
          workflowId={workflowId}
          dashboards={w.dashboards}
          fetchDashboards={w.fetchDashboards}
          handleFetchVersions={w.handleFetchVersions}
          viewLatestWorkflow={w.viewLatestWorkflow}
          setIsVersionDialogOpen={w.setIsVersionDialogOpen}
          setIsRefreshDialogOpen={w.setIsRefreshDialogOpen}
          setIsViewDialogOpen={w.setIsViewDialogOpen}
          setIsCreateDashboardOpen={w.setIsCreateDashboardOpen}
        />
      )}

      <main className="flex-1 px-6 py-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden w-full">
          <ChatPanel
            workflowInfo={w.workflowInfo}
            chatMessages={w.chatMessages}
            isExecuting={w.isExecuting}
            historyLoaded={w.historyLoaded}
            isClearingChat={w.isClearingChat}
            showChartConverter={w.showChartConverter}
            newMessage={w.newMessage}
            setNewMessage={w.setNewMessage}
            handleSendMessage={w.handleSendMessage}
            handleKeyPress={w.handleKeyPress}
            toggleChartConverter={w.toggleChartConverter}
            clearChatHistory={w.clearChatHistory}
            handleInfoClick={w.handleInfoClick}
            scrollAreaRef={w.scrollAreaRef}
            textareaRef={w.textareaRef}
          />

          <GeneralDialogs
            isInfoDialogOpen={w.isInfoDialogOpen}
            setisInfoDialogOpen={w.setisInfoDialogOpen}
            selectedEntry={w.selectedEntry}
            isCreateDashboardOpen={w.isCreateDashboardOpen}
            setIsCreateDashboardOpen={w.setIsCreateDashboardOpen}
            dashboardName={w.dashboardName}
            setDashboardName={w.setDashboardName}
            dashboardDescription={w.dashboardDescription}
            setDashboardDescription={w.setDashboardDescription}
            isCreating={w.isCreating}
            handleCreateDashboard={w.handleCreateDashboard}
            createDashboard={w.createDashboard}
          />
        </div>
      </main>

      <Footer />

      <DataDialogs
        isVersionDialogOpen={w.isVersionDialogOpen}
        setIsVersionDialogOpen={w.setIsVersionDialogOpen}
        apiResponse={w.apiResponse}
        activeVersionId={w.activeVersionId}
        workflowId={workflowId}
        restoreVersion={w.restoreVersion}
        handleFetchVersions={w.handleFetchVersions}
        isRefreshDialogOpen={w.isRefreshDialogOpen}
        setIsRefreshDialogOpen={w.setIsRefreshDialogOpen}
        fileInputRef={w.fileInputRef}
        selectedFile={w.selectedFile}
        fileName={w.fileName}
        setFileName={w.setFileName}
        fileDescription={w.fileDescription}
        setFileDescription={w.setFileDescription}
        uploadError={w.uploadError}
        isUploading={w.isUploading}
        handleFileSelect={w.handleFileSelect}
        handleUploadDialogClose={w.handleUploadDialogClose}
        uploadFileToRefresh={w.uploadFileToRefresh}
        isViewDialogOpen={w.isViewDialogOpen}
        setIsViewDialogOpen={w.setIsViewDialogOpen}
        isViewLatestWorkflow={w.isViewLatestWorkflow}
        isLoading={w.isLoading}
        isDownloading={w.isDownloading}
        handleDownload={w.handleDownload}
        rowData={w.rowData}
        columns={w.columns}
      />
    </div>
  );
}