export interface DatabaseLatency {
  first_query: number;
  second_query: number;
  third_query: number;
}

export interface DatabaseStatus {
  status: string;
  max_connections: number;
  opened_connections: number;
  latency: DatabaseLatency;
  version: string;
}

export interface WebserverStatus {
  status: string;
  provider: string;
  environment: string;
  aws_region: string;
  vercel_region: string;
  timezone: string;
  last_commit_author: string;
  last_commit_message: string;
  last_commit_message_sha: string;
  version: string;
}

export interface Dependencies {
  database: DatabaseStatus;
  webserver: WebserverStatus;
}

export interface GetStatusResponse {
  updated_at: string;
  dependencies: Dependencies;
}

// MCP response types
export interface McpTextContent {
  type: "text";
  text: string;
  [key: string]: unknown;
}

export interface McpResourceContent {
  type: "resource";
  resource:
    | {
        text: string;
        uri: string;
        mimeType?: string;
        [key: string]: unknown;
      }
    | {
        uri: string;
        blob: string;
        mimeType?: string;
        [key: string]: unknown;
      };
  [key: string]: unknown;
}

export type McpContent = McpTextContent | McpResourceContent;

export interface McpResponse {
  content: McpContent[];
  _meta?: Record<string, unknown>;
  isError?: boolean;
  [key: string]: unknown;
}
