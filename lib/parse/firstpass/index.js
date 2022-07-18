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
  //       path
  //         string, absolute file or directory path to the module
  //
  // Return
  //   array of 1st degree doc block objects
  //   .. { signatures, lines, file }
  //
  return parseRequire({
    earmark: mod.earmark,
    path: mod.path,
    log: []
  }, parseModule)
}
