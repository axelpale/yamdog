const path = require('path')
const expressions = require('../expressions')
const parseRequire = require('./parseRequire')

module.exports = (lines, mod) => {
  // Parse a module object.
  //
  // Parameters:
  //   lines
  //     array of strings
  //   mod
  //     module object with props
  //       name
  //         string
  //       path
  //         string, absolute path
  //
  // Return
  //   array of doc blocks
  //

  // Construct regexp for the doc block signature
  // Note JS escapes \\ -> \ and \/ -> /
  const signaturePattern = '^\\s*\/\/ ' + mod.name
  const signature = new RegExp(signaturePattern)

  // Collect all found blocks here
  const blocks = []

  // Collect individual doc block lines using a state machine
  let state = 'code' // code | doc
  let blockLines = []

  lines.forEach((line) => {
    // Match the line
    const foundComment = line.match(expressions.comment)
    const foundReq = line.match(expressions.exportsRequire)
    const foundModReq = line.match(expressions.moduleRequire)

    // Handle state change
    if (state === 'code') {
      if (foundComment) {
        const isDocBlock = line.match(signature)
        if (isDocBlock) {
          // Begin a doc block
          state = 'doc'
        }
      }
    }
    if (state === 'doc') {
      if (!foundComment) {
        // End of doc block
        blocks.push({
          lines: blockLines
        })
        blockLines = []
        state = 'code'
      }
    }

    // Handle state effect
    if (state === 'code') {
      if (foundReq) {
        // An import of another module.
        const moduleName = mod.name + '.' + foundReq[1]
        const relativePath = foundReq[2]
        const absPath = path.resolve(mod.path, relativePath)
        const requiredBlocks = parseRequire({
          name: moduleName,
          path: absPath
        }, module.exports) // hack to prevent cyclic requires
        blocks.push(...requiredBlocks)
        // Line handled
        return
      }

      if (foundModReq) {
        // An import of another module and assign to module.exports.
        const moduleName = mod.name // name does not change
        const relativePath = foundModReq[1]
        const absPath = path.resolve(mod.path, relativePath)
        const requiredBlocks = parseRequire({
          name: moduleName,
          path: absPath
        }, module.exports) // hack to prevent cyclic requires
        blocks.push(...requiredBlocks)
        // Line handled
        return
      }

      // otherwise just some comments or code.
    }

    if (state === 'doc') {
      if (foundComment) {
        // A documentation line
        blockLines.push(line)
      }
      // how do we got here
    }

    // line is handled
  })

  return blocks
}
