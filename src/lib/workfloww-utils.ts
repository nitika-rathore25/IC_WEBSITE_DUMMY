import {
  CheckCircle,
  XCircle,
  Play,
  Pause,
  Clock,
  MessageSquare,
  Settings,
} from "lucide-react";

export const getStatusColor = (
  status: string,
  isComplete: boolean,
  needsExtraction: boolean,
  isExtracted: boolean,
  isDeployed: boolean,
) => {
  if (needsExtraction) {
    return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
  }

  if (status.toLowerCase() === "completed" && !isComplete) {
    return "bg-blue-500/20 text-blue-300 border-blue-500/30";
  }

  if (isExtracted) {
    return "bg-blue-500/20 text-blue-300 border-blue-500/30";
  }

  if (isDeployed) {
    return "bg-green-500/20 text-green-300 border-green-500/30";
  }

  if (!isComplete) {
    return "bg-orange-500/20 text-orange-300 border-orange-500/30";
  }

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

export const getStatusIcon = (
  status: string,
  isComplete: boolean,
  needsExtraction: boolean,
  isExtracted: boolean,
  isDeployed: boolean,
) => {
  if (needsExtraction) {
    return Settings;
  }

  if (status.toLowerCase() === "completed" && !isComplete) {
    return Settings;
  }

  if (isExtracted) {
    return CheckCircle;
  }

  if (isDeployed) {
    return Play;
  }

  if (!isComplete) {
    return MessageSquare;
  }

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

export const getStatusText = (
  status: string,
  isComplete: boolean,
  needsExtraction: boolean,
  isExtracted: boolean,
  isDeployed: boolean,
) => {
  if (needsExtraction) {
    return "Ready to Extract";
  }

  if (status.toLowerCase() === "completed" && !isComplete) {
    return "Extract Config";
  }

  if (isExtracted) {
    return "Extracted";
  }

  if (isDeployed) { 
    return "Deployed";
  }

  if (!isComplete) {
    return "In Progress";
  }

  return status;
};

export const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  } catch {
    return "Recently";
  }
};

export const calculateDuration = (
  createdAt: string,
  completedAt: string | null,
) => {
  try {
    const created = new Date(createdAt);
    const completed = completedAt ? new Date(completedAt) : new Date();
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

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  );
};

export const truncateText = (text: string, maxLength = 15) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};