// Test by generating Yamdog's own documentation.

const yamdog = require('../index')
const path = require('path')

yamdog.generate({
  entry: path.resolve(__dirname, '../index.js'),
  output: path.resolve(__dirname, 'output.md'),
  earmark: 'yamdog',
  title: 'Yamdog Test Docs',
  intro: 'Welcome to Yamdog test documentation.',
  decorators: [
    yamdog.decorators.linkKeywords({
      'decorator': '#yamdogdecorators',
      'yamdog': '#yamdog'
    })
  ]
})
