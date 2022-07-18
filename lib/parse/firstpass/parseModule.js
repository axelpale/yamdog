const path = require('path')
const expressions = require('../../expressions')
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
  //       earmark
  //         string, the earmark signature
  //       dir
  //         string, absolute directory path of the module
  //       file
  //         string, absolute file path of the module
  //
  // Return
  //   array of 1st degree doc block objects
  //   .. { signatures, lines, file }
  //

  // Prepare a regexp for the doc block signature.
  const signaturePattern = expressions.callSignature(mod.earmark)

  // Collect all found blocks here
  const blocks = []

  // Collect individual doc block lines using a state machine
  let state = 'code' // code | doc
  let blockLines = []
  // Collect block signatures, e.g. function call signatures.
  // There can be multiple signatures, aliases.
  let blockSignatures = []

  lines.forEach((line) => {
    // Match the line
    const foundComment = line.match(expressions.comment)
    const foundExcludedComment = line.match(expressions.excludedComment)
    const foundReq = line.match(expressions.requireModule)
    const foundImport = line.match(expressions.import)
    const foundImportFrom = line.match(expressions.importFrom)
    const foundSignature = line.match(signaturePattern)

    // Handle state change
    if (state === 'code') {
      if (foundComment) {
        if (foundSignature) {
          // Is a doc block. Begin a doc block.
          state = 'doc'
        }
        // Just some normal comment between code.
        // No state change.
      }
    }
    if (state === 'doc') {
      if (!foundComment && !foundExcludedComment) {
        // Comment block ends.
        // End of doc block.
        blocks.push({
          file: mod.file,
          signatures: blockSignatures,
          lines: blockLines
        })
        blockLines = []
        blockSignatures = []
        state = 'code'
      }
      // A new line of doc or an excluded comment within doc.
    }

    // Handle state effect
    if (state === 'code') {
      if (foundReq) {
        // A require of another module.
        const relativePath = foundReq[1]
        const absPath = path.resolve(mod.dir, relativePath)
        const requiredBlocks = parseRequire({
          earmark: mod.earmark,
          path: absPath
        }, module.exports) // hack to prevent cyclic requires
        blocks.push(...requiredBlocks)
        // Line handled
        return
      }

      if (foundImport) {
        // A relative import of another module.
        const relativePath = foundImport[1]
        const absPath = path.resolve(mod.dir, relativePath)
        const requiredBlocks = parseRequire({
          earmark: mod.earmark,
          path: absPath
        }, module.exports) // hack to prevent cyclic requires
        blocks.push(...requiredBlocks)
        // Line handled
        return
      }

      if (foundImportFrom) {
        // An import from another module.
        const relativePath = foundImportFrom[1]
        const absPath = path.resolve(mod.dir, relativePath)
        const requiredBlocks = parseRequire({
          earmark: mod.earmark,
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
        if (foundSignature) {
          // Capture call signature
          blockSignatures.push(foundSignature[1])
          // Line handled; do not include signature in block lines
          return
        }
        // A documentation line
        blockLines.push(trimDocLine(line))
      } else if (foundExcludedComment) {
        // An excluded documentation line. Skip.
        return // eslint-disable-line no-useless-return
      }
      // how do we got here
    }

    // line is handled
  })

  return blocks
}
