const firstpass = require('./firstpass')

module.exports = (mod) => {
  // yadog.parse(mod)
  //
  // Parse a tree from code.
  //
  // Parameters:
  //   mod
  //     name
  //       string, module name
  //     path
  //       string, absolute file path to the module
  //
  // Return
  //   a DocTree
  //

  const tree = firstpass(mod)

  return tree
}
