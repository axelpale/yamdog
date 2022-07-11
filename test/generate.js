// Test by generating Yadog's own documentation.

const yadog = require('../index')
const path = require('path')

yadog.generate({
  entry: path.resolve(__dirname, '..'),
  output: path.resolve(__dirname, '..', 'API.md'),
  name: 'yadog',
  title: 'Yadog API Docs',
  intro: 'Welcome to Yadog documentation.'
})
