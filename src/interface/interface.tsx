export interface LoginPayload {
  username: string;
  password: string;
}

export interface ProjectSettings {
  context_window_size: number
  temperature: number
  model: string
  system_prompt: string
}

export interface Project {
  id: string
  name: string
  description: string
  user_id: string
  created_at: string
  updated_at: string
  settings: ProjectSettings
  file_count: number
  chat_count: number
  persona: string
  tone: string
  summary: string
}

export interface ChatMessage {
  id: string
  message: string
  sender: "user" | "assistant"
  timestamp: string
  project_id: string
}

export interface SendMessageResponse {
  project_id: string
  user_message: string
  response: string
  conversation_complete: boolean
}

export interface Agent {
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
  prompt_archetype: any;
}

export interface WorkflowItem {
  project_id: string;
  user_id: string;
  workflow_status: string;
  id: string;
  workflow_name: string;
  created_at: string;
  completed_at: string | null;
  extracted_config: ExtractedConfig | null;
  conversation_complete?: boolean;
}

export interface ProjectInfo {
  id: string;
  name: string;
  description: string;
  domain: string;
}

export interface CreateWorkflowResponse {
  workflow_id: string;
  message: string;
  message_type: string;
}

// File Management Types
export interface WorkflowFileRequirement {
  workflow_id: string;
  requires_files: boolean;
  expected_file_types: string[];
  max_file_size: number;
  max_files_count: number;
  description: string;
  has_unready_embeddings?: boolean;
  total_files?: number;
}

export interface WorkflowFile {
  id: string;
  name: string;
  file_type: string;
  size: number;
  upload_date: string;
  status: "uploaded" | "processing" | "ready" | "processed" | "error";
  workflow_id: string;
  description?: string | null;
  embeddings_ready?: boolean;
  embedding_progress?: string;
  embedding_status?: string;
  chunk_count?: number;
  embedding_completed_at?: string | null;
  error?: string | null;
  path?: string;
}

export interface FileUploadRequest {
  workflow_id: string;
  file: File;
  description?: string;
}

export interface ChatMessageChat {
  id: string
  message: string
  sender: "user" | "assistant"
  timestamp: string
  workflow_id?: string
}

export interface WorkflowInfo {
  id: string
  workflow_name: string
  project_id: string
  workflow_status: string
  conversation_complete?: boolean
}

export interface SendMessageResponseChat {
  workflow_id: string
  user_message: string
  ai_response: string
  conversation_complete: boolean
}

export interface WorkflowForFiles {
  name: string;
  description: string | null;
  user_id: string;
  file_type: string;
  size: number;
  status: "processed" | "processing" | "failed";
  workflow_id: string;
  workflow_ids: string[];
  embeddings_ready: boolean;
  embedding_progress: string;
  id: string;
  created_at: string;
  project_ids: string[];
  path: string;
  embedding_status: string | null;
  chunk_count: number;
  embedding_completed_at: string | null;
  error: string | null;
}

export interface WorkflowFilesResponse {
  workflow_id: string;
  files: WorkflowForFiles[];
  total_files: number;
  expected_formats: string[];
  missing_formats: string[];
  workflow_accepts_files: boolean;
}

export interface WorkflowInfoFiles {
  id: string;
  workflow_name: string;
  project_id: string;
  workflow_status: string;
}

export interface EmbeddingStatusResponse {
  file_id: string;
  filename: string;
  file_type: string;
  file_size: number;
  status: "processed" | "processing" | "failed";
  embeddings_ready: boolean;
  embedding_progress: string;
  embedding_status: string | null;
  chunk_count: number;
  embedding_error: string | null;
  embedding_completed_at: string | null;
  embedding_failed_at: string | null;
  created_at: string;
  workflow_id: string;
}