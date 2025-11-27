import { Config } from './types.js';

export const defaultConfig: Config = {
    technologies: [
        {
            name: 'React',
            keywords: ['react', 'jsx', 'tsx', 'hook', 'component'],
            bestPractices: [
                {
                    id: 'react-hooks-deps',
                    title: 'Exhaustive Deps',
                    description: 'Always include all dependencies in useEffect and useCallback dependency arrays.',
                },
                {
                    id: 'react-memo',
                    title: 'Memoization',
                    description: 'Use React.memo, useMemo, and useCallback only when necessary to prevent expensive re-renders.',
                },
            ],
            checklists: {
                basic: [
                    'Components are small and focused',
                    'Props are typed (TypeScript or PropTypes)',
                    'State is managed appropriately (local vs global)',
                ],
                advanced: [
                    'Performance profiling with React DevTools',
                    'Accessibility (a11y) checks passed',
                    'Error boundaries implemented',
                ],
            },
            recommendedTests: [
                'Unit tests for utility functions',
                'Component tests with React Testing Library',
                'E2E tests for critical flows',
            ],
            commonMistakes: [
                'Mutating state directly',
                'Overusing useEffect',
                'Prop drilling (use Context or Composition instead)',
            ],
            examplePatterns: [
                'Container/Presentational pattern',
                'Custom Hooks for logic reuse',
                'Compound Components',
            ],
            references: [
                'https://react.dev/learn',
                'https://react.dev/reference/react',
            ],
        },
        {
            name: 'Kubernetes',
            keywords: ['k8s', 'kubernetes', 'pod', 'deployment', 'service', 'kubectl'],
            bestPractices: [
                {
                    id: 'k8s-resources',
                    title: 'Resource Limits',
                    description: 'Always define requests and limits for CPU and Memory.',
                },
                {
                    id: 'k8s-liveness',
                    title: 'Probes',
                    description: 'Configure Liveness and Readiness probes for all services.',
                },
            ],
            checklists: {
                basic: [
                    'Dockerfile follows best practices (small image, non-root user)',
                    'Deployment has replicas > 1 for HA',
                    'Service type is appropriate (ClusterIP vs LoadBalancer)',
                ],
                advanced: [
                    'PodDisruptionBudgets configured',
                    'NetworkPolicies to restrict traffic',
                    'HPA (Horizontal Pod Autoscaler) enabled',
                ],
            },
            recommendedTests: [
                'Lint manifests with kubeval or kube-score',
                'Smoke tests after deployment',
            ],
            commonMistakes: [
                'Using "latest" tag in production',
                'Running containers as root',
                'Missing resource quotas',
            ],
            examplePatterns: [
                'Sidecar pattern',
                'Ambassador pattern',
                'Adapter pattern',
            ],
            references: [
                'https://kubernetes.io/docs/concepts/configuration/overview/',
                'https://cheatsheet.kubernetes.io/',
            ],
        },
    ],
};
