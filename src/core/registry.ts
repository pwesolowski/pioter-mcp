import { Config, TechnologyConfig } from '../config/types.js';

export class TechnologyRegistry {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    public detectTechnology(query: string): TechnologyConfig | null {
        const normalizedQuery = query.toLowerCase();

        // 1. Exact match on name
        const exactMatch = this.config.technologies.find(
            t => t.name.toLowerCase() === normalizedQuery
        );
        if (exactMatch) return exactMatch;

        // 2. Keyword match
        for (const tech of this.config.technologies) {
            if (tech.keywords.some(keyword => normalizedQuery.includes(keyword.toLowerCase()))) {
                return tech;
            }
        }

        return null;
    }

    public getAllTechnologies(): TechnologyConfig[] {
        return this.config.technologies;
    }
}
