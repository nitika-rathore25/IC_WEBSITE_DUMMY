"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Calendar,
  Activity,
  Users,
  Loader2,
  AlertCircle,
  Play,
  Rocket,
  File,
  ExternalLink,
  Upload,
  FolderOpen,
  Info,
  MessageSquare,
  Settings,
  Workflow,
} from "lucide-react";
import { WorkflowFileRequirement, WorkflowItem } from "@/interface/interface";
import {
  getStatusColor,
  getStatusIcon,
  getStatusText,
  formatDate,
  calculateDuration,
  getDomainColor,
  formatFileSize,
} from "@/lib/workfloww-utils";

interface WorkflowCardProps {
  workflow: WorkflowItem;
  projectId: string;
  // status helpers (from useProjectWorkflows) - kept loosely typed since the
  // originals return whatever falls out of `&&`/`||` chains rather than a
  // strict boolean.
  isWorkflowComplete: (workflow: WorkflowItem) => any;
  isWorkflowExtracted: (workflow: WorkflowItem) => any;
  needsConfigurationExtraction: (workflow: WorkflowItem) => any;
  canShowAgentDetails: (workflow: WorkflowItem) => any;
  isWorkflowDeployed: (workflow: WorkflowItem) => boolean;
  canShowFilesLink: (workflow: WorkflowItem) => boolean;

  // files
  workflowFileRequirements: Map<string, WorkflowFileRequirement>;
  checkingFileRequirements: Set<string>;
  fileRequirementErrors: Map<string, string>;
  handleFilesClick: (workflowId: string, e: React.MouseEvent) => void;
  handleFileRequirementClick: (workflowId: string, e: React.MouseEvent) => void;
  handleInfoClick: (id: string) => void;

  // extraction
  extractingWorkflows: Set<string>;
  extractionErrors: Map<string, string>;
  extractConfiguration: (workflowId: string) => void;
  // deployment
  deployingWorkflows: Set<string>;
  deploymentErrors: Map<string, string>;
  deployWorkflow: (workflowId: string) => void;
  canDeployWorkflow: (workflowId: string) => boolean;
  getDeploymentBlockReason: (workflowId: string) => string;
  // navigation
  handleWorkflowClick: (workflow: WorkflowItem) => void;
}

export default function WorkflowCard({
  workflow,
  projectId,
  isWorkflowComplete,
  isWorkflowExtracted,
  needsConfigurationExtraction,
  canShowAgentDetails,
  isWorkflowDeployed,
  canShowFilesLink,
  workflowFileRequirements,
  checkingFileRequirements,
  fileRequirementErrors,
  handleFilesClick,
  handleFileRequirementClick,
  handleInfoClick,
  extractingWorkflows,
  extractionErrors,
  extractConfiguration,
  deployingWorkflows,
  deploymentErrors,
  deployWorkflow,
  canDeployWorkflow,
  getDeploymentBlockReason,
  handleWorkflowClick,
}: WorkflowCardProps) {
  const router = useRouter();

  const isComplete = isWorkflowComplete(workflow) ? true : false;
  const isExtracted = isWorkflowExtracted(workflow) ? true : false;
  const isDeployed = isWorkflowDeployed(workflow);
  const needsExtraction = needsConfigurationExtraction(workflow) ? true : false;
  const canShowDetails = canShowAgentDetails(workflow);
  const showFilesLink = canShowFilesLink(workflow);
  const fileRequirement = workflowFileRequirements.get(workflow.id);
  const isCheckingFiles = checkingFileRequirements.has(workflow.id);
  const fileRequirementError = fileRequirementErrors.get(workflow.id);

  const StatusIcon = getStatusIcon(
    workflow.workflow_status,
    isComplete,
    needsExtraction,
    isExtracted,
    isDeployed,
  );
  const isExtracting = extractingWorkflows.has(workflow.id);
  const extractionError = extractionErrors.get(workflow.id);
  const isDeploying = deployingWorkflows.has(workflow.id);
  const deploymentError = deploymentErrors.get(workflow.id);

  const primaryAgents = canShowDetails
    ? (workflow.extracted_config?.agents || []).filter(
        (agent) => agent.role === "Primary",
      )
    : [];
  const secondaryAgents = canShowDetails
    ? (workflow.extracted_config?.agents || []).filter(
        (agent) => agent.role === "Secondary",
      )
    : [];

  const deploymentBlockReason = getDeploymentBlockReason(workflow.id);

  return (
    <Card
      onClick={() => !needsExtraction && handleWorkflowClick(workflow)}
      className={`bg-white/5 border-white/20 transition-all duration-200 group ${
        needsExtraction ? "" : "hover:bg-white/10 cursor-pointer"
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                needsExtraction
                  ? "bg-linear-to-r from-yellow-500 to-amber-500"
                  : isExtracted
                    ? "bg-linear-to-r from-blue-500 to-cyan-500"
                    : isDeployed
                      ? "bg-linear-to-r from-green-500 to-emerald-500"
                      : isComplete
                        ? "bg-linear-to-r from-purple-500 to-pink-500"
                        : "bg-linear-to-r from-orange-500 to-yellow-500"
              }`}
            >
              {needsExtraction ? (
                <Settings className="h-5 w-5 text-white" />
              ) : isExtracted ? (
                <CheckCircle className="h-5 w-5 text-white" />
              ) : isDeployed ? (
                <Play className="h-5 w-5 text-white" />
              ) : isComplete ? (
                <Workflow className="h-5 w-5 text-white" />
              ) : (
                <MessageSquare className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <h4
                className={`text-white font-semibold text-lg transition-colors ${
                  !needsExtraction ? "hover:text-gray-200" : ""
                }`}
              >
                {workflow.workflow_name || "Untitled Workflow"}
              </h4>
              <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                {needsExtraction
                  ? "Conversation completed. Ready to extract workflow configuration."
                  : canShowDetails
                    ? workflow.extracted_config?.goal ||
                      "No description available"
                    : "Workflow configuration in progress..."}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                {needsExtraction ? (
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs">
                    <Settings className="h-3 w-3 mr-1" />
                    Extract Configuration
                  </Badge>
                ) : isExtracted ? (
                  <>
                    <Badge className="bg-blue-500/20 text-gray-300 border-blue-500/30 text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Ready to Deploy
                    </Badge>
                    <Badge
                      className={getDomainColor(
                        workflow.extracted_config?.domain || "",
                      )}
                    >
                      {workflow.extracted_config?.domain || "Unknown"}
                    </Badge>
                    {fileRequirement?.requires_files && (
                      <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs">
                        <Upload className="h-3 w-3 mr-1" />
                        Files Required
                      </Badge>
                    )}
                  </>
                ) : isDeployed ? (
                  <>
                    <Badge className="bg-green-700/20 text-green-400 border-green-500/30 text-xs">
                      <Play className="h-3 w-3 mr-1" />
                      Ready to Execute
                    </Badge>
                    <Badge
                      className={getDomainColor(
                        workflow.extracted_config?.domain || "",
                      )}
                    >
                      {workflow.extracted_config?.domain || "Unknown"}
                    </Badge>
                    {fileRequirement?.requires_files && (
                      <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30 text-xs">
                        <FolderOpen className="h-3 w-3 mr-1" />
                        Files Available
                      </Badge>
                    )}
                  </>
                ) : canShowDetails ? (
                  <>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                      {workflow.extracted_config?.prompt_archetype ||
                        workflow.extracted_config?.agents?.[0]
                          ?.prompt_archetype ||
                        "General"}
                    </Badge>
                    <Badge
                      className={getDomainColor(
                        workflow.extracted_config?.domain || "",
                      )}
                    >
                      {workflow.extracted_config?.domain || "Unknown"}
                    </Badge>
                  </>
                ) : (
                  <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Chat to Configure
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge
              className={getStatusColor(
                workflow.workflow_status,
                isComplete,
                needsExtraction,
                isExtracted,
                isDeployed,
              )}
            >
              <StatusIcon className="h-3 w-3 mr-1" />
              {getStatusText(
                workflow.workflow_status,
                isComplete,
                needsExtraction,
                isExtracted,
                isDeployed,
              )}
            </Badge>

            {/* Files Link - Show for extracted/deployed workflows that require files */}
            {showFilesLink && (
              <div className="flex items-center space-x-1">
                <Button
                  onClick={(e) => handleFilesClick(workflow.id, e)}
                  variant="ghost"
                  size="sm"
                  className="text-blue-200 hover:text-blue-300 hover:bg-blue-500/10 p-1 h-auto"
                >
                  <File className="h-3 w-3 mr-1" />
                  <span className="text-xs">Manage Files</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
                <Info
                  className="h-4 w-4 text-white ml-1 cursor-pointer hover:text-gray-200 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInfoClick("manage_files");
                  }}
                />
              </div>
            )}

            {/* File Requirement Status */}
            {(isExtracted || isDeployed) && isCheckingFiles && (
              <div className="flex items-center space-x-1 text-xs text-gray-400">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Checking files...</span>
              </div>
            )}

            {fileRequirementError && (
              <div className="text-xs text-red-400">{fileRequirementError}</div>
            )}
          </div>
        </div>

        {/* File Requirements Info */}
        {fileRequirement && fileRequirement.requires_files && (
          <div
            className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg cursor-pointer hover:bg-blue-500/15 transition-colors"
            onClick={(e) => handleFileRequirementClick(workflow.id, e)}
          >
            <div className="flex items-center space-x-2 mb-2">
              <File className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 font-medium text-sm">
                File Requirements
              </span>
              <span className="text-blue-400 text-xs">
                (Click to manage files)
              </span>
            </div>
            <p className="text-gray-300 text-xs mb-2">
              {fileRequirement.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="text-xs text-gray-300">
                <span className="font-medium">Types:</span>{" "}
                {fileRequirement.expected_file_types.join(", ")}
              </div>
              <div className="text-xs text-gray-300">
                <span className="font-medium">Max Size:</span>{" "}
                {formatFileSize(fileRequirement.max_file_size)}
              </div>
              <div className="text-xs text-gray-300">
                <span className="font-medium">Max Files:</span>{" "}
                {fileRequirement.max_files_count}
              </div>
              <div className="text-xs text-gray-300">
                <span className="font-medium">Uploaded:</span>{" "}
                {fileRequirement.total_files || 0}
              </div>
            </div>
          </div>
        )}

        {/* Show Extract Configuration button for workflows that need extraction */}
        {needsExtraction && (
          <div className="mb-4">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                extractConfiguration(workflow.id);
              }}
              disabled={isExtracting}
              className="w-full bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-light"
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
              <div className="mt-2 text-red-400 text-sm bg-red-500/10 p-2 rounded border border-red-500/20">
                {extractionError}
              </div>
            )}
          </div>
        )}

        {/* Show Deploy button for extracted workflows */}
        {isExtracted && (
          <div className="mb-4">
            {deploymentBlockReason && (
              <div
                className="mb-2 p-2 bg-orange-500/10 border border-orange-500/20 rounded text-orange-300 text-xs cursor-pointer hover:bg-orange-500/15 transition-colors"
                onClick={(e) => handleFileRequirementClick(workflow.id, e)}
              >
                <div className="flex items-center space-x-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{deploymentBlockReason}</span>
                  <span className="text-orange-400 ml-2">
                    (Click to upload files)
                  </span>
                </div>
              </div>
            )}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                if (
                  fileRequirement?.requires_files &&
                  (fileRequirement?.total_files || 0) === 0
                ) {
                  handleFileRequirementClick(workflow.id, e);
                } else {
                  deployWorkflow(workflow.id);
                }
              }}
              disabled={isDeploying}
              className={`w-full ${
                !canDeployWorkflow(workflow.id)
                  ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  : "bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              } text-light`}
            >
              {isDeploying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deploying Workflow...
                </>
              ) : !canDeployWorkflow(workflow.id) ? (
                fileRequirement?.requires_files &&
                (fileRequirement?.total_files || 0) === 0 ? (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files Required
                  </>
                ) : (
                  <>
                    <Loader2 className="h-4 w-4 mr-2" />
                    Processing Files...
                  </>
                )
              ) : (
                <>
                  <Rocket className="h-4 w-4 mr-2" />
                  Deploy Workflow
                </>
              )}
            </Button>
            {deploymentError && (
              <div className="mt-2 text-red-400 text-sm bg-red-500/10 p-2 rounded border border-red-500/20">
                {deploymentError}
              </div>
            )}
          </div>
        )}

        {/* Show Execute button for deployed workflows */}
        {isDeployed && (
          <div className="mb-4">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                router.push(
                  `/project/${projectId}/workflow/${workflow.id}/execute`,
                );
              }}
              className="w-full bg-linear-to-r from-primary to-accent text-light"
            >
              <Play className="h-4 w-4 mr-2" />
              Execute Workflow
            </Button>
          </div>
        )}

        {/* Show Extract Configuration button for completed workflows without extracted_config */}
        {workflow.workflow_status.toLowerCase() === "completed" &&
          !workflow.extracted_config && (
            <div className="mb-4">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  extractConfiguration(workflow.id);
                }}
                disabled={isExtracting}
                className="w-full bg-linear-to-r from-primary to-accent hover:from-(--primary)/90 hover:to-(--accent)/90 text-light"
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
                <div className="mt-2 text-red-400 text-sm bg-red-500/10 p-2 rounded border border-red-500/20">
                  {extractionError}
                </div>
              )}
            </div>
          )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-white font-semibold">
              {canShowDetails
                ? workflow.extracted_config?.agents?.length || 0
                : "—"}
            </div>
            <div className="text-gray-300 text-xs">Total Agents</div>
          </div>
          <div className="text-center">
            <div className="text-white font-semibold">
              {canShowDetails ? primaryAgents.length : "—"}
            </div>
            <div className="text-gray-300 text-xs">Primary</div>
          </div>
          <div className="text-center">
            <div className="text-white font-semibold">
              {canShowDetails ? secondaryAgents.length : "—"}
            </div>
            <div className="text-gray-300 text-xs">Secondary</div>
          </div>
          <div className="text-center">
            <div className="text-white font-semibold">
              {calculateDuration(workflow.created_at, workflow.completed_at)}
            </div>
            <div className="text-gray-300 text-xs">Duration</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Created {formatDate(workflow.created_at)}</span>
            </div>
            {workflow.completed_at && (
              <div className="flex items-center space-x-1">
                <Activity className="h-4 w-4" />
                <span>Completed {formatDate(workflow.completed_at)}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1">
            {needsExtraction ? (
              <>
                <Settings className="h-4 w-4" />
                <span>Extract</span>
              </>
            ) : isExtracted ? (
              <>
                <Rocket className="h-4 w-4" />
                <span>Deploy</span>
              </>
            ) : isDeployed ? (
              <>
                <Play className="h-4 w-4" />
                <span>Execute</span>
              </>
            ) : canShowDetails ? (
              <>
                <Users className="h-4 w-4" />
                <span>
                  {workflow.extracted_config?.agents?.length || 0} agents
                </span>
              </>
            ) : (
              <>
                <Settings className="h-4 w-4" />
                <span>Configure</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
