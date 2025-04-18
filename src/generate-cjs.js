import { promises as fs } from "fs";
import path from "path";
import { goenamesFiles, jsonDir, dataDir } from "./vars.js";
import { determineFieldTypes, generateJSDocComments, loadJsonFile } from "./utils.js";

const cjsDir = path.join(dataDir, "cjs");

async function generateCommonJS(file) {
  try {
    const records = await loadJsonFile(jsonDir, file.jsonFilename);

    // Determine the type of each field
    const fieldTypes = determineFieldTypes(records);

    // Generate CommonJS type definition with JSDoc comments
    const typeDefinition = generateJSDocComments(file.interfaceName, fieldTypes);
    const dataExport = `/** @type {${file.interfaceName}[]} */\nconst ${file.dataName} = ${JSON.stringify(records, null, 2)};\n\nexport { ${file.dataName} };\n`;

    const output = `${typeDefinition}${dataExport}`;
    const outputFile = `${file.filename}.js`;
    const outputPath = path.join(cjsDir, outputFile);

    await fs.writeFile(outputPath, output, "utf8");
    console.log(`🟢 ${outputFile}`);
  } catch (error) {
    console.error(`🛑 Error processing ${file.jsonFilename}:`, error);
  }
}

(async () => {
  await fs.mkdir(cjsDir, { recursive: true });

  for (const file of goenamesFiles) {
    await generateCommonJS(file);
  }
})();
