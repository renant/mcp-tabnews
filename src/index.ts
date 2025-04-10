import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SERVER_CONFIG } from "./config/configs.ts";
import {
  checkStatusTool,
  getAnalyticsChildContentPublishedTool,
  getAnalyticsRootContentPublishedTool,
  getAnalyticsUserCreatedTool,
  getContentChildrenTool,
  getContentsByUserTool,
  getContentsTool,
  getContentTool,
  getRssFeedTool,
} from "./tools/status.ts";

async function initializeServer() {
  // Create server instance
  const server = new McpServer({
    name: SERVER_CONFIG.name,
    version: SERVER_CONFIG.version,
    description: SERVER_CONFIG.description,
  });

  server.tool(
    checkStatusTool.name,
    checkStatusTool.description,
    checkStatusTool.parameters,
    checkStatusTool.handler
  );

  server.tool(
    getContentsTool.name,
    getContentsTool.description,
    getContentsTool.parameters,
    getContentsTool.handler
  );

  server.tool(
    getContentsByUserTool.name,
    getContentsByUserTool.description,
    getContentsByUserTool.parameters,
    getContentsByUserTool.handler
  );

  server.tool(
    getContentTool.name,
    getContentTool.description,
    getContentTool.parameters,
    getContentTool.handler
  );

  server.tool(
    getContentChildrenTool.name,
    getContentChildrenTool.description,
    getContentChildrenTool.parameters,
    getContentChildrenTool.handler
  );

  server.tool(
    getAnalyticsUserCreatedTool.name,
    getAnalyticsUserCreatedTool.description,
    getAnalyticsUserCreatedTool.parameters,
    getAnalyticsUserCreatedTool.handler
  );

  server.tool(
    getAnalyticsRootContentPublishedTool.name,
    getAnalyticsRootContentPublishedTool.description,
    getAnalyticsRootContentPublishedTool.parameters,
    getAnalyticsRootContentPublishedTool.handler
  );

  server.tool(
    getAnalyticsChildContentPublishedTool.name,
    getAnalyticsChildContentPublishedTool.description,
    getAnalyticsChildContentPublishedTool.parameters,
    getAnalyticsChildContentPublishedTool.handler
  );

  server.tool(
    getRssFeedTool.name,
    getRssFeedTool.description,
    getRssFeedTool.parameters,
    getRssFeedTool.handler
  );

  return server;
}

/**
 * Main entry point
 */
async function main() {
  const server = await initializeServer();

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("TabNews MCP Server running on stdio");
}

// Start the server
main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
