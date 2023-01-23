// Testing

const yamdog = require('../../index')
const path = require('path')

yamdog.generate({
  entry: path.resolve(__dirname, 'fixture.js'),
  output: path.resolve(__dirname, 'output.md'),
  earmark: '@@', // test custom earmark
  title: 'Test document title',
  intro: 'Test document intro.'
})
