# Example Conversation

**User**: What are the best practices for React hooks?

**Pioter (technology_best_practices)**:
```json
{
  "technology": "React",
  "summary": "Best practices for React",
  "bestPractices": [
    {
      "id": "react-hooks-deps",
      "title": "Exhaustive Deps",
      "description": "Always include all dependencies in useEffect and useCallback dependency arrays."
    },
    {
      "id": "react-memo",
      "title": "Memoization",
      "description": "Use React.memo, useMemo, and useCallback only when necessary to prevent expensive re-renders."
    }
  ],
  "checklists": {
    "basic": [
      "Components are small and focused",
      "Props are typed (TypeScript or PropTypes)",
      "State is managed appropriately (local vs global)"
    ],
    "advanced": [
      "Performance profiling with React DevTools",
      "Accessibility (a11y) checks passed",
      "Error boundaries implemented"
    ]
  ],
  "recommendedTests": [
    "Unit tests for utility functions",
    "Component tests with React Testing Library",
    "E2E tests for critical flows"
  ],
  "commonMistakes": [
    "Mutating state directly",
    "Overusing useEffect",
    "Prop drilling (use Context or Composition instead)"
  ],
  "examplePatterns": [
    "Container/Presentational pattern",
    "Custom Hooks for logic reuse",
    "Compound Components"
  ],
  "references": [
    "https://react.dev/learn",
    "https://react.dev/reference/react"
  ]
}
```

**User**: Give me a security checklist for Kubernetes.

**Pioter (security_checklist)**:
```json
{
  "technology": "Kubernetes",
  "summary": "Security checklist for Kubernetes",
  "bestPractices": [
    {
      "id": "k8s-resources",
      "title": "Resource Limits",
      "description": "Always define requests and limits for CPU and Memory."
    },
    {
      "id": "k8s-liveness",
      "title": "Probes",
      "description": "Configure Liveness and Readiness probes for all services."
    }
  ],
  "checklists": {
    "basic": [
      "Dockerfile follows best practices (small image, non-root user)",
      "Deployment has replicas > 1 for HA",
      "Service type is appropriate (ClusterIP vs LoadBalancer)"
    ],
    "advanced": [
      "PodDisruptionBudgets configured",
      "NetworkPolicies to restrict traffic",
      "HPA (Horizontal Pod Autoscaler) enabled"
    ]
  },
  ...
}
```
