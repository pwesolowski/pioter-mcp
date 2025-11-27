#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { ConfigLoader } from "./config/index.js";
import { ToolHandlers } from "./tools/handlers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = new Server(
    {
        name: "pioter-mcp",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// Initialize Config and Tools
const configLoader = new ConfigLoader();
const toolHandlers = new ToolHandlers(configLoader);

// Define Tools
const config = configLoader.getConfig();
const techNames = config.technologies.map((t) => t.name);

const TOOLS: Tool[] = [
    {
        name: "refactor_advice",
        description: "Get refactoring advice for a specific technology and query.",
        inputSchema: {
            type: "object",
            properties: {
                technology: {
                    type: "string",
                    enum: techNames,
                    description: `The technology to provide advice for. Supported: ${techNames.join(", ")}`,
                },
                query: { type: "string", description: "Code snippet or description to refactor" },
            },
            required: ["technology", "query"],
        },
    },
    {
        name: "technology_best_practices",
        description: "Get best practices for a specific technology.",
        inputSchema: {
            type: "object",
            properties: {
                technology: {
                    type: "string",
                    enum: techNames,
                    description: `The technology to get best practices for. Supported: ${techNames.join(", ")}`,
                },
                query: { type: "string", description: "Specific topic or question (optional)" },
            },
            required: ["technology"],
        },
    },
];

// List Tools Handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: TOOLS,
    };
});

// Call Tool Handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const typedArgs = args as { technology: string; query?: string };

    let result: any;

    try {
        switch (name) {
            case "refactor_advice":
                if (!typedArgs.query) throw new Error("Query is required for refactor_advice");
                result = toolHandlers.refactorAdvice({
                    technology: typedArgs.technology,
                    query: typedArgs.query
                });
                break;
            case "technology_best_practices":
                result = toolHandlers.technologyBestPractices({
                    technology: typedArgs.technology,
                    query: typedArgs.query || ""
                });
                break;
            default:
                throw new Error(`Unknown tool: ${name}`);
        }

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result, null, 2),
                },
            ],
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({ error: errorMessage }),
                },
            ],
            isError: true,
        };
    }
});

// Start Server
async function run() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Pioter MCP Server running on stdio");
}

run().catch((error) => {
    console.error("Fatal error running server:", error);
    process.exit(1);
});
