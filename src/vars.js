const path = require("path");

const goenamesFiles = [
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

const geonamesBaseUrl = "https://download.geonames.org/export/dump/";
const originalDirRel = "data/original";
const originalDir = path.resolve(__dirname, "..", originalDirRel);

const dataDirRel = "data";
const dataDir = path.resolve(__dirname, "..", dataDirRel);
const jsonDir = path.join(dataDir, 'json');

module.exports = {
    goenamesFiles,
    geonamesBaseUrl,
    originalDirRel,
    originalDir,
    dataDirRel,
    dataDir,
    jsonDir
};