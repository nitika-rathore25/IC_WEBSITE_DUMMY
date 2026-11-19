"use client";
import { ThemeCustomizer } from "@/components/common/custom-theme";
import { DashboardChartConverter } from "@/components/common/dashboard-chart-converter";
import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/providers/theme-provider";

import {
  ArrowLeft,
  ChevronRight,
  Home,
  Loader2,
  Moon,
  RefreshCcw,
  Sun,
  Palette,
  Settings,
  CreditCard,
  User,
  LogOut,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

import {
  BASE_URL,
  ChartData,
  fetchDashboardIds,
  fetchDashboardsCharts,
  getChartData,
  parseJsonToFallbackData,
  WorkflowInfo,
} from "./components/api";
import { ReorderChartsDialog } from "./components/reorderChartDialog";

export { BASE_URL };

export default function ChartDashboard() {
  const router = useRouter();
  const params = useParams();
  const [projectInfo, setProjectInfo] = useState<{ name: string } | null>(null);
  const projectId = params.id as string;
  const dashboard_id = params.dashboard_id as string;
  const workflowId = params.workflowId as string;
  const [workflowInfo, setWorkflowInfo] = useState<WorkflowInfo | null>(null);
  const [chartsData, setChartsData] = useState<ChartData[]>([]);
  const [isReorderOpen, setIsReorderOpen] = useState(false);
  const [loadingCharts, setLoadingCharts] = useState(true);
  const [chartsIds, setChartsIds] = useState<string[]>([]);
  const [refreshingAll, setRefreshingAll] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [credits, setCredits] = useState(0);
  const [role, setRole] = useState<string>("");
  const [username, setUsername] = useState("");
  const [initials, setInitials] = useState("");

  // Track selected chart for each row and insights container refs
  const [selectedChartByRow, setSelectedChartByRow] = useState<{
    [rowIndex: number]: string | null;
  }>({});
  const insightsRefs = useRef<{ [rowIndex: number]: HTMLDivElement | null }>(
    {},
  );

  // Get all charts_ID
  const fetchDashboards = async () => {
    setLoadingCharts(true);
    const ids = await fetchDashboardIds(dashboard_id);
    if (ids !== null) {
      setChartsIds(ids);
    }
    setLoadingCharts(false);
  };

  // Refresh all charts - UPDATED FOR NEW FORMAT
  const refreshAllCharts = async () => {
    if (chartsIds.length === 0) return;

    try {
      setRefreshingAll(true);

      // Fetch fresh data for all charts in parallel
      const refreshPromises = chartsIds.map(async (chartId) => {
        try {
          const refreshedData = await getChartData(dashboard_id, chartId);
          const newFallbackData = parseJsonToFallbackData(refreshedData);
          return {
            chartId,
            data: {
              title:
                refreshedData.chart_Title ||
                refreshedData.code_info?.llmresponse?.title ||
                "Chart",
              description:
                refreshedData.chart_Description ||
                refreshedData.code_info?.llmresponse?.description ||
                "",
              insights:
                refreshedData.chart_Insights ||
                refreshedData.code_info?.llmresponse?.insights ||
                "",
              fallbackData: newFallbackData,
              chartType:
                refreshedData.chart_Type ||
                refreshedData.code_info?.llmresponse?.chart_type,
            },
          };
        } catch (error) {
          toast.error(`Failed to refresh chart ${chartId}`);
          return null;
        }
      });

      const results = await Promise.all(refreshPromises);

      // Update the chartsData state with the new data
      setChartsData((prevCharts) =>
        prevCharts.map((chart) => {
          const refreshedChart = results.find(
            (result) => result?.chartId === chart.id,
          );
          if (refreshedChart) {
            return {
              ...chart,
              title: refreshedChart.data.title || chart.title,
              description: refreshedChart.data.description || chart.description,
              insights: refreshedChart.data.insights || chart.insights,
              fallbackData:
                refreshedChart.data.fallbackData || chart.fallbackData,
            };
          }
          return chart;
        }),
      );

      toast.success("All charts refreshed successfully!");
      reloadDashboard();
    } catch (error) {
      toast.error("Failed to refresh some charts");
    } finally {
      setRefreshingAll(false);
    }
  };

  // Scroll to specific insight within the insight card only
  const scrollToInsight = (rowIndex: number, chartId: string) => {
    const insightsContainer = insightsRefs.current[rowIndex];
    if (insightsContainer) {
      const insightElement = insightsContainer.querySelector(
        `[data-chart-id="${chartId}"]`,
      ) as HTMLElement;
      if (insightElement) {
        // Scroll within the insights container only
        insightsContainer.scrollTo({
          top: insightElement.offsetTop - insightsContainer.offsetTop - 10,
          behavior: "smooth",
        });
      }
    }
  };

  const handleChartTitleClick = (chartId: string, rowIndex: number) => {
    setSelectedChartByRow((prev) => {
      const currentSelected = prev[rowIndex];
      if (currentSelected === chartId) {
        // If clicking the same chart title again, deselect it for this row
        const newState = { ...prev };
        delete newState[rowIndex];
        return newState;
      } else {
        // Select the clicked chart for this specific row and scroll to it
        setTimeout(() => {
          scrollToInsight(rowIndex, chartId);
        }, 100);
        return {
          ...prev,
          [rowIndex]: chartId,
        };
      }
    });
  };

  // Only fetch chart data when chartsIds initially loads, not when reordering
  useEffect(() => {
    if (chartsIds.length > 0 && !initialLoadComplete) {
      (async () => {
        const results = await Promise.all(
          chartsIds.map(async (id: string) => {
            const chartData = await fetchDashboardsCharts(dashboard_id, id);
            return chartData
              ? {
                  id,
                  title: chartData.title,
                  description: chartData.description,
                  insights: chartData.insights,
                  fallbackData: chartData.fallbackData,
                  chartType: chartData.chartType,
                }
              : null;
          }),
        );

        const validResults = results.filter(Boolean) as ChartData[];
        setChartsData(validResults);
        setInitialLoadComplete(true);
      })();
    } else if (chartsIds.length === 0) {
      setChartsData([]);
      setInitialLoadComplete(false);
    }
  }, [chartsIds, initialLoadComplete]);

  useEffect(() => {
    fetchDashboards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboard_id]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    fetchWorkflowInfo();
    fetchProjectInfo();
  }, [router, projectId, workflowId]);

  const toggleChartConverter = (chartId: string) => {};

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number,
  ) => {
    const dragIndex = Number(e.dataTransfer.getData("text/plain"));
    if (dragIndex === dropIndex) return;

    // Update both chartsIds and chartsData simultaneously without API calls
    const updatedChartsIds = [...chartsIds];
    const [draggedId] = updatedChartsIds.splice(dragIndex, 1);
    updatedChartsIds.splice(dropIndex, 0, draggedId);
    setChartsIds(updatedChartsIds);

    const updatedChartsData = [...chartsData];
    const [draggedChart] = updatedChartsData.splice(dragIndex, 1);
    updatedChartsData.splice(dropIndex, 0, draggedChart);
    setChartsData(updatedChartsData);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const fetchWorkflowInfo = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) {
        router.push("/");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/projects/${projectId}/workflows`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `${tokenType} ${token}`,
          },
        },
      );

      if (response.ok) {
        const workflows = await response.json();
        const workflow = workflows.find((w: any) => w.id === workflowId);

        if (workflow) {
          setWorkflowInfo({
            id: workflow.id,
            workflow_name: workflow.workflow_name || "Untitled Workflow",
            project_id: workflow.project_id,
            workflow_status: workflow.workflow_status,
            extracted_config: workflow.extracted_config,
          });
        } else {
          router.push(`/project/${projectId}`);
        }
      } else if (response.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        router.push("/");
      } else {
        router.push(`/project/${projectId}`);
      }
    } catch (error) {
      router.push(`/project/${projectId}`);
    } finally {
    }
  };

  const fetchProjectInfo = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) {
        return;
      }

      const response = await fetch(`${BASE_URL}/projects/${projectId}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${tokenType} ${token}`,
        },
      });

      if (response.ok) {
        const project = await response.json();
        setProjectInfo({
          name: project.name || "Project",
        });
      }
    } catch (error) {
      setProjectInfo({
        name: "Project",
      });
    }
  };

  const reloadDashboard = () => {
    fetchDashboards();
    setInitialLoadComplete(false);
  };

  const fetchAllOrganizations = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      const response = await fetch(`${BASE_URL}/organisations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load organizations");
      }

      const creditFromApi = data?.[0]?.credits ?? 0;

      setCredits(creditFromApi);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );

      const decoded = JSON.parse(jsonPayload);
      setRole(decoded.role);
      setUsername(decoded.sub);

      // Convert username to initials
      const name = decoded.sub.toUpperCase();
      const init = name
        .split(" ")
        .map((n: string) => n[0])
        .join("");
      setInitials(init);
    } catch (err) {}
  }, []);

  const truncateText = (text: string, maxLength = 15) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // Show loading spinner during initial load OR during refresh
  if (loadingCharts || refreshingAll) {
    return (
      <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex items-center justify-center">
        <div className="flex items-center space-x-3 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg">
            {refreshingAll ? "Refreshing charts..." : "Loading charts..."}
          </span>
        </div>
      </div>
    );
  }

  const chartGroups = [];
  for (let i = 0; i < chartsData.length; i += 2) {
    chartGroups.push(chartsData.slice(i, i + 2));
  }

  return (
    <>
      <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          showBackButton
          backLabel="Back to Execute"
          onBack={() =>
            router.push(`/project/${projectId}/workflow/${workflowId}/execute`)
          }
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
            { label: "Chart Dashboard" },
          ]}
        />
        <main className="flex-1 container mx-auto flex flex-col overflow-x-auto px-4 py-2">
          <div className="justify-end flex items-center gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={refreshAllCharts}
              disabled={refreshingAll || chartsIds.length === 0}
              className="bg-linear-to-r from-primary to-accent text-light hover:from-(--primary)/90 hover:to-(--accent)/90"
            >
              <RefreshCcw className="mr-1 h-4 w-4" />
              Refresh All Charts
            </Button>
            <ReorderChartsDialog
              open={isReorderOpen}
              onOpenChange={setIsReorderOpen}
              chartsData={chartsData}
              chartsIds={chartsIds}
              dashboardId={dashboard_id}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          </div>

          {!loadingCharts && chartsData.length === 0 ? (
            <div className="flex flex-1 items-center justify-center h-full text-gray-300 text-lg">
              Charts Not Found.
            </div>
          ) : (
            <div className="space-y-6 mt-4">
              {chartGroups.map((group, groupIndex) => {
                const hasSingleChart = group.length === 1;

                return (
                  <div
                    key={groupIndex}
                    className={`grid gap-6 ${
                      hasSingleChart
                        ? "grid-cols-1 md:grid-cols-[1fr_250px]"
                        : "grid-cols-1 md:grid-cols-[1fr_1fr_250px]"
                    }`}
                  >
                    {/* Charts */}
                    {group.map(
                      ({
                        id,
                        title,
                        description,
                        insights,
                        fallbackData,
                        chartType,
                      }) => (
                        <div
                          key={id}
                          className={`min-w-0 ${
                            hasSingleChart ? "md:col-span-1" : ""
                          }`}
                        >
                          <DashboardChartConverter
                            chartId={id}
                            dashboardId={dashboard_id}
                            fallbackData={fallbackData}
                            title={title}
                            description={description}
                            insights={insights}
                            chartType={chartType}
                            onClose={() => toggleChartConverter(id)}
                            onTitleClick={() =>
                              handleChartTitleClick(id, groupIndex)
                            }
                            isSelected={selectedChartByRow[groupIndex] === id}
                            onPinOff={() => reloadDashboard()}
                          />
                        </div>
                      ),
                    )}

                    {/* Insights card - Always show all insights for the row */}
                    <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white flex flex-col w-62.5">
                      <CardHeader className="pb-3">
                        {groupIndex === 0 && (
                          <CardTitle className="text-white text-center text-lg">
                            Insights
                          </CardTitle>
                        )}
                      </CardHeader>

                      <CardContent className="flex-1 overflow-hidden">
                        {group.length === 0 ? (
                          <p className="text-sm text-gray-300 p-2">
                            No insights available
                          </p>
                        ) : (
                          <div
                            ref={(el) => {
                              insightsRefs.current[groupIndex] = el;
                            }}
                            className="h-90 overflow-y-auto space-y-4 pr-2"
                          >
                            {group.map((chart, i) => (
                              <div
                                key={chart.id}
                                data-chart-id={chart.id}
                                className="p-2"
                              >
                                <span className="font-semibold text-white block mb-2 text-sm">
                                  {chart.title || "Untitled Chart"}:
                                </span>
                                <span className="text-gray-300 text-xs leading-relaxed block">
                                  {chart.insights ||
                                    "No insight for this chart."}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </>
  );
}