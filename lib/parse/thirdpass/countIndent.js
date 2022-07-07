const expressions = require('../../expressions')

module.exports = (line) => {
  const foundIndent = line.match(expressions.indentation)
  const indent = foundIndent[1].length
  return indent
}
