"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Workflow, Target, Building, Clock, Activity, Users, Info } from "lucide-react";
import {
  WorkflowData,
  getStatusColor,
  getStatusIcon,
  getDomainColor,
  calculateDuration,
} from "./workflowType";

interface WorkflowOverviewCardProps {
  workflowData: WorkflowData;
  liveMode: boolean;
}

const infoData = [
  {
    id: "duration",
    title: "Duration Info",
    info: "Time taken to complete the chat session used to define and deploy the workflow and its agents.",
  },
  {
    id: "archetype",
    title: "Archetype Info",
    info: "A predefined category or structure that represents a common pattern or style of prompt used to instruct or guide an AI agent's behavior. It helps standardize how prompts are formulated across tasks or agents.",
  },
  {
    id: "tone",
    title: "Tone Info",
    info: "The tone selected by the user, which defines how agents should behave (e.g., friendly, formal, concise).",
  },
  {
    id: "agents",
    title: "Agents Info",
    info: "Agents are intelligent entities that can reason, use tools, and accomplish tasks assigned within a workflow.",
  },
];

export default function WorkflowOverviewCard({
  workflowData,
  liveMode,
}: WorkflowOverviewCardProps) {
  // for info icon
  const [isInfoDialogOpen, setisInfoDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<{
    title: string;
    info: string;
  } | null>(null);

  const handleInfoClick = (id: string) => {
    const entry = infoData.find((item) => item.id === id);
    if (entry) {
      setSelectedEntry({ title: entry.title, info: entry.info });
      setisInfoDialogOpen(true);
    }
  };

  const StatusIcon = getStatusIcon(workflowData.workflow_status);

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-white flex items-center space-x-3">
            <Workflow className="h-8 w-8 text-gray-300" />
            <span>{workflowData.workflow_name}</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(workflowData.workflow_status)}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {workflowData.workflow_status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-gray-300" />
              <span className="text-white font-semibold">Goal</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {workflowData.extracted_config.goal}
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-gray-300" />
              <span className="text-white font-semibold">Domain</span>
            </div>
            <Badge className={getDomainColor(workflowData.extracted_config.domain)}>
              {workflowData.extracted_config.domain}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Clock className="h-4 w-4 text-gray-300" />
            </div>
            <div className="text-white font-semibold">
              {calculateDuration(
                workflowData.created_at,
                workflowData.completed_at,
              )}
            </div>
            <div className="flex items-center justify-center text-gray-300 text-xs">
              Duration
              <Info
                className="h-4 w-4 text-white ml-1 cursor-pointer hover:text-gray-300 transition"
                onClick={() => handleInfoClick("duration")}
              />
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Activity className="h-4 w-4 text-green-400" />
            </div>
            <div className="text-white font-semibold">
              {workflowData.extracted_config?.agents?.[0]?.prompt_archetype ||
                "General"}
            </div>
            <div className="flex items-center justify-center text-gray-300 text-xs">
              Archetype
              <Info
                className="h-4 w-4 text-white ml-1 cursor-pointer hover:text-gray-300 transition"
                onClick={() => handleInfoClick("archetype")}
              />
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Target className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-white font-semibold">
              {workflowData.extracted_config?.agents?.[0]?.tone || "N/A"}
            </div>
            <div className="flex items-center justify-center text-gray-300 text-xs">
              Tone
              <Info
                className="h-4 w-4 text-white ml-1 cursor-pointer hover:text-gray-300 transition"
                onClick={() => handleInfoClick("tone")}
              />
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Users className="h-4 w-4 text-yellow-400" />
            </div>
            <div className="text-white font-semibold">
              {workflowData.extracted_config?.agents?.length || 0}
            </div>
            <div className="flex items-center justify-center text-gray-300 text-xs">
              Agents
              <Info
                className="h-4 w-4 text-white ml-1 cursor-pointer hover:text-gray-300 transition"
                onClick={() => handleInfoClick("agents")}
              />
            </div>
          </div>
        </div>

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

        {!liveMode && (
          <div className="pt-2">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-white font-semibold">Workflow ID:</span>
              <code className="text-gray-400 bg-white/10 px-2 py-1 rounded text-sm">
                {workflowData.id}
              </code>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}