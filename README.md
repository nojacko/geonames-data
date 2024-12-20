# geonames-data

Scripts to download [geonames.org](https://geonames.org) data and convert to other formats.

## Good To Know

The data from geonames.org is not committed to this repo.

This project gives you scripts to download and convert the original data into formats more friendly to JavaScript/TypeScript projects.

You should copy only the generated files you need into your projects and update on your own schedule.

## Supported Geonames Data Dumps

See: <https://download.geonames.org/export/dump/>

The following files are downloaded and converted.

- `countryInfo.txt`
- `timeZones.txt`
- `admin1CodesASCII.txt`
- `admin2Codes.txt`
- Continent codes are also generated.

## Usage

```zsh
npm install
npm run download
```

## Generate Formats

### JSON (Required to generate other formats)

Generate `.json` files in `data/json`.

```zsh
npm run generate-json
```

### TypeScript

Generate `.ts` files with interfaces in `data/typescript`.

```zsh
npm run generate-ts
```

### ECMAScript / ESM

Generate `.mjs` files with JSDoc comments in `data/esm`.

```zsh
npm run generate-esm
```

### CommonJS

Generate `.js` files with JSDoc comments in `data/cjs`.

```zsh
npm run generate-cjs
```

### ...everything

Generate all file formats.

```zsh
npm run generate-all
```
