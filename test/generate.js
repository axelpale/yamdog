// Test by generating Yamdog's own documentation.

const yamdog = require('../index')
const path = require('path')
const version = require('../package.json').version

yamdog.generate({
  entry: path.resolve(__dirname, '../index.js'),
  output: path.resolve(__dirname, '..', 'api.md'),
  earmark: 'yamdog',
  title: 'Yamdog API Docs',
  intro: 'Welcome to Yamdog v' + version + ' API documentation.',
  decorators: [
    yamdog.decorators.alphabetical(),
    yamdog.decorators.replace([
      {
        pattern: /^param(?:eter)?s?:?/i,
        replacement: '**Parameters:**'
      },
      {
        pattern: /^returns?:?/i,
        replacement: '**Returns:**'
      }
    ]),
    yamdog.decorators.aliases(),
    yamdog.decorators.linkNames(),
    yamdog.decorators.toc(),
    yamdog.decorators.sourceLinks({
      basePath: path.resolve(__dirname, '..'),
      baseUrl: 'https://github.com/axelpale/yamdog/blob/main/'
    }),
  ]
})
