#!/bin/bash

# Build the project first
npm run build

# Run the server
# This will run over stdio, so it will wait for input.
# To test it manually, you can use the MCP Inspector or a client.
echo "Starting Pioter MCP Server..."
echo "Press Ctrl+C to stop."
node dist/index.js
