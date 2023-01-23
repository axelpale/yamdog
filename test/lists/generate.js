// Testing

const yamdog = require('../../index')
const path = require('path')

yamdog.generate({
  entry: path.resolve(__dirname, 'fixture.js'),
  output: path.resolve(__dirname, 'output.md'),
  names: {
    'testdog': 'testdog',
    'test': 'testdog.test'
  },
  title: 'Yamdog Test Docs',
  intro: 'Test document output',
  decorators: [
    yamdog.decorators.linkNames()
  ]
})
