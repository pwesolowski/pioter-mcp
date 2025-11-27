# Pioter MCP Server

Pioter is a "Best Practices Oracle" MCP server that provides dynamic advice, checklists, and patterns for various software technologies.

## Features

- **Technology Awareness**: Automatically detects the technology from your query (e.g., React, Kubernetes, Python).
- **Best Practices**: Provides curated best practices and common mistakes.
- **Checklists**: Offers basic and advanced checklists for reviews.
- **Configurable**: Easily extendable via JSON configuration files.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd piotermcp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## Configuration

To use this server with Antigravity or any MCP client (like Claude Desktop), add the following to your MCP configuration file:

```json
{
  "mcpServers": {
    "pioter": {
      "command": "node",
      "args": ["/Users/piotr/workspace/piotermcp/dist/index.js"]
    }
  }
}
```

### Running Locally

You can run the server locally for testing using the provided script:

```bash
./run_server.sh
```

Note: The server communicates via `stdio` (standard input/output). It is designed to be run by an MCP client, not directly by a human in the terminal, although you will see it start up.


## Usage

Ask Pioter about best practices, refactoring, or architecture.

Examples:
- "What are the best practices for React hooks?"
- "Give me a security checklist for Kubernetes."
- "How should I structure a Python FastAPI project?"

## Tools

- `refactor_advice`: Get refactoring advice.
- `technology_best_practices`: Get general best practices.
- `testing_guidelines`: Get testing strategies.
- `architecture_patterns`: Get architectural recommendations.
- `ops_deployment_principles`: Get DevOps and deployment advice.
- `security_checklist`: Get security checklists.
