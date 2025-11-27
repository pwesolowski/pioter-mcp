import { ConfigLoader } from './dist/config/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock process.cwd to be the project root where .pioter/rules.yaml is
const configDir = path.join(__dirname, 'config');
const configLoader = new ConfigLoader(configDir);

const config = configLoader.getConfig();
const customTech = config.technologies.find(t => t.name === 'CustomTech');

if (customTech) {
    console.log('SUCCESS: Loaded CustomTech from local .pioter/rules.yaml');
    console.log(JSON.stringify(customTech, null, 2));
} else {
    console.error('FAILURE: Did not load CustomTech');
    console.log('Loaded technologies:', config.technologies.map(t => t.name));
    process.exit(1);
}
