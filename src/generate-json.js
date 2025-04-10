import { promises as fs } from "fs";
import path from "path";
import { goenamesFiles, originalDir, jsonDir } from "./vars.js";

const startsWithIgnore = [
  "#",
  "CountryCode",
];

const fieldFloats = [
  "gmtOffset",
  "dstOffet",
  "offset"
];

const fieldsCsv = [
  "languages",
  "neighbours",
];

const fieldInt = [
  "geonameId",
];

async function parseTSV(data, headers) {
  const lines = data.split("\n").filter(line => {
    const trimmedLine = line.trim();
    return trimmedLine !== "" && !startsWithIgnore.some(prefix => trimmedLine.startsWith(prefix));
  });

  return lines.map(line => {
    const values = line.split("\t");
    return headers.reduce((obj, header, index) => {
      const val = values[index] ? values[index].trim() : null;
      if (fieldFloats.includes(header)) {
        obj[header] = parseFloat(val);
      } else if (fieldsCsv.includes(header)) {
        obj[header] = val ? val.split(",") : [];
      } else if (fieldInt.includes(header)) {
        obj[header] = parseInt(val, 10);
      } else {
        obj[header] = val;
      }
      return obj;
    }, {});
  });
}

async function writeContinentCodes() {
  const continentCodes = [
    { code: "AF", name: "Africa", geonameId: 6255146 },
    { code: "AS", name: "Asia", geonameId: 6255147 },
    { code: "EU", name: "Europe", geonameId: 6255148 },
    { code: "NA", name: "North America", geonameId: 6255149 },
    { code: "OC", name: "Oceania", geonameId: 6255151 },
    { code: "SA", name: "South America", geonameId: 6255150 },
    { code: "AN", name: "Antarctica", geonameId: 6255152 }
  ];

  const destPath = path.join(jsonDir, "continent-codes.json");
  try {
    await fs.writeFile(destPath, JSON.stringify(continentCodes, null, 2), "utf8");
    console.log("🟢 continent-codes.json");
  } catch (error) {
    console.error("🛑 Error writing continent-codes.json:", error);
  }
}

async function processFile(file) {
  const srcPath = path.join(originalDir, file.src);
  const destPath = path.join(jsonDir, file.jsonFilename);

  try {
    const data = await fs.readFile(srcPath, "utf8");
    const records = await parseTSV(data, file.headers);
    await fs.writeFile(destPath, JSON.stringify(records, null, 2), "utf8");
    console.log(`🟢 ${file.jsonFilename}`);
  } catch (error) {
    console.error(`🛑 Error processing ${file.src}:`, error);
  }
}

(async () => {
  await fs.mkdir(jsonDir, { recursive: true });
  await writeContinentCodes();
  for (const file of goenamesFiles.filter((f) => f.src)) {
    await processFile(file);
  }
})();
