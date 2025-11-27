import { z } from 'zod';

export const BestPracticeSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.string().optional(),
});

export const ChecklistSchema = z.object({
    basic: z.array(z.string()),
    advanced: z.array(z.string()),
});

export const TechnologyConfigSchema = z.object({
    name: z.string(),
    keywords: z.array(z.string()),
    bestPractices: z.array(BestPracticeSchema),
    checklists: ChecklistSchema,
    recommendedTests: z.array(z.string()),
    commonMistakes: z.array(z.string()),
    examplePatterns: z.array(z.string()),
    references: z.array(z.string()),
});

export const ConfigSchema = z.object({
    technologies: z.array(TechnologyConfigSchema),
});

export type BestPractice = z.infer<typeof BestPracticeSchema>;
export type Checklist = z.infer<typeof ChecklistSchema>;
export type TechnologyConfig = z.infer<typeof TechnologyConfigSchema>;
export type Config = z.infer<typeof ConfigSchema>;
