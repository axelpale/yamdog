const path = require('path')
const fs = require('fs')
const indexToDoc = require('./indexToDoc')

module.exports = (mod) => {
  // Parse module and render markdown string.
  //
  // Parameters:
  //   mod
  //     CodeModule object
  //
  // Return
  //   string, in Markdown syntax.
  //

  // Find out if directory or file
  let indexpath

  if (mod.path.endsWith('.js')) {
    indexpath = mod.path
  } else {
    indexpath = path.join(mod.path, 'index.js')
  }

  // Read the code
  const indexdata = fs.readFileSync(indexpath, { encoding: 'utf-8' })

  // Parse and render to string
  return indexToDoc(indexdata, mod)
}
