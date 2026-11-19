"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Database,
  Eye,
  GitBranch,
  LayoutDashboard,
  Play,
  Plus,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { WorkflowInfo, getDomainColor } from "./type";

interface WorkflowInfoBarProps {
  workflowInfo: WorkflowInfo;
  currentChatId: string | null;
  liveMode: boolean;
  projectId: string;
  workflowId: string;
  dashboards: any[];
  fetchDashboards: () => Promise<void>;
  handleFetchVersions: () => Promise<void>;
  viewLatestWorkflow: (rows?: number) => Promise<void>;
  setIsVersionDialogOpen: (open: boolean) => void;
  setIsRefreshDialogOpen: (open: boolean) => void;
  setIsViewDialogOpen: (open: boolean) => void;
  setIsCreateDashboardOpen: (open: boolean) => void;
}

export default function WorkflowInfoBar({
  workflowInfo,
  currentChatId,
  liveMode,
  projectId,
  workflowId,
  dashboards,
  fetchDashboards,
  handleFetchVersions,
  viewLatestWorkflow,
  setIsVersionDialogOpen,
  setIsRefreshDialogOpen,
  setIsViewDialogOpen,
  setIsCreateDashboardOpen,
}: WorkflowInfoBarProps) {
  const router = useRouter();

  return (
    <div className="bg-white/5 backdrop-blur-lg border-b border-white/10">
      <div className="px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Play className="w-3 h-3 text-white" />
              </div>
              <span className="text-white font-medium">
                {workflowInfo.workflow_name}
              </span>
            </div>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              <Play className="h-3 w-3 mr-1" />
              {workflowInfo.workflow_status}
            </Badge>
            {workflowInfo.extracted_config?.domain && (
              <Badge
                className={getDomainColor(
                  workflowInfo.extracted_config.domain,
                )}
              >
                {workflowInfo.extracted_config.domain}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {currentChatId && !liveMode && (
              <div className="text-xs text-gray-400">
                Chat ID:{" "}
                <code className="bg-white/10 px-1 rounded">
                  {currentChatId}
                </code>
              </div>
            )}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/10 gap-2 border-white/10 text-white hover:bg-white/30"
                    >
                      <Database /> Data
                    </Button>
                  }
                ></DropdownMenuTrigger>

                <DropdownMenuContent
                  align="start"
                  className="bg-white/10 max-w-7xl backdrop-blur-lg border-white/10"
                >
                  <DropdownMenuItem
                    className="cursor-pointer dark:hover:bg-white/40 hover:bg-gray-300"
                    onClick={() => {
                      setIsVersionDialogOpen(true);
                      handleFetchVersions();
                    }}
                  >
                    <GitBranch /> Versions
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="border-whitw/10" />
                  <DropdownMenuItem
                    className="cursor-pointer dark:hover:bg-white/40 hover:bg-gray-300"
                    onClick={() => setIsRefreshDialogOpen(true)}
                  >
                    <RefreshCw /> Update
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="border-whitw/10" />
                  <DropdownMenuItem
                    className="cursor-pointer dark:hover:bg-white/40 hover:bg-gray-300"
                    onClick={() => {
                      setIsViewDialogOpen(true);
                      viewLatestWorkflow();
                    }} // ← new handler for 'View'
                  >
                    <Eye /> View
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <DropdownMenu
              onOpenChange={(open) => {
                if (open) {
                  fetchDashboards();
                }
              }}
            >
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 gap-2 border-white/10 text-white hover:bg-white/30"
                  >
                    <LayoutDashboard /> Dashboard
                  </Button>
                }
              >
                {" "}
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                className="bg-white/10 max-w-2xl w-fit backdrop-blur-lg border-white/10 p-2 space-y-2"
              >
                <div className="flex flex-col space-y-1">
                  {dashboards.length > 0 ? (
                    dashboards.map((item) => (
                      <DropdownMenuItem
                        key={item.id}
                        className="cursor-pointer dark:hover:bg-white/40 hover:bg-gray-300"
                        onClick={() =>
                          router.push(
                            `/project/${projectId}/workflow/${workflowId}/execute/chart-dashboard/${item.id}`,
                          )
                        }
                      >
                        {item.name}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem disabled>
                      No dashboards found
                    </DropdownMenuItem>
                  )}
                </div>

                {/* Divider line if you want separation */}
                <div className="border-t border-white/20 my-1" />

                {/* Create Dashboard Button */}
                <DropdownMenuItem>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full cursor-pointer bg-white/10 gap-2 border-white/10 text-white hover:bg-white/20"
                    onClick={() => {
                      setIsCreateDashboardOpen(true);
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    Create Dashboard
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}