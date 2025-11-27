import { TechnologyConfig } from '../config/types.js';

export interface StandardResponse {
    technology: string;
    summary: string;
    bestPractices: Array<{ id: string; title: string; description: string }>;
    checklists: {
        basic: string[];
        advanced: string[];
    };
    recommendedTests: string[];
    commonMistakes: string[];
    examplePatterns: string[];
    references: string[];
}

export class ResponseFormatter {
    public static format(
        tech: TechnologyConfig,
        summary: string,
        filter?: {
            category?: string;
            practiceIds?: string[];
        }
    ): StandardResponse {
        let bestPractices = tech.bestPractices;

        if (filter?.category) {
            bestPractices = bestPractices.filter(bp => bp.category === filter.category);
        }

        if (filter?.practiceIds) {
            bestPractices = bestPractices.filter(bp => filter.practiceIds?.includes(bp.id));
        }

        return {
            technology: tech.name,
            summary: summary,
            bestPractices: bestPractices.map(bp => ({
                id: bp.id,
                title: bp.title,
                description: bp.description,
            })),
            checklists: tech.checklists,
            recommendedTests: tech.recommendedTests,
            commonMistakes: tech.commonMistakes,
            examplePatterns: tech.examplePatterns,
            references: tech.references,
        };
    }

    public static formatError(message: string): any {
        return {
            error: true,
            message: message,
        };
    }
}
