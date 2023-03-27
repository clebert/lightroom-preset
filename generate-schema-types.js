import {compile} from 'json-schema-to-typescript';
import {readFile, writeFile} from 'node:fs/promises';

const typesDelimitation = `// Auto-generated types`;

const schemaData = (
  await readFile(`./src/schema.ts`, {encoding: `utf-8`})
).split(typesDelimitation)[0];

if (!schemaData) {
  throw new Error(`Invalid schema data.`);
}

const schema = eval(
  schemaData.replace(`export const schema = {`, `({`).replace(`};\n`, `})`),
);

const typesData = await compile(schema, `CameraRawSettings`, {
  bannerComment: ``,
  style: JSON.parse(await readFile(`.prettierrc.json`, {encoding: `utf-8`})),
});

await writeFile(
  `./src/schema.ts`,
  schemaData + typesDelimitation + `\n\n` + typesData,
);
