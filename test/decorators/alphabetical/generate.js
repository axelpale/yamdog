const yamdog = require('../../../index')
const path = require('path')

yamdog.generate({
  entry: path.resolve(__dirname, 'fixture.js'),
  output: path.resolve(__dirname, 'output.md'),
  title: 'Test document title',
  intro: 'Testing alphabetical sorting of the blocks.',
  decorators: [
    yamdog.decorators.alphabetical({
      intro: ['testdog.introduction'],
      outro: 'testdog.remarks',
      groupCase: true
    })
  ]
})
