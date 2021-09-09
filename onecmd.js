// @ts-check

const plugins = require('@onecmd/standard-plugins');
const nodeVersion = '16';

/** @type {import('onecmd').Plugin[]} */
module.exports = [
  plugins.babel(),
  plugins.editorconfig(),
  plugins.eslint(),
  plugins.git(),
  plugins.github({nodeVersion}),
  plugins.jest({coverage: true}),
  plugins.node(nodeVersion),
  plugins.npm(),
  plugins.prettier(),
  plugins.typescript('node', 'package'),
  plugins.vscode({showFilesInEditor: false}),

  {
    dependencies: [
      {
        type: 'object',
        path: '.prettierrc.json',
        generate: (content) => ({...content, printWidth: 120}),
      },
    ],
  },
];
