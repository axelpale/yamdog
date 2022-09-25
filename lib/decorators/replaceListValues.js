
const mapListValues = require('./utils/mapListValues')
const mapBlockParagraphs = require('./utils/mapBlockParagraphs')
const setParagraphBody = require('./utils/setParagraphBody')

module.exports = (config) => {
  // decorators.replaceListValues(config)
  //
  // Replaces all list values according to given rules.
  // Uses applies String.prototype.replace() for each list value.
  //
  // Parameters:
  //   config
  //     object with properties:
  //       rules
  //         array of replacement rule objects { pattern, replacement }
  //       minDepth
  //         optional integer. Default 0. Value of 1 means the root list item
  //         .. is skipped.
  //       maxDepth
  //         optional integer. Default Infinity. Value of 1 means that
  //         .. list items at depth 2 and beyond are skipped.
  //
  // Return
  //   a function, a decorator function.
  //

  if (!config) {
    config = {}
  }
  if (!config.rules) {
    throw new Error('Missing replacement rules.')
  }
  if (!config.minDepth) {
    config.minDepth = 0
  }
  if (!config.maxDepth) {
    config.maxDepth = Infinity
  }

  const len = config.rules.length

  const applyToLine = (line, depth) => {
    if (depth >= config.minDepth && depth <= config.maxDepth) {
      // The list value is in allowed depth range.
      let i, rule
      for (i = 0; i < len; i += 1) {
        rule = config.rules[i]
        line = line.replace(rule.pattern, rule.replacement)
      }
      return line
    }
    // Outside depth range. Keep unaltered.
    return line
  }

  return (blocks) => {
    return blocks.map((block) => {
      return mapBlockParagraphs(block, (par) => {
        switch (par.type) {
          case 'list':
            return setParagraphBody(par, mapListValues(par.body, applyToLine))
          default:
            return par
        }
      })
    })
  }
}
