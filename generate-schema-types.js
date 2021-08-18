// @ts-check

const {readFileSync} = require('fs');
const {writeFile} = require('fs/promises');
const {join} = require('path');
const {compile} = require('json-schema-to-typescript');
const typesDelimitation = '// Auto-generated types';

const schemaData = readFileSync(join(__dirname, 'src/schema.ts'), {
  encoding: 'utf-8',
}).split(typesDelimitation)[0];

const schema = eval(schemaData.replace('export const schema = {', '({').replace('};\n', '})'));

compile(schema, 'CameraRawSettings', {
  bannerComment: '',
  style: {
    bracketSpacing: false,
    printWidth: 120,
    quoteProps: 'consistent',
    singleQuote: true,
  },
})
  .then(async (typesData) =>
    writeFile(join(__dirname, 'src/schema.ts'), schemaData + typesDelimitation + '\n\n' + typesData)
  )
  .catch(console.error.bind(console));
