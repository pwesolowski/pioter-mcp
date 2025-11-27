import { ConfigLoader } from './dist/config/index.js';
import { ToolHandlers } from './dist/tools/handlers.js';
import path from 'path';

const configDir = path.join(process.cwd(), 'config');
const configLoader = new ConfigLoader(configDir);
const toolHandlers = new ToolHandlers(configLoader);

console.log('Testing Kotlin detection...');
const kotlinResult = toolHandlers.refactorAdvice({ query: 'Spring Boot Controller' });
console.log(JSON.stringify(kotlinResult, null, 2));

if (kotlinResult.technology === 'Kotlin') {
    console.log('SUCCESS: Detected Kotlin/Spring');
} else {
    console.error('FAILURE: Did not detect Kotlin/Spring');
    process.exit(1);
}

console.log('Testing Vue.js detection...');
const vueResult = toolHandlers.technologyBestPractices({ query: 'Vue composition api' });
console.log(JSON.stringify(vueResult, null, 2));

if (vueResult.technology === 'Vue.js') {
    console.log('SUCCESS: Detected Vue.js');
} else {
    console.error('FAILURE: Did not detect Vue.js');
    process.exit(1);
}
