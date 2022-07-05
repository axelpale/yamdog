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

  // TODO Find out if directory or file
  // let indexpath

  // Read the code
  const indexpath = path.join(mod.path, 'index.js')
  const indexdata = fs.readFileSync(indexpath, { encoding: 'utf-8' })

  // Parse and render to string
  return indexToDoc(indexdata, mod)
}
