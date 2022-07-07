const anchor = require('../anchor')

module.exports = (blocks) => {
  // Render table of contents
  //
  return blocks.map(block => {
    return '- [' + block.name + '](' + anchor.getPath(block) + ')'
  }).join('\n') + '\n'
}
