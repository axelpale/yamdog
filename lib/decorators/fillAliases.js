
module.exports = (opts) => {
  // yamdog.decorators.fillAliases(opts)
  //
  // Creates a decorator function that appends paragraphs for aliases.
  //
  // Parameters
  //   opts
  //     optional object with props:
  //       aliasesLabel
  //         optional string, default 'Aliases: '. For the primary unit.
  //       aliasOfLabel:
  //         optional string, default 'Alias of '. For the alias-only units.
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
    return opts.aliasOfLabel +
      aliases.map(alias => {
        return '[' + alias.name + '](#' + alias.hash + ')'
      }).join(', ')
  }

  return (blocks) => {
    return blocks.map((block) => {
      // Immutable style - copy paragraphs array
      const newParagraphs = block.paragraphs.slice(0)

      if (block.aliases.length > 0) {
        if (block.paragraphs.length > 0) {
          // Is primary name.
          newParagraphs.push({
            type: 'text',
            body: renderAliases(block.aliases)
          })
        } else {
          // No paragraphs and not alone. Treat as an alias to fill.
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
