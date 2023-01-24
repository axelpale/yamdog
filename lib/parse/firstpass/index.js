const parseModule = require('./parseModule')
const parseRequire = require('./parseRequire')

module.exports = (mod) => {
  // First parsing pass. Extract the units to document and
  // their comment blocks.
  //
  // Parameters:
  //   mod
  //     object with props:
  //       earmark
  //         string, the earmark signature
  //       names
  //         an object of string
  //       path
  //         string, absolute file or directory path to the module
  //
  // Return
  //   array of 1st degree doc block objects
  //   .. { signatures, lines, file }
  //
  return parseRequire({
    earmark: mod.earmark,
    names: mod.names,
    path: mod.path,
    log: []
  }, parseModule)
}
