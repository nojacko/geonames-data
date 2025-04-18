import { promises as fs } from "fs";
import path from "path";

export function determineFieldTypes(records) {
  const fieldTypes = {};
  records.forEach(record => {
    Object.keys(record).forEach(key => {
      const value = record[key];
      const type = Array.isArray(value) ? "string[]" : typeof value;

      if (!fieldTypes[key]) {
        fieldTypes[key] = new Set();
      }

      if (value === null) {
        fieldTypes[key].add("null");
      } else {
        fieldTypes[key].add(type);
      }
    });
  });
  return fieldTypes;
}

export function generateJSDocComments(interfaceName, fieldTypes) {
  const fields = Object.keys(fieldTypes).map(key => {
    const types = Array.from(fieldTypes[key]).join(" | ");
    return ` * @property {${types}} ${key}`;
  }).join("\n");

  return `/**\n * @typedef {Object} ${interfaceName}\n${fields}\n */\n\n`;
}

export async function loadJsonFile(jsonDir, jsonFilename) {
  const jsonFilePath = path.join(jsonDir, jsonFilename);
  const data = await fs.readFile(jsonFilePath, "utf8");
  return JSON.parse(data);
}
