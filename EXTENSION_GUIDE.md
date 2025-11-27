# Extending Pioter MCP Server

Pioter is designed to be easily extensible through configuration files. You don't need to modify the code to add new technologies or best practices.

## Adding a New Technology

1. Navigate to the `config/` directory.
2. Open or create `technologies.json`.
3. Add a new entry to the array following this schema:

```json
{
  "name": "MyNewTech",
  "keywords": ["mynewtech", "mnt", "related-term"],
  "bestPractices": [
    {
      "id": "practice-1",
      "title": "Do X",
      "description": "Description of why X is good."
    }
  ],
  "checklists": {
    "basic": ["Check item 1"],
    "advanced": ["Check item 2"]
  },
  "recommendedTests": ["Test type 1"],
  "commonMistakes": ["Mistake 1"],
  "examplePatterns": ["Pattern 1"],
  "references": ["https://example.com"]
}
```

## Hot Reloading

The server automatically watches the `config/` directory. Changes to `technologies.json` are applied immediately without restarting the server.

## Modifying Code

If you need to add new tools or change the core logic:

- **Tools**: Add new tool definitions in `src/index.ts` and implement the logic in `src/tools/handlers.ts`.
- **Core Logic**: Modify `src/core/registry.ts` for detection logic or `src/core/formatter.ts` for output formatting.
