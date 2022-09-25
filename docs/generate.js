// Generate Yamdog's own documentation.
//
const yamdog = require('../index')
const path = require('path')
const version = require('../package.json').version
const decor = yamdog.decorators

yamdog.generate({
  entry: path.resolve(__dirname, '../index.js'),
  output: path.resolve(__dirname, '..', 'api.md'),
  earmark: {
    yamdog: 'yamdog',
    decorators: 'yamdog.decorators'
  },
  title: 'Yamdog API Docs',
  intro: 'Welcome to Yamdog v' + version + ' API documentation. ' +
    'This document is generated with Yamdog itself, of course. ' +
    'See [docs/generate.js](https://github.com/axelpale/yamdog/' +
    'blob/main/docs/generate.js) for the recipe.\n\n' +
    '![Two bones](docs/yamdog_two_bones.png)',
  decorators: [
    // This decorator orders the blocks alphabetically.
    // Comment out if you want to preserve the order in code.
    decor.alphabetical(),
    // Replace strings with Regular Expressions
    decor.replace([
      {
        // Normalize and style the parameters title.
        pattern: /^param(?:eter)?s?:?/i,
        replacement: '**Parameters:**'
      },
      {
        // Normalize and style the return titles.
        pattern: /^returns?:?/i,
        replacement: '**Returns:**'
      },
      {
        // Normalize and style the example titles.
        pattern: /^example:?/i,
        replacement: '**Example:**'
      },
    ]),
    // Emphasize list items that have only single word.
    decor.italicSingles(),
    // Create alias blocks when a block has multiple names.
    decor.aliases(),
    // Add internal links to names from occurrences in text.
    decor.linkNames(),
    // Convert keywords to links
    decor.linkKeywords({
      'String.prototype.replace':
        'https://developer.mozilla.org/en-US/docs/Web/' +
        'JavaScript/Reference/Global_Objects/String/replace'
    }),
    // Render table of contents to blocks
    decor.toc({
      title: '<strong>Contents:</strong>'
    }),
    // Extend every block with a link to its source code.
    decor.sourceLinks({
      basePath: path.resolve(__dirname, '..'),
      baseUrl: 'https://github.com/axelpale/yamdog/blob/main/'
    }),
    // Add a back-top link at the bottom block.
    decor.backTopLinks(),
  ]
})
