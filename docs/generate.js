// Generate Yamdog's own documentation.
//
const yamdog = require('../index')
const path = require('path')
const version = require('../package.json').version
const githubUrl = 'https://' +
  'github.com/axelpale/yamdog/' +
  'blob/main/docs/generate.js'

yamdog.generate({
  entry: path.resolve(__dirname, '../index.js'),
  output: path.resolve(__dirname, '..', 'api.md'),
  earmark: 'yamdog',
  title: 'Yamdog API Docs',
  intro: 'Welcome to Yamdog v' + version + ' API documentation. ' +
    'This document is generated with Yamdog itself, of course. ' +
    'See [docs/generate.js](' + githubUrl + ') for the recipe.',
  decorators: [
    yamdog.decorators.alphabetical(),
    yamdog.decorators.replace([
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
    yamdog.decorators.italicSingles(),
    yamdog.decorators.aliases(),
    yamdog.decorators.linkNames(),
    yamdog.decorators.linkKeywords({
      'String.prototype.replace':
        'https://developer.mozilla.org/en-US/docs/Web/' +
        'JavaScript/Reference/Global_Objects/String/replace'
    }),
    yamdog.decorators.toc(),
    yamdog.decorators.sourceLinks({
      basePath: path.resolve(__dirname, '..'),
      baseUrl: 'https://github.com/axelpale/yamdog/blob/main/'
    }),
    yamdog.decorators.backTopLinks(),
  ]
})
