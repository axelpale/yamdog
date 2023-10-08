
module.exports = (opts) => {
  // @decorators.aliases(opts)
  //
  // Creates a decorator function that appends a paragraph in each
  // multi-name block. The paragraph consists of a label
  // followed by a list of alternative names.
  //
  // Parameters
  //   opts
  //     optional object with properties:
  //       aliasesLabel
  //         optional string, default is `'Aliases: '`.
  //         .. This label is used in the paragraph within
  //         .. the block of the primary name.
  //         .. The label is followed by a list of links to aliases.
  //       aliasOfLabel
  //         optional string, default is `'Alias of '`.
  //         .. This label is used the paragraph within
  //         .. the blocks of the aliases.
  //         .. The label is followed by a link to the primary name.
  //
  // Return
  //   a function, a decorator function.
  //
  if (!opts) {
    opts = {}
  }
  if (!opts.aliasesLabel) {
    opts.aliasesLabel = 'Aliases: '
  }
  if (!opts.aliasOfLabel) {
    opts.aliasOfLabel = 'Alias of '
  }

  const renderAliases = (aliases) => {
    return opts.aliasesLabel +
      aliases.map(alias => {
        return '[' + alias.name + '](#' + alias.hash + ')'
      }).join(', ')
  }

  const renderAliasOf = (aliases) => {
    // The first is the primary name.
    const primary = aliases[0]
    return opts.aliasOfLabel + '[' + primary.name + '](#' + primary.hash + ')'
  }

  return (blocks) => {
    return blocks.map((block) => {
      // Immutable style - copy paragraphs array
      const newParagraphs = block.paragraphs.slice(0)

      if (block.aliases.length > 0) {
        if (block.isPrimary) {
          // Is primary name. Render the aliases.
          newParagraphs.push({
            type: 'text',
            body: renderAliases(block.aliases)
          })
        } else {
          // No paragraphs and not alone. Treat as an alias to fill.
          // Render only the primary to avoid user jumping between aliases.
          // Possible because each alias has same props as the block.
          newParagraphs.push({
            type: 'text',
            body: renderAliasOf(block.aliases)
          })
        }
      }

      return Object.assign({}, block, {
        paragraphs: newParagraphs
      })
    })
  }
}
