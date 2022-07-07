// Test by generating Yadog's own documentation.

const yadog = require('../index')
const path = require('path')

const modulePath = path.resolve(__dirname, '..')
const tree = yadog.parse({
  name: 'yadog',
  path: modulePath
})

const output = yadog.render(tree, {
  title: 'Yadog API Docs',
  intro: 'Welcome to yadog API documentation.'
})

console.log(output)
