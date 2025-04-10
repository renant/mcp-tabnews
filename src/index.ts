import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SERVER_CONFIG } from "./config/configs.ts";
import { checkStatusTool } from "./tools/status.ts";

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
