const path = require('path')
const fs = require('fs')
const parseModule = require('./parseModule')
const expressions = require('../../expressions')

module.exports = (mod) => {
  // First parsing pass. Extract the units to document and
  // their comment blocks.
  //
  // Parameters:
  //   mod
  //     object with props:
  //       name
  //         string
  //       path
  //         string, absolute directory path to module
  //
  // Return
  //   array of doc blocks
  //

  // Read the code
  const indexpath = path.join(mod.path, 'index.js')
  const code = fs.readFileSync(indexpath, { encoding: 'utf-8' })

  const lines = code.split(expressions.lineEnd)

  return parseModule(lines, {
    name: mod.name,
    path: mod.path
  })
}
