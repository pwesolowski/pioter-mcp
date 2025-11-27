import { ConfigLoader } from './dist/config/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Test that ConfigLoader initializes without error and loads defaults + local rules
try {
    const configLoader = new ConfigLoader();
    const config = configLoader.getConfig();

    console.log('Loaded technologies:', config.technologies.map(t => t.name));

    // Should have React (default), Java (local .pioter), etc.
    const hasReact = config.technologies.some(t => t.name === 'React');
    const hasJava = config.technologies.some(t => t.name === 'Java');

    if (hasReact && hasJava) {
        console.log('SUCCESS: Loaded defaults and local rules');
    } else {
        console.error('FAILURE: Missing expected technologies');
        process.exit(1);
    }
} catch (e) {
    console.error('FAILURE:', e);
    process.exit(1);
}
