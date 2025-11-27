import { ConfigLoader } from './dist/config/index.js';
import { ToolHandlers } from './dist/tools/handlers.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configDir = path.join(__dirname, 'config');
const configLoader = new ConfigLoader(configDir);
const toolHandlers = new ToolHandlers(configLoader);

console.log('Testing refactor_advice with explicit technology...');
try {
    const result = toolHandlers.refactorAdvice({ technology: 'React', query: 'MyComponent' });
    console.log(JSON.stringify(result, null, 2));
    if (result.technology === 'React') {
        console.log('SUCCESS: Handled React refactor advice');
    } else {
        console.error('FAILURE: Result technology mismatch');
        process.exit(1);
    }
} catch (e) {
    console.error('FAILURE:', e);
    process.exit(1);
}

console.log('Testing invalid technology...');
try {
    const result = toolHandlers.refactorAdvice({ technology: 'InvalidTech', query: 'foo' });
    console.log(JSON.stringify(result, null, 2));
    if (result.error) {
        console.log('SUCCESS: Handled invalid technology');
    } else {
        console.error('FAILURE: Should have errored for invalid technology');
        process.exit(1);
    }
} catch (e) {
    console.error('FAILURE:', e);
    process.exit(1);
}
