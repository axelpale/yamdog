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
  //       names
  //         an object of string
  //       dir
  //         string, absolute directory path of the module
  //       file
  //         string, absolute file path of the module
  //       log
  //         array of strings, paths already processed.
  //         .. Pass to parseRequire for check.
  //
  // Return
  //   array of 1st degree doc block objects
  //   .. { signatures, lines, file }
  //

  // Prepare a regexp for the doc block signature.
  const signaturePattern = expressions.callSignature(mod.earmark, mod.names)

  // Collect all found blocks here
  const blocks = []

  // Collect individual doc block lines using a state machine
  //   code: code
  //   comment: normal comments
  //   sign: beginning of a doc block, collect signatures
  //   doc: doc block after the signatures
  let state = 'code' // code | comment | sign | doc
  let blockLines = []
  // Collect block signatures, e.g. function call signatures.
  // There can be multiple signatures, aliases.
  let blockSignatures = []

  lines.forEach((line) => {
    // Match the line
    const foundComment = line.match(expressions.comment)
    const emptyComment = line.match(expressions.emptyComment)
    const foundExcludedComment = line.match(expressions.excludedComment)
    const foundReq = line.match(expressions.requireModule)
    const foundImport = line.match(expressions.import)
    const foundImportFrom = line.match(expressions.importFrom)
    const foundSignature = line.match(signaturePattern)

    // Handle state change
    if (state === 'code') {
      if (foundComment) {
        if (foundSignature) {
          // Is a doc block. Begin a doc block signature section.
          state = 'sign'
        } else {
          // Just some normal comment between code.
          if (emptyComment) {
            // Skip empty comments: stay in code state
            // to allow valid signatures after empty comment.
            state = 'code'
          } else {
            // Comment with content.
            state = 'comment'
          }
        }
      }
    } else if (state === 'comment') {
      if (!foundComment) {
        // Back to code
        state = 'code'
      }
      // else the comment just continues
    } else if (state === 'sign') {
      if (foundComment) {
        if (!foundSignature) {
          state = 'doc'
        }
        // else stay in 'sign' state to collect more signatures.
      }
    } else if (state === 'doc') {
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
    } else {
      throw new Error('Invalid parse state: ' + state)
    }

    // Handle state effect. Keep separate from state change.
    if (state === 'code' || state === 'comment') {
      if (foundComment) {
        // A comment within code or within a comment block without earmark.
        // Possibly a commented require or import. Skip.
        return
      }

      if (foundReq) {
        // A require of another module.
        const relativePath = foundReq[1]
        const absPath = path.resolve(mod.dir, relativePath)
        const requiredBlocks = parseRequire({
          earmark: mod.earmark,
          names: mod.names,
          path: absPath,
          log: mod.log
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
          names: mod.names,
          path: absPath,
          log: mod.log
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
          names: mod.names,
          path: absPath,
          log: mod.log
        }, module.exports) // hack to prevent cyclic requires
        blocks.push(...requiredBlocks)
        // Line handled
        return
      }

      // otherwise just some code.
    }

    if (state === 'sign') {
      if (foundComment && foundSignature) {
        // Capture a call signature
        blockSignatures.push(foundSignature[1])
        // Line handled; do not include signature in block lines
        return
      }
      // How we got here?
      return
    }

    if (state === 'doc') {
      if (foundComment) {
        // A documentation line
        blockLines.push(trimDocLine(line))
      } else if (foundExcludedComment) {
        // An excluded documentation line. Skip.
        return // eslint-disable-line no-useless-return
      }
      // How do we got here?
    }

    // line is handled
  })

  return blocks
}
