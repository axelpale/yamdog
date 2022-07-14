// Test by generating Yamdog's own documentation.

const yamdog = require('../index')
const path = require('path')

const modulePath = path.resolve(__dirname, '..')
const tree = yamdog.parse({
  earmark: 'yamdog',
  path: modulePath
})

const output = yamdog.render(tree, {
  title: 'Yamdog API Docs',
  intro: 'Welcome to yamdog API documentation.'
})

console.log(output)
