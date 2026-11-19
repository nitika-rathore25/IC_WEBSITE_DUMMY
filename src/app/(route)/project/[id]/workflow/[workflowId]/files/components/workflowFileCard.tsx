"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Eye,
  Download,
  Trash2,
  Calendar,
  HardDrive,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { WorkflowForFiles } from "@/interface/interface";
import {
  getFileIcon,
  getFileTypeColor,
  getStatusColor,
  getStatusIcon,
  getEmbeddingStatusColor,
  getEmbeddingStatusIcon,
  getEmbeddingStatusText,
  getEmbeddingProgress,
  formatFileSize,
  formatDate,
} from "./useWorkflowFiles";

interface WorkflowFileCardProps {
  file: WorkflowForFiles;
  liveMode: boolean;
  onDelete: (fileId: string, fileName: string) => void;
}

export default function WorkflowFileCard({
  file,
  liveMode,
  onDelete,
}: WorkflowFileCardProps) {
  const FileIcon = getFileIcon(file.file_type);
  const StatusIcon = getStatusIcon(file.status);
  const EmbeddingIcon = getEmbeddingStatusIcon(
    file.embeddings_ready,
    file.embedding_progress,
  );
  const embeddingProgress = getEmbeddingProgress(file);

  return (
    <Card className="bg-white/5 border-white/20 hover:bg-white/10 transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${getFileTypeColor(
                file.file_type,
              )}`}
            >
              <FileIcon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg">
                {file.name}
              </h4>
              <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                {file.description || "No description provided"}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className={getFileTypeColor(file.file_type)}>
                  {file.file_type.toUpperCase()}
                </Badge>
                <Badge className={getStatusColor(file.status)}>
                  <StatusIcon
                    className={`h-3 w-3 mr-1 ${
                      file.status === "processing" ? "animate-spin" : ""
                    }`}
                  />
                  {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                </Badge>
                <Badge
                  className={getEmbeddingStatusColor(
                    file.embeddings_ready,
                    file.embedding_progress,
                  )}
                >
                  <EmbeddingIcon
                    className={`h-3 w-3 mr-1 ${
                      file.embedding_progress === "processing" ||
                      file.embedding_progress === "in_progress"
                        ? "animate-spin"
                        : ""
                    }`}
                  />
                  Embeddings:{" "}
                  {getEmbeddingStatusText(
                    file.embeddings_ready,
                    file.embedding_progress,
                  )}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white hidden"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-400 hover:text-red-300"
              onClick={() => onDelete(file.id, file.name)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Embedding Progress Bar */}
        {!file.embeddings_ready && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium text-sm">
                Embedding Progress
              </span>
              <span className="text-gray-300 text-xs">
                {embeddingProgress}%
              </span>
            </div>
            <Progress value={embeddingProgress} className="h-2" />
            {file.embedding_status && (
              <p className="text-gray-300 text-xs mt-1">
                {file.embedding_status}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-white font-semibold">
              {formatFileSize(file.size)}
            </div>
            <div className="text-gray-300 text-xs">File Size</div>
          </div>
          <div className="text-center">
            <div className="text-white font-semibold">{file.chunk_count}</div>
            <div className="text-gray-300 text-xs">Chunks</div>
          </div>
          <div className="text-center">
            <div className="text-white font-semibold">
              {file.workflow_ids.length}
            </div>
            <div className="text-gray-300 text-xs">Workflows</div>
          </div>
          <div className="text-center">
            <div className="text-white font-semibold">
              {file.embeddings_ready ? (
                <CheckCircle className="h-4 w-4 text-green-400 mx-auto" />
              ) : (
                <Clock className="h-4 w-4 text-orange-400 mx-auto" />
              )}
            </div>
            <div className="text-gray-300 text-xs">Embeddings</div>
          </div>
        </div>

        {file.embedding_status && file.embeddings_ready && (
          <div className="mb-4">
            <span className="text-white font-medium text-sm">
              Embedding Status:
            </span>
            <p className="text-green-300 text-sm mt-1">
              {file.embedding_status}
            </p>
            {file.embedding_completed_at && (
              <p className="text-gray-300 text-xs mt-1">
                {/* Completed: {formatDate(file.embedding_completed_at)} */}
              </p>
            )}
          </div>
        )}

        {file.error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <span className="text-red-300 font-medium text-sm">
                Processing Error
              </span>
            </div>
            <p className="text-red-200 text-sm">{file.error}</p>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Uploaded {formatDate(file.created_at)}</span>
            </div>
          </div>
          {!liveMode && (
            <div className="flex items-center space-x-1">
              <HardDrive className="h-4 w-4" />
              <span>{file.path.split("/").pop()}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}