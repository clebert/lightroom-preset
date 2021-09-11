// @ts-check

const std = require('@onecmd/standard-plugins');
const nodeVersion = '16';

/** @type {readonly import('onecmd').Plugin[]} */
const plugins = [
  std.babel(),
  std.editorconfig(),
  std.eslint(),
  std.git(),
  std.github({nodeVersion}),
  std.jest({coverage: true}),
  std.node(nodeVersion),
  std.npm(),
  std.prettier(),
  std.typescript('node', 'package'),
  std.vscode({showFilesInEditor: false}),

  {
    dependencies: [
      {
        type: 'managed',
        path: '.prettierrc.json',
        is: std.isObject,
        update: (content) => ({...content, printWidth: 120}),
      },
    ],
  },
];

module.exports = plugins;
