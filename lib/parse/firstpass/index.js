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
  //       earmark
  //         string, the earmark signature
  //       path
  //         string, absolute directory path to module
  //
  // Return
  //   array of 1st degree doc block objects { signatures, lines }
  //

  // Find if the given path is a directory or a file
  let lstat
  try {
    lstat = fs.lstatSync(mod.path)
  } catch (e) {
    // Does not exist
    throw new Error('File or directory at ' + mod.path + ' does not exist.')
  }

  // If directory, find its module index.js
  let indexpath
  if (lstat.isDirectory()) {
    indexpath = path.join(mod.path, 'index.js')
    try {
      const indexstat = fs.lstatSync(indexpath)
      if (!indexstat.isFile()) {
        throw new Error('Module index at ' + indexpath + ' does not exist.')
      }
    } catch (er) {
      throw new Error('Module index at ' + indexpath + ' does not exist.')
    }
  } else if (lstat.isFile()) {
    indexpath = mod.path
  } else {
    // Something else. A symlink?
    throw new Error('File or directory at ' + mod.path + ' does not exist.')
  }

  // Read the code
  const code = fs.readFileSync(indexpath, { encoding: 'utf-8' })

  const lines = code.split(expressions.lineEnd)

  return parseModule(lines, {
    earmark: mod.earmark,
    path: path.dirname(indexpath)
  })
}
