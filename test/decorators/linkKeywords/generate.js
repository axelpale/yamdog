const yamdog = require('../../../index')
const path = require('path')

yamdog.generate({
  entry: path.resolve(__dirname, 'fixture.js'),
  output: path.resolve(__dirname, 'output.md'),
  title: 'Test document title',
  intro: 'Keywords in doc intro should not be decorated: doghouse.',
  decorators: [
    yamdog.decorators.linkNames(),
    yamdog.decorators.linkKeywords({
      'doghouse': 'https://www.example.com'
    })
  ]
})
