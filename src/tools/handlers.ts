import { ConfigLoader } from '../config/index.js';
import { TechnologyRegistry } from '../core/registry.js';
import { ResponseFormatter } from '../core/formatter.js';

export class ToolHandlers {
    private registry: TechnologyRegistry;

    constructor(configLoader: ConfigLoader) {
        this.registry = new TechnologyRegistry(configLoader.getConfig());
    }

    private handleRequest(technologyName: string, query: string, summaryPrefix: string) {
        // We can skip detection since the technology is passed explicitly
        // But we still need to find the config object
        const tech = this.registry.getAllTechnologies().find(t => t.name === technologyName);

        if (!tech) {
            return ResponseFormatter.formatError(`Technology "${technologyName}" not found in configuration.`);
        }

        return ResponseFormatter.format(tech, `${summaryPrefix} for ${tech.name}`);
    }

    public refactorAdvice(args: { technology: string; query: string }) {
        return this.handleRequest(args.technology, args.query, 'Refactoring advice');
    }

    public technologyBestPractices(args: { technology: string; query: string }) {
        return this.handleRequest(args.technology, args.query, 'Best practices');
    }

    public testingGuidelines(args: { technology: string; query: string }) {
        return this.handleRequest(args.technology, args.query, 'Testing guidelines');
    }

    public architecturePatterns(args: { technology: string; query: string }) {
        return this.handleRequest(args.technology, args.query, 'Architecture patterns');
    }

    public opsDeploymentPrinciples(args: { technology: string; query: string }) {
        return this.handleRequest(args.technology, args.query, 'Ops & Deployment principles');
    }

    public securityChecklist(args: { technology: string; query: string }) {
        return this.handleRequest(args.technology, args.query, 'Security checklist');
    }
}
