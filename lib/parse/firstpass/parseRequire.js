const expressions = require('../../expressions')
const path = require('path')
const fs = require('fs')

module.exports = (mod, parseModule) => {
  // Converts module object to array of doc blocks.
  // Responsible of normalising the given path and
  // of finding and reading the intended module file.
  //
  // Parameters
  //   mod, a RequireModule object with props
  //     earmark
  //       string, the earmark signature
  //     path
  //       required path, a dir or file path.
  //   parseModule
  //     function, to prevent cyclic require
  //
  // Return
  //   array of 1st degree doc block objects { name, signature, lines }
  //

  // First, try to normalise the path to a filepath.
  let indexpath
  try {
    // Inspect the path
    const modstat = fs.statSync(mod.path) // throws if not found
    if (modstat.isDirectory()) {
      indexpath = path.join(mod.path, 'index.js')
    } else if (modstat.isFile()) {
      indexpath = mod.path
    } else {
      // Is a valid path but not a dir or file. A symlink?
      console.warn('Warning: skipped a symbolic module path ' + mod.path)
      return []
    }
  } catch (e) {
    // No such path. Probably needs '.js'.
    indexpath = mod.path + '.js'
  }

  // Then try to read the file contents.
  let code
  try {
    code = fs.readFileSync(indexpath, { encoding: 'utf-8' })
  } catch (e) {
    // The file is not readable.
    console.warn('Warning: cannot read module at ' + indexpath)
    return []
  }

  const lines = code.split(expressions.lineEnd)
  return parseModule(lines, {
    earmark: mod.earmark,
    dir: path.dirname(indexpath),
    file: indexpath
  })
}
