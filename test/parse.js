// Test by generating Yadog's own documentation.

const yadog = require('../index')
const path = require('path')

const modulePath = path.resolve(__dirname, '..')
const tree = yadog.parse({
  earmark: 'yadog',
  path: modulePath
})

console.dir(tree, { depth: null })
