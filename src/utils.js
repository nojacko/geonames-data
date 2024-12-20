function determineFieldTypes(records) {
    const fieldTypes = {};
    records.forEach(record => {
        Object.keys(record).forEach(key => {
            const value = record[key];
            const type = Array.isArray(value) ? 'string[]' : typeof value;

            if (!fieldTypes[key]) {
                fieldTypes[key] = new Set();
            }

            if (value === null) {
                fieldTypes[key].add('null');
            } else {
                fieldTypes[key].add(type);
            }
        });
    });
    return fieldTypes;
}

function generateJSDocComments(interfaceName, fieldTypes) {
    const fields = Object.keys(fieldTypes).map(key => {
        const types = Array.from(fieldTypes[key]).join(' | ');
        return ` * @property {${types}} ${key}`;
    }).join('\n');

    return `/**\n * @typedef {Object} ${interfaceName}\n${fields}\n */\n\n`;
}

module.exports = { determineFieldTypes, generateJSDocComments };
