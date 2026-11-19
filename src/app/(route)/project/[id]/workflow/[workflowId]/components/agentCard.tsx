"use client";

import { Bot, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Agent,
  PROVIDER_ICON_MAP,
  getProviderByModel,
  getRoleColor,
  getModelsForAgent,
} from "./workflowType";

interface AgentCardProps {
  agent: Agent;
  variant: "primary" | "secondary";
  selectedModel: string;
  onModelChange: (agentName: string, model: string) => void;
}

export default function AgentCard({
  agent,
  variant,
  selectedModel,
  onModelChange,
}: AgentCardProps) {
  const isPrimary = variant === "primary";

  const modelSelect = (
    <Select
      value={selectedModel || ""}
      onValueChange={(value: any) => onModelChange(agent.agent_name, value)}
    >
      <SelectTrigger className="w-fit bg-white/30 border-white/20 rounded-full text-white">
        <SelectValue placeholder="Select model" />
      </SelectTrigger>
      <SelectContent className="dark:bg-gray-300 text-gray-900 shadow-lg border border-gray-200 rounded-md">
        <SelectGroup>
          {getModelsForAgent(agent).map((model) => {
            const provider = getProviderByModel(model);

            return (
              <SelectItem
                key={model}
                value={model}
                className="
                      flex items-center gap-2
                      text-gray-900
                      cursor-pointer
                      rounded-md
                      border border-transparent
                      outline-none
                      transition-colors

                      hover:bg-gray-100 hover:border-gray-300
                      data-highlighted:bg-gray-100
                      data-highlighted:border-gray-300
                      data-highlighted:text-gray-900
                    "
              >
                <div className="flex items-center gap-2">
                  {provider && PROVIDER_ICON_MAP[provider]}
                  <span>{model}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );

  if (isPrimary) {
    return (
      <Card className="bg-white/5 border-purple-500/30 border-2">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-light" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg">
                  {agent?.agent_name || "Unnamed Agent"}
                </h4>
                <Badge className={getRoleColor(agent.role)}>
                  {agent.role} Agent
                </Badge>
              </div>
            </div>
          </div>
          <p className="text-gray-300 mb-4 leading-relaxed">
            {agent?.description || "No description available"}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-white font-medium text-sm">Input:</span>
              <Badge className="ml-2 bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                {agent?.inputs || "N/A"}
              </Badge>
            </div>
            <div>
              <span className="text-white font-medium text-sm">Output:</span>
              <Badge className="ml-2 bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                {agent?.outputs || "N/A"}
              </Badge>
            </div>
            <div className="flex gap-2">
              <span className="text-white font-medium text-sm block mb-1">
                Model:
              </span>
              {modelSelect}
            </div>
          </div>

          {agent?.behavior_rules &&
            Array.isArray(agent.behavior_rules) &&
            agent.behavior_rules.length > 0 && (
              <div className="mb-4">
                <span className="text-white font-medium text-sm">
                  Behavior Rules:
                </span>
                <ul className="mt-2 space-y-1">
                  {agent.behavior_rules.map((rule, ruleIndex) => (
                    <li
                      key={ruleIndex}
                      className="text-gray-300 text-sm flex items-start"
                    >
                      <span className="text-gray-300 mr-2">•</span>
                      {rule || "No rule specified"}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {agent?.tools_required &&
            agent.tools_required !== "null" &&
            agent.tools_required.trim() !== "" && (
              <div className="space-y-2">
                <span className="text-white font-medium">Required Tools:</span>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white/10 text-gray-300 border-white/20">
                    <Settings className="h-3 w-3 mr-1" />
                    {agent.tools_required}
                  </Badge>
                </div>
              </div>
            )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 border-blue-500/30 border">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-linear-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <Bot className="h-4 w-4 text-light" />
            </div>
            <div>
              <h4 className="text-white font-semibold">
                {agent?.agent_name || "Unnamed Agent"}
              </h4>
              <Badge className={getRoleColor(agent.role)}>
                {agent.role} Agent
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-gray-300 mb-4 text-sm leading-relaxed">
          {agent?.description || "No description available"}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <span className="text-white font-medium text-xs">Input:</span>
            <Badge className="ml-1 bg-green-500/20 text-green-300 border-green-500/30 text-xs">
              {agent?.inputs || "N/A"}
            </Badge>
          </div>
          <div>
            <span className="text-white font-medium text-xs">Output:</span>
            <Badge className="ml-1 bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
              {agent?.outputs || "N/A"}
            </Badge>
          </div>
          <div className="flex gap-2">
            <span className="text-white font-medium text-sm block mb-1">
              Model:
            </span>
            {modelSelect}
          </div>
        </div>

        {agent?.behavior_rules &&
          Array.isArray(agent.behavior_rules) &&
          agent.behavior_rules.length > 0 && (
            <div className="mb-3">
              <span className="text-white font-medium text-xs">Rules:</span>
              <ul className="mt-1 space-y-1">
                {agent.behavior_rules.slice(0, 2).map((rule, ruleIndex) => (
                  <li
                    key={ruleIndex}
                    className="text-gray-300 text-xs flex items-start"
                  >
                    <span className="text-blue-400 mr-1">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          )}

        {agent?.tools_required &&
          agent.tools_required !== "null" &&
          agent.tools_required.trim() !== "" && (
            <div className="space-y-1">
              <span className="text-white font-medium text-xs">Tools:</span>
              <div className="flex flex-wrap gap-1">
                {agent.tools_required.split(",").map((tool, toolIndex) => (
                  <Badge
                    key={toolIndex}
                    className="bg-white/10 text-gray-300 border-white/20"
                  >
                    <Settings className="h-3 w-3 mr-1" />
                    {tool.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
      </CardContent>
    </Card>
  );
}