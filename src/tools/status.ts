import { z } from "zod";
import {
  getAnalyticsChildContentPublished,
  getAnalyticsRootContentPublished,
  getAnalyticsUserCreated,
  getApiStatus,
  getContent,
  getContentChildren,
  getContents,
  getContentsByUser,
  getRssFeed,
} from "../services/api.ts";
import type {
  GetContentByUserParams,
  GetContentParams,
  GetContentsParams,
  McpResponse,
  McpTextContent,
} from "../types/index.ts";

export const checkStatusTool = {
  name: "get status",
  description: "get status from tabnews api",
  parameters: {},
  handler: async (): Promise<McpResponse> => {
    try {
      const result = await getApiStatus();

      const content: McpTextContent = {
        type: "text",
        text: `API Status:\n\n${JSON.stringify(result, null, 2)}`,
      };

      return {
        content: [content],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to check API status: ${error.message}`);
      } else {
        throw new Error("Failed to check API status");
      }
    }
  },
};

export const getContentsTool = {
  name: "get contents",
  description: "get contents from tabnews api",
  parameters: {
    page: z.number().optional().describe("The page number to get"),
    per_page: z.number().optional().describe("The number of contents per page"),
    strategy: z
      .enum(["relevant", "new", "old"])
      .optional()
      .describe("The strategy to get the contents"),
  },
  handler: async (params: GetContentsParams): Promise<McpResponse> => {
    try {
      const result = await getContents({
        page: params.page,
        per_page: params.per_page,
        strategy: params.strategy,
      });

      const content: McpTextContent = {
        type: "text",
        text: `Contents:\n\n${JSON.stringify(result, null, 2)}`,
      };

      return {
        content: [content],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get contents: ${error.message}`);
      } else {
        throw new Error("Failed to get contents");
      }
    }
  },
};

export const getContentsByUserTool = {
  name: "get contents by user",
  description: "get contents by user from tabnews api",
  parameters: {
    username: z.string().describe("The username to get the contents"),
    page: z.number().optional().describe("The page number to get"),
    per_page: z.number().optional().describe("The number of contents per page"),
    strategy: z
      .enum(["relevant", "new", "old"])
      .optional()
      .describe("The strategy to get the contents"),
  },
  handler: async (params: GetContentByUserParams): Promise<McpResponse> => {
    try {
      const result = await getContentsByUser({
        username: params.username,
        page: params.page,
        per_page: params.per_page,
        strategy: params.strategy,
      });

      const content: McpTextContent = {
        type: "text",
        text: `Contents:\n\n${JSON.stringify(result, null, 2)}`,
      };

      return {
        content: [content],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get contents by user: ${error.message}`);
      } else {
        throw new Error("Failed to get contents by user");
      }
    }
  },
};

export const getContentTool = {
  name: "get content",
  description: "get content from tabnews api",
  parameters: {
    username: z.string().describe("The username to get the content"),
    slug: z.string().describe("The slug to get the content"),
  },
  handler: async (params: GetContentParams): Promise<McpResponse> => {
    try {
      const result = await getContent({
        username: params.username,
        slug: params.slug,
      });

      const content: McpTextContent = {
        type: "text",
        text: `Content ${params.slug} from ${
          params.username
        }:\n\n${JSON.stringify(result, null, 2)}`,
      };

      return {
        content: [content],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get content: ${error.message}`);
      } else {
        throw new Error("Failed to get content");
      }
    }
  },
};

export const getContentChildrenTool = {
  name: "get comments",
  description: "get comments from a content on tabnews api",
  parameters: {
    username: z.string().describe("The username to get the content"),
    slug: z.string().describe("The slug to get the content"),
  },
  handler: async (params: GetContentParams): Promise<McpResponse> => {
    try {
      const result = await getContentChildren({
        username: params.username,
        slug: params.slug,
      });

      const content: McpTextContent = {
        type: "text",
        text: `Comments:\n\n${JSON.stringify(result, null, 2)}`,
      };

      return {
        content: [content],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get comments: ${error.message}`);
      } else {
        throw new Error("Failed to get comments");
      }
    }
  },
};

export const getAnalyticsUserCreatedTool = {
  name: "get analytics user created",
  description: "To get how many users were created (per day) in tabnews",
  parameters: {},
  handler: async (): Promise<McpResponse> => {
    try {
      const result = await getAnalyticsUserCreated();

      const content: McpTextContent = {
        type: "text",
        text: `Analytics User Created:\n\n${JSON.stringify(result, null, 2)}`,
      };

      return {
        content: [content],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to get analytics user created: ${error.message}`
        );
      } else {
        throw new Error("Failed to get analytics user created");
      }
    }
  },
};

export const getAnalyticsRootContentPublishedTool = {
  name: "get analytics root content published",
  description: "To get how many posts were made (per day) in tabnews",
  parameters: {},
  handler: async (): Promise<McpResponse> => {
    try {
      const result = await getAnalyticsRootContentPublished();

      const content: McpTextContent = {
        type: "text",
        text: `Analytics Root Content Published:\n\n${JSON.stringify(
          result,
          null,
          2
        )}`,
      };

      return {
        content: [content],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to get analytics root content published: ${error.message}`
        );
      } else {
        throw new Error("Failed to get analytics root content published");
      }
    }
  },
};

export const getAnalyticsChildContentPublishedTool = {
  name: "get analytics child content published",
  description: "To get how many comments were made (per day) in tabnews",
  parameters: {},
  handler: async (): Promise<McpResponse> => {
    try {
      const result = await getAnalyticsChildContentPublished();

      const content: McpTextContent = {
        type: "text",
        text: `Analytics Child Content Published:\n\n${JSON.stringify(
          result,
          null,
          2
        )}`,
      };

      return {
        content: [content],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to get analytics child content published: ${error.message}`
        );
      } else {
        throw new Error("Failed to get analytics child content published");
      }
    }
  },
};

export const getRssFeedTool = {
  name: "get rss feed",
  description: "To get the rss feed from tabnews",
  parameters: {},
  handler: async (): Promise<McpResponse> => {
    try {
      const result = await getRssFeed();

      const content: McpTextContent = {
        type: "text",
        text: `RSS Feed:\n\n${result}`,
      };

      return {
        content: [content],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get rss feed: ${error.message}`);
      } else {
        throw new Error("Failed to get rss feed");
      }
    }
  },
};
