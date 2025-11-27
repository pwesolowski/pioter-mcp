import { ConfigLoader } from './dist/config/index.js';
import { ToolHandlers } from './dist/tools/handlers.js';
import path from 'path';

const configDir = path.join(process.cwd(), 'config');
const configLoader = new ConfigLoader(configDir);
const toolHandlers = new ToolHandlers(configLoader);

console.log('Testing refactor_advice for React...');
const result = toolHandlers.refactorAdvice({ query: 'React component' });
console.log(JSON.stringify(result, null, 2));

if (result.technology === 'React') {
    console.log('SUCCESS: Detected React');
} else {
    console.error('FAILURE: Did not detect React');
    process.exit(1);
}

console.log('Testing unknown technology...');
const errorResult = toolHandlers.refactorAdvice({ query: 'UnknownTech' });
console.log(JSON.stringify(errorResult, null, 2));

if (errorResult.error) {
    console.log('SUCCESS: Handled unknown technology');
} else {
    console.error('FAILURE: Did not handle unknown technology');
    process.exit(1);
}
