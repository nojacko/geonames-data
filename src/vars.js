import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const goenamesFiles = [
  {
    src: "countryInfo.txt",
    jsonFilename: "country-info.json",
    filename: "country-info",
    interfaceName: "GeonamesCountryInfo",
    dataName: "geonamesCountryInfoData",
    headers: [
      "iso",
      "iso3",
      "isoNumeric",
      "fipsCode",
      "country",
      "capital",
      "areaSqKm",
      "population",
      "continent",
      "tld",
      "currencyCode",
      "currencyName",
      "phone",
      "postalCodeFormat",
      "postalCodeRegex",
      "languages",
      "geonameId",
      "neighbours",
      "equivalentFipsCode"
    ]
  },
  {
    src: "timeZones.txt",
    jsonFilename: "time-zones.json",
    filename: "time-zones",
    interfaceName: "GeonamesTimeZone",
    dataName: "geonamesTimeZones",
    headers: [
      "iso",
      "timeZone",
      "gmtOffsetJan",
      "dstOffetJul",
      "offset"
    ]
  },
  {
    src: "admin1CodesASCII.txt",
    jsonFilename: "admin-1-codes.json",
    filename: "admin-1-codes",
    interfaceName: "GeonamesAdmin1",
    dataName: "geonamesAdmin1Data",
    headers: [
      "code",
      "name",
      "nameAscii",
      "geonameId"
    ]
  },
  {
    src: "admin2Codes.txt",
    jsonFilename: "admin-2-codes.json",
    filename: "admin-2-codes",
    interfaceName: "GeonamesAdmin2",
    dataName: "geonamesAdmin2Data",
    headers: [
      "code",
      "name",
      "nameAscii",
      "geonameId"
    ]
  },
  {
    src: null, // Hard coded in process.js
    jsonFilename: "continent-codes.json",
    filename: "continent-codes",
    headers: [],
    interfaceName: "GeonamesContinent",
    dataName: "geonamesContinents"
  }
];

export const geonamesBaseUrl = "https://download.geonames.org/export/dump/";
export const originalDirRel = "data/original";
export const originalDir = path.resolve(__dirname, "..", originalDirRel);

export const dataDirRel = "data";
export const dataDir = path.resolve(__dirname, "..", dataDirRel);
export const jsonDir = path.join(dataDir, "json");