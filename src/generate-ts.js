const fs = require('fs').promises;
const path = require('path');
const { goenamesFiles, jsonDir, dataDir } = require('./vars');
const { determineFieldTypes, loadJsonFile } = require('./utils');

const tsDir = path.join(dataDir, 'ts');

async function generateTypeScript(file) {
    try {
        const records = await loadJsonFile(jsonDir, file.jsonFilename);

        // Determine the type of each field
        const fieldTypes = determineFieldTypes(records);

        // Generate TypeScript type definition
        const fields = Object.keys(fieldTypes).map(key => {
            const types = Array.from(fieldTypes[key]).join(' | ');
            return `  ${key}: ${types};`;
        }).join('\n');

        const typeDefinition = `export interface ${file.interfaceName} {\n${fields}\n}\n\n`;
        const dataExport = `export const ${file.dataName}: ${file.interfaceName}[] = ${JSON.stringify(records, null, 2)};\n\n`;

        const output = `${typeDefinition}${dataExport}`;
        const outputFile = `${file.filename}.ts`;
        const outputPath = path.join(tsDir, outputFile);

        await fs.writeFile(outputPath, output, 'utf8');
        console.log(`🟢 ${outputFile}`);
    } catch (error) {
        console.error(`🛑 Error processing ${file.jsonFilename}:`, error);
    }
}

(async () => {
    await fs.mkdir(tsDir, { recursive: true });

    for (const file of goenamesFiles) {
        await generateTypeScript(file);
    }
})();
