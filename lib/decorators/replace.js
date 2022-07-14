
const mapListValues = require('./utils/mapListValues')
const mapBlockParagraphs = require('./utils/mapBlockParagraphs')
const setParagraphBody = require('./utils/setParagraphBody')

module.exports = (rules) => {
  // yadog.decorators.replace
  //
  // Replaces the given patterns using String.prototype.replace().
  //
  // Parameters
  //   rules
  //     array of replacement rule objects { pattern, replacement }
  //
  // Return
  //   a function, a decorator function.
  //

  const len = rules.length

  const applyToLine = (line) => {
    let i, rule
    for (i = 0; i < len; i += 1) {
      rule = rules[i]
      line = line.replace(rule.pattern, rule.replacement)
    }
    return line
  }

  return (blocks) => {
    return blocks.map((block) => {
      return mapBlockParagraphs(block, (par) => {
        switch (par.type) {
          case 'text':
            return setParagraphBody(par, applyToLine(par.body))
          case 'list':
            return setParagraphBody(par, mapListValues(par.body, applyToLine))
          default:
            return par
        }
      })
    })
  }
}
