// Test by generating Yadog's own documentation.

const yadog = require('../index')
const path = require('path')

yadog.generate({
  modules: [
    {
      title: 'Yadog API Docs',
      intro: 'Welcome to Yadog documentation.',
      name: 'yadog',
      path: path.resolve(__dirname, '..')
    }
  ],
  target: path.resolve(__dirname, '..', 'API.md')
})
