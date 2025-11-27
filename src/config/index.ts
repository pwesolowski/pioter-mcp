import fs from 'fs';
import path from 'path';
import os from 'os';
import yaml from 'js-yaml';
import { Config, ConfigSchema, TechnologyConfig } from './types.js';
import { defaultConfig } from './defaults.js';

export class ConfigLoader {
    private config: Config;

    constructor() {
        this.config = { ...defaultConfig };
        this.loadAllConfigs();
        this.watchConfig();
    }

    public getConfig(): Config {
        return this.config;
    }

    private loadAllConfigs() {
        console.error('Loading configuration...');
        this.config = { ...defaultConfig }; // Reset to defaults

        // 1. Load Home Config (~/.pioter/rules.yaml or .json)
        const homeDir = os.homedir();
        this.loadFromDir(path.join(homeDir, '.pioter'));

        // 2. Load Project Config (CWD/.pioter/rules.yaml or .json)
        const cwd = process.cwd();
        this.loadFromDir(path.join(cwd, '.pioter'));

        console.error('Configuration loaded successfully.');
    }

    private loadFromDir(dir: string) {
        if (!fs.existsSync(dir)) return;

        const files = ['rules.yaml', 'rules.yml', 'rules.json'];
        for (const file of files) {
            const filePath = path.join(dir, file);
            if (fs.existsSync(filePath)) {
                console.error(`Loading config from ${filePath}`);
                this.loadConfigFile(filePath);
            }
        }
    }

    private loadConfigFile(filePath: string) {
        try {
            if (!fs.existsSync(filePath)) return;

            const fileContent = fs.readFileSync(filePath, 'utf-8');
            let parsedConfig: any;

            if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
                parsedConfig = yaml.load(fileContent);
            } else {
                parsedConfig = JSON.parse(fileContent);
            }

            // Handle both array of technologies (legacy/simple) or full config object
            let technologies: any[] = [];
            if (Array.isArray(parsedConfig)) {
                technologies = parsedConfig;
            } else if (parsedConfig.technologies) {
                technologies = parsedConfig.technologies;
            } else if (parsedConfig.mcpServers) {
                // Ignore mcpServers config if accidentally loaded
                return;
            }

            // Merge technologies
            const mergedTechs = [...this.config.technologies];

            if (Array.isArray(technologies)) {
                technologies.forEach((userTech: any) => {
                    const index = mergedTechs.findIndex(t => t.name === userTech.name);
                    if (index !== -1) {
                        // Merge existing technology (simple overwrite for now, could be deep merge)
                        mergedTechs[index] = { ...mergedTechs[index], ...userTech };
                    } else {
                        // Add new technology
                        mergedTechs.push(userTech);
                    }
                });
            }

            this.config.technologies = mergedTechs;

        } catch (error) {
            console.error(`Error loading configuration from ${filePath}:`, error);
        }
    }

    private watchConfig() {
        // Watch logic could be updated to watch home/cwd .pioter dirs if needed
        // For now, we'll leave it empty or implement watching for .pioter dirs later
    }
}
