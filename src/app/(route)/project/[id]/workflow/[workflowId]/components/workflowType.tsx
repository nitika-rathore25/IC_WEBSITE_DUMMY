import {
  Settings,
  Globe,
  FileText,
  Database,
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle,
  Play,
  Pause,
} from "lucide-react";

export interface AgentLLMConfig {
  provider: string;
  model: string;
  // temperature: number;
  // max_tokens: number;
  // top_p: number;
}

export interface Agent {
  agent_llm_config: AgentLLMConfig;
  provider: string;
  model: string;
  agent_name: string;
  description: string;
  role: "Primary" | "Secondary";
  inputs: string;
  outputs: string;
  file_formats: string | null;
  tools_required: string | null;
  tone: string;
  behavior_rules: string[];
  prompt_archetype: string;
}

export interface ExtractedConfig {
  project_name: string;
  goal: string;
  domain: string;
  agents: Agent[];
}

export interface WorkflowData {
  project_id: string;
  user_id: string;
  workflow_status: string;
  id: string;
  workflow_name: string;
  created_at: string;
  completed_at: string;
  extracted_config: ExtractedConfig;
}

export const MODEL_REGISTRY = {
  openai: {
    light: {
      model: "gpt-4.1-mini",
      temperature: 0.5,
      max_tokens: 2000,
      top_p: 1.0,
    },
    balanced: {
      model: "gpt-4.1",
      temperature: 0.4,
      max_tokens: 4000,
      top_p: 1.0,
    },
    reasoning: {
      model: "o1-2024-12-17",
      temperature: 1.0,
      max_tokens: 8000,
      top_p: 1.0,
    },
  },
  anthropic: {
    light: {
      model: "claude-3-5-haiku-20241022",
      temperature: 0.5,
      max_tokens: 2000,
      top_p: 1.0,
    },
    balanced: {
      model: "claude-3-7-sonnet-20250219",
      temperature: 0.4,
      max_tokens: 4000,
      top_p: 1.0,
    },
    reasoning: {
      model: "claude-haiku-4-5-20251001",
      temperature: 0.2,
      max_tokens: 10000,
      top_p: 1.0,
    },
  },
};

export const PROVIDER_ICON_MAP: Record<string, React.ReactNode> = {
  gemini: <img src="/icons/google.svg" className="w-4 h-4" alt="Google" />,
  anthropic: (
    <img src="/icons/anthropic.svg" className="w-4 h-4" alt="Anthropic" />
  ),
  openai: <img src="/icons/openai.svg" className="w-4 h-4" alt="OpenAI" />,
};

export const getProviderByModel = (model: string) => {
  for (const [provider, configs] of Object.entries(MODEL_REGISTRY)) {
    for (const cfg of Object.values(configs)) {
      if (cfg.model === model) return provider;
    }
  }
  return null;
};

export const getRoleColor = (role: string) => {
  return role === "Primary"
    ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
    : "bg-blue-500/20 text-blue-300 border-blue-500/30";
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "deployed":
    case "active":
      return "bg-green-500/20 text-green-300 border-green-500/30";
    case "inactive":
    case "stopped":
      return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    case "completed":
      return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    case "draft":
    case "pending":
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    case "failed":
    case "error":
      return "bg-red-500/20 text-red-300 border-red-500/30";
    default:
      return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  }
};

export const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "deployed":
    case "active":
      return Play;
    case "inactive":
    case "stopped":
      return Pause;
    case "completed":
      return CheckCircle;
    case "draft":
    case "pending":
      return Clock;
    case "failed":
    case "error":
      return XCircle;
    default:
      return XCircle;
  }
};

export const getToolIcon = (tool: string | null) => {
  if (!tool || tool === "null") return Settings;
  if (tool.toLowerCase().includes("web")) return Globe;
  if (tool.toLowerCase().includes("search")) return Globe;
  if (
    tool.toLowerCase().includes("document") ||
    tool.toLowerCase().includes("file")
  )
    return FileText;
  if (
    tool.toLowerCase().includes("database") ||
    tool.toLowerCase().includes("data")
  )
    return Database;
  if (
    tool.toLowerCase().includes("message") ||
    tool.toLowerCase().includes("notification")
  )
    return MessageSquare;
  return Settings;
};

export const getDomainColor = (domain: string) => {
  switch (domain.toLowerCase()) {
    case "medical":
    case "healthcare":
      return "bg-red-500/20 text-red-300 border-red-500/30";
    case "finance":
    case "financial":
      return "bg-green-500/20 text-green-300 border-green-500/30";
    case "education":
      return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    case "technology":
    case "tech":
      return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    default:
      return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  }
};

export const calculateDuration = (createdAt: string, completedAt: string) => {
  try {
    const created = new Date(createdAt);
    const completed = new Date(completedAt);
    const diffMs = completed.getTime() - created.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    if (diffMinutes > 0) {
      return `${diffMinutes}m ${diffSeconds}s`;
    }
    return `${diffSeconds}s`;
  } catch {
    return "N/A";
  }
};

export const isFileInputAgent = (input?: string) => {
  return input?.toLowerCase() === "file";
};

export const getModelsForAgent = (agent: Agent) => {
  const isFileAgent = isFileInputAgent(agent.inputs);

  return Object.entries(MODEL_REGISTRY).flatMap(([provider, configs]) => {
    if (isFileAgent && provider === "anthropic") return [];
    return Object.values(configs).map((c) => c.model);
  });
};

export const truncateText = (text: string, maxLength = 15) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};