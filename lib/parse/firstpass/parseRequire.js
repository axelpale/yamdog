const expressions = require('../../expressions')
const path = require('path')
const fs = require('fs')

module.exports = (mod, parseModule) => {
  // Converts module object to array of doc blocks.
  //
  // Parameters
  //   mod, a RequireModule object with props
  //     name
  //       exported module name
  //     path
  //       required path
  //   parseModule
  //     function, to prevent cyclic require
  //
  // Return
  //   array of doc block
  //

  try {
    // Inspect the path
    const modstat = fs.statSync(mod.path) // throws if not found

    if (modstat.isDirectory()) {
      // Search for docs in module index
      let code
      try {
        const indexpath = path.join(mod.path, 'index.js')
        code = fs.readFileSync(indexpath, { encoding: 'utf-8' })
      } catch (e) {
        // No index. Stop.
        // console.error(idxerr)
        return []
      }

      // Index found
      try {
        const lines = code.split(expressions.lineEnd)
        return parseModule(lines, {
          name: mod.name,
          path: mod.path
        })
      } catch (e) {
        // Unknown error
        console.error(e)
        return []
      }
    }
  } catch (e) {
    // No such file. Probably needs '.js'
  }

  // Not a directory. Probably a file. Read file contents.
  // NOTE might break for very large files.
  const filepath = mod.path + '.js'

  try {
    const filestat = fs.statSync(filepath)

    if (filestat.isFile()) {
      // File found. Read and parse.
      const code = fs.readFileSync(filepath, { encoding: 'utf-8' })
      const lines = code.split(expressions.lineEnd)
      return parseModule(lines, {
        name: mod.name,
        path: filepath
      })
    }
  } catch (e) {
    // Not a directory and not a file.
    // Return default.
  }

  return []
}
