
const mapListValues = require('./utils/mapListValues')
const mapBlockParagraphs = require('./utils/mapBlockParagraphs')
const setParagraphBody = require('./utils/setParagraphBody')
const preformatted = require('../utils/preformatted')

module.exports = (rules) => {
  // decorators.replace(rules)
  //
  // Replaces the given patterns in text and lists
  // by using String.prototype.replace.
  // Skips preformatted text sections, block names, and block signatures.
  //
  // Parameters
  //   rules
  //     array of replacement rule objects { pattern, replacement }
  //
  // Return
  //   a function, a decorator function.
  //

  const len = rules.length

  const applyRules = (str) => {
    // Parameters:
    //   str
    //     a string. May contain newline characters.
    //
    // Return
    //   a string.
    //
    const parts = preformatted.split(str)

    const appliedParts = parts.map(part => {
      let content = part.content
      if (part.preformatted) {
        return content
      }

      // If the part is not preformatted, apply the rules.
      let i, rule
      for (i = 0; i < len; i += 1) {
        rule = rules[i]
        content = content.replace(rule.pattern, rule.replacement)
      }
      return content
    })

    return appliedParts.join('')
  }

  return (blocks) => {
    return blocks.map((block) => {
      return mapBlockParagraphs(block, (par) => {
        switch (par.type) {
          case 'text':
            return setParagraphBody(par, applyRules(par.body))
          case 'list':
            return setParagraphBody(par, mapListValues(par.body, applyRules))
          default:
            return par
        }
      })
    })
  }
}
