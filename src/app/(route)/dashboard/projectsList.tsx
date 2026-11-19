"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Folder,
  Calendar,
  Search,
  FileText,
  MessageSquare,
  Settings,
  RefreshCw,
  PencilLine,
} from "lucide-react";
import { Project } from "@/interface/interface";

interface ProjectsListProps {
  projects: Project[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  onProjectClick: (projectId: string) => void;
  onEditProject: (project: {
    id: string;
    name: string;
    description: string;
  }) => void;
  onCreateFirst: () => void;
}

const formatDate = (dateString: string) => {
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

const getModelBadgeColor = (model: string | null | undefined) => {
  const modelStr = (model || "").toLowerCase();
  switch (modelStr) {
    case "gpt-4o":
      return "bg-green-500/20 text-green-300 border-green-500/30";
    case "gpt-4":
      return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    case "gpt-3.5-turbo":
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    default:
      return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  }
};

export default function ProjectsList({
  projects,
  searchTerm,
  onSearchChange,
  onRefresh,
  onProjectClick,
  onEditProject,
  onCreateFirst,
}: ProjectsListProps) {
  return (
    <div className="lg:col-span-3 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-bold text-white">Projects</h2>
          <Badge className="bg-white/10 text-gray-300 border-white/20">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-300" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 w-64"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={onRefresh}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 overflow-hidden">
        <div className="space-y-4 pr-4">
          {projects.length === 0 ? (
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-8 text-center">
                <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-white text-lg font-semibold mb-2">
                  No Projects Found
                </h3>
                <p className="text-gray-400 mb-4">
                  {searchTerm
                    ? "No projects match your search criteria."
                    : "You haven't created any projects yet."}
                </p>
                <Button
                  onClick={onCreateFirst}
                  className="bg-linear-to-r from-primary to-accent text-light"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Project
                </Button>
              </CardContent>
            </Card>
          ) : (
            projects.map((project) => (
              <Card
                key={project.id}
                onClick={() => onProjectClick(project.id)}
                className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-200 cursor-pointer group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-linear-to-r from-primary to-accent rounded-lg">
                        <Folder className="h-5 w-5 text-light" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg dark:hover:text-gray-200 transition-colors">
                          {project.name || "Untitled Project"}
                        </CardTitle>
                        <p className="dark:text-gray-100 text-gray-400 text-sm mt-1 line-clamp-2">
                          {project.description || "No description available"}
                        </p>
                        {project.summary && project.summary.trim() !== "" && (
                          <p className="dark:text-gray-200 text-gray-400 text-xs mt-1 line-clamp-1">
                            {project.summary}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge
                        className={getModelBadgeColor(
                          project.settings?.model || "unknown",
                        )}
                      >
                        {project.settings?.model || "Unknown"}
                      </Badge>
                      {project.persona && project.persona.trim() !== "" && (
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                          {project.persona}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm dark:text-gray-100 text-gray-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {formatDate(project.updated_at ?? project.created_at)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="h-4 w-4" />
                        <span>{project.file_count || 0} files</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{project.chat_count || 0} chats</span>
                      </div>
                      <div
                        className="flex items-center space-x-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditProject(project);
                        }}
                      >
                        <PencilLine className="w-4 h-4" />
                        <span>Edit</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Settings className="h-3 w-3" />
                      <span className="text-xs">
                        T: {project.settings?.temperature ?? 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}