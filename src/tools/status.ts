import { getApiStatus } from "../services/api.ts";
import { McpResponse, McpTextContent } from "../types/index.ts";

/**
 * MCP tool definition for checking API status
 */
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
