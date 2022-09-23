const yamdog = require('../../../index')
const path = require('path')

yamdog.generate({
  entry: path.resolve(__dirname, 'fixture.js'),
  output: path.resolve(__dirname, '..', '..', 'output.md'),
  earmark: 'testdog',
  title: 'Test document title',
  intro: 'Test document intro.',
  decorators: [
    yamdog.decorators.alphabetical({
      groupCase: true
    }),
    yamdog.decorators.toc({
      title: 'Contents:'
    })
  ]
})
