"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Workflow,
  Search,
  Building,
  Loader2,
  AlertCircle,
  RefreshCw,
  Target,
  Plus,
  Info,
} from "lucide-react";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

import { useProjectWorkflows } from "@/hooks/useProjectWorkflows";
import CreateWorkflowDialog from "@/components/workflows/workflow-dialog";
import WorkflowCard from "@/components/workflows/workflowCard";

export default function ProjectWorkflows() {
  const {
    router,
    projectId,

    projectInfo,
    loading,
    error,
    filteredWorkflows,

    searchTerm,
    setSearchTerm,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isCreateFirstDialogOpen,
    setIsCreateFirstDialogOpen,
    workflowName,
    setWorkflowName,
    workflowDescription,
    setWorkflowDescription,
    isCreating,
    createError,
    setCreateError,

    extractingWorkflows,
    extractionErrors,
    extractConfiguration,

    deployingWorkflows,
    deploymentErrors,
    deployWorkflow,
    canDeployWorkflow,
    getDeploymentBlockReason,

    workflowFileRequirements,
    checkingFileRequirements,
    fileRequirementErrors,
    handleFilesClick,
    handleFileRequirementClick,

    isInfoDialogOpen,
    setisInfoDialogOpen,
    selectedEntry,
    handleInfoClick,

    fetchProjectWorkflows,
    createNewWorkflow,
    handleWorkflowClick,
    handleCreateDialogClose,

    isWorkflowComplete,
    isWorkflowExtracted,
    needsConfigurationExtraction,
    canShowAgentDetails,
    isWorkflowDeployed,
    canShowFilesLink,
  } = useProjectWorkflows();

  if (loading) {
    return (
      <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex items-center justify-center">
        <div className="flex items-center space-x-3 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg">Loading workflows...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-linear-to-r from-primary to-accent text-light hover:from-(--primary)/90 flex flex-col overflow-hidden">
        <Header
          showBackButton
          backLabel="Dashboard"
          breadcrumb={[
            { label: "Project", onClick: () => router.push("/dashboard") },
            { label: projectInfo?.name || "Project Workflows" },
          ]}
        />
        <main className="flex-1 flex items-center justify-center">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 max-w-md">
            <CardContent className="p-6 text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto" />
              <h3 className="text-white text-lg font-semibold">
                Error Loading Workflows
              </h3>
              <p className="text-gray-300">{error}</p>
              <Button
                onClick={fetchProjectWorkflows}
                className="bg-linear-to-r from-primary to-accent text-light"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex flex-col overflow-hidden">
      {/* Header with Breadcrumb */}
      <Header
        showBackButton
        backLabel="Dashboard"
        breadcrumb={[
          { label: "Project", onClick: () => router.push("/dashboard") },
          { label: projectInfo?.name || "Project Workflows" },
        ]}
      />

      {/* Main Content */}
      <main className="flex-1 px-6 py-4 overflow-auto">
        <div className="space-y-6">
          {/* Project Overview */}
          {projectInfo && (
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-white flex items-center space-x-3">
                    <Building className="h-8 w-8 text-gray-300" />
                    <span>{projectInfo.name}</span>
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Target className="h-4 w-4 text-gray-300" />
                  <p className="text-gray-300 leading-relaxed">
                    {projectInfo.description}
                  </p>
                </div>
              </CardHeader>
            </Card>
          )}

          {/* Workflows Section */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                  <Workflow className="h-6 w-6 text-gray-300" />
                  <span>Workflows</span>
                  <Info
                    className="h-5 text-white cursor-pointer hover:text-gray-200 transition"
                    onClick={() => handleInfoClick("workflows")}
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
                    {filteredWorkflows.length}{" "}
                    {filteredWorkflows.length === 1 ? "workflow" : "workflows"}
                  </Badge>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search workflows..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 w-64"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/10 border-white/20 text-light hover:bg-white/20"
                    onClick={fetchProjectWorkflows}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>

                  <CreateWorkflowDialog
                    open={isCreateDialogOpen}
                    onOpenChange={setIsCreateDialogOpen}
                    trigger={
                      <Button
                        className="from-primary to-accent text-light"
                        onClick={() => {
                          setWorkflowName("");
                          setWorkflowDescription("");
                          setCreateError("");
                          setIsCreateDialogOpen(true);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create Workflow
                      </Button>
                    }
                    workflowName={workflowName}
                    setWorkflowName={setWorkflowName}
                    workflowDescription={workflowDescription}
                    setWorkflowDescription={setWorkflowDescription}
                    createError={createError}
                    isCreating={isCreating}
                    onCreate={createNewWorkflow}
                    onCancel={handleCreateDialogClose}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredWorkflows.length === 0 ? (
                  <div className="text-center py-12">
                    <Workflow className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-white text-lg font-semibold mb-2">
                      No Workflows Found
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {searchTerm
                        ? "No workflows match your search criteria."
                        : "No workflows available for this project."}
                    </p>

                    <CreateWorkflowDialog
                      open={isCreateFirstDialogOpen}
                      onOpenChange={setIsCreateFirstDialogOpen}
                      trigger={
                        <Button
                          className="bg-linear-to-r from-primary to-accent text-light"
                          onClick={() => {
                            setWorkflowName("");
                            setWorkflowDescription("");
                            setCreateError("");
                            setIsCreateFirstDialogOpen(true);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Create Your First Workflow
                        </Button>
                      }
                      workflowName={workflowName}
                      setWorkflowName={setWorkflowName}
                      workflowDescription={workflowDescription}
                      setWorkflowDescription={setWorkflowDescription}
                      createError={createError}
                      isCreating={isCreating}
                      onCreate={createNewWorkflow}
                      onCancel={handleCreateDialogClose}
                      showDuplicateError
                    />
                  </div>
                ) : (
                  filteredWorkflows.map((workflow) => (
                    <WorkflowCard
                      key={workflow.id}
                      workflow={workflow}
                      projectId={projectId}
                      isWorkflowComplete={isWorkflowComplete}
                      isWorkflowExtracted={isWorkflowExtracted}
                      needsConfigurationExtraction={
                        needsConfigurationExtraction
                      }
                      canShowAgentDetails={canShowAgentDetails}
                      isWorkflowDeployed={isWorkflowDeployed}
                      canShowFilesLink={canShowFilesLink}
                      workflowFileRequirements={workflowFileRequirements}
                      checkingFileRequirements={checkingFileRequirements}
                      fileRequirementErrors={fileRequirementErrors}
                      handleFilesClick={handleFilesClick}
                      handleFileRequirementClick={handleFileRequirementClick}
                      handleInfoClick={handleInfoClick}
                      extractingWorkflows={extractingWorkflows}
                      extractionErrors={extractionErrors}
                      extractConfiguration={extractConfiguration}
                      deployingWorkflows={deployingWorkflows}
                      deploymentErrors={deploymentErrors}
                      deployWorkflow={deployWorkflow}
                      canDeployWorkflow={canDeployWorkflow}
                      getDeploymentBlockReason={getDeploymentBlockReason}
                      handleWorkflowClick={handleWorkflowClick}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}