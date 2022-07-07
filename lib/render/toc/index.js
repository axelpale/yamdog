const anchor = require('../anchor')

module.exports = (blocks) => {
  return blocks.map(block => {
    return '- [' + block.name + '](' + anchor.getPath(block) + ')'
  }).join('\n') + '\n'
}
