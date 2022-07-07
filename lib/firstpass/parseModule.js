const path = require('path')
const expressions = require('../expressions')
const parseRequire = require('./parseRequire')
const trimDocLine = require('./trimDocLine')

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
  const signaturePattern = expressions.callSignature(mod.name)

  // Collect all found blocks here
  const blocks = []

  // Collect individual doc block lines using a state machine
  let state = 'code' // code | doc
  let blockLines = []
  // Collect block signature, e.g. function call signature
  let blockSignature = ''

  lines.forEach((line) => {
    // Match the line
    const foundComment = line.match(expressions.comment)
    const foundReq = line.match(expressions.exportsRequire)
    const foundModReq = line.match(expressions.moduleRequire)

    // Handle state change
    if (state === 'code') {
      if (foundComment) {
        const isDocBlock = line.match(signaturePattern)
        if (isDocBlock) {
          // Begin a doc block
          state = 'doc'
          // Capture call signature
          blockSignature = isDocBlock[1]
          // Line handled; do not include signature in block lines
          return
        }
        // Just some normal comment between code.
        // No state change.
      }
    }
    if (state === 'doc') {
      if (!foundComment) {
        // Comment block ends.
        // End of doc block.
        blocks.push({
          name: mod.name,
          signature: blockSignature,
          lines: blockLines
        })
        blockLines = []
        state = 'code'
      }
      // A new line of doc
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
        // Module name is passed forward.
        const moduleName = mod.name
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
        blockLines.push(trimDocLine(line))
      }
      // how do we got here
    }

    // line is handled
  })

  return blocks
}
