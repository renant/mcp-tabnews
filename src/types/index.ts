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

export interface TabNewsContent {
  id: string;
  owner_id: string;
  parent_id: string | null;
  slug: string;
  title: string;
  status: string;
  type: string;
  source_url: string | null;
  created_at: string;
  updated_at: string;
  published_at: string;
  deleted_at: string | null;
  owner_username: string;
  tabcoins: number;
  tabcoins_credit: number;
  tabcoins_debit: number;
  children_deep_count: number;
}

export interface TabNewsContentWithBody extends TabNewsContent {
  body: string;
}

export interface TabNewsContentChildren extends TabNewsContentWithBody {
  children: TabNewsContentChildren[];
  children_deep_count: number;
}

export const CONTENT_STRATEGY = ["new", "old", "relevant"] as const;

export type ContentStrategy = (typeof CONTENT_STRATEGY)[number];

export interface GetContentsParams {
  page?: number;
  per_page?: number;
  strategy?: ContentStrategy;
}

export interface GetContentByUserParams extends GetContentsParams {
  username: string;
}

export interface GetContentParams {
  username: string;
  slug: string;
}

export interface AnalyticsUserCreated {
  date: string;
  cadastros: number;
}

export interface AnalyticsRootContentPublished {
  date: string;
  conteudos: number;
}

export interface AnalyticsChildContentPublished {
  date: string;
  respostas: number;
}
