import { promises as fs } from "fs";
import path from "path";
import { goenamesFiles, jsonDir, dataDir } from "./vars.js";
import { determineFieldTypes, generateJSDocComments, loadJsonFile } from "./utils.js";

const esmDir = path.join(dataDir, "esm");

async function generateESModule(file) {
  try {
    const records = await loadJsonFile(jsonDir, file.jsonFilename);

    // Determine the type of each field
    const fieldTypes = determineFieldTypes(records);

    // Generate ES module code with JSDoc comments
    const typeDefinition = generateJSDocComments(file.interfaceName, fieldTypes);
    const dataExport = `/** @type {${file.interfaceName}[]} */\nexport const ${file.dataName} = ${JSON.stringify(records, null, 2)};\n\n`;

    const output = `${typeDefinition}${dataExport}`;
    const outputFile = `${file.filename}.mjs`;
    const outputPath = path.join(esmDir, outputFile);

    await fs.writeFile(outputPath, output, "utf8");
    console.log(`🟢 ${outputFile}`);
  } catch (error) {
    console.error(`🛑 Error processing ${file.jsonFilename}:`, error);
  }
}

(async () => {
  await fs.mkdir(esmDir, { recursive: true });

  for (const file of goenamesFiles) {
    await generateESModule(file);
  }
})();
