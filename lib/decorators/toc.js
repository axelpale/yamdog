
const getChildren = require('./utils/getChildren')
const anchorUtils = require('../render/anchor')
const addParagraph = require('./utils/addParagraph')

const renderToc = (blocks) => {
  // Render table of contents.
  //
  // Parameters:
  //   blocks
  //
  // Return:
  //   string
  //
  return blocks.map(block => {
    return '- [' + block.name + '](' + anchorUtils.getPath(block) + ')'
  }).join('\n') + '\n'
}

module.exports = (config) => {
  // yamdog.decorators.toc(config)
  //
  // Create and insert table of contents for each module that has child blocks.
  //
  // Parameters:
  //   config
  //     object
  //
  // Return:
  //   a function, a decorator function.
  //

  return (blocks) => {
    // The decorator function.
    //
    // Returns
    //   array of blocks
    //

    // Enhance blocks with children with ToCs.
    return blocks.map(block => {
      const depth = 1
      const children = getChildren(blocks, block, depth)
      if (children.length > 0) {
        const tocBody = renderToc(children)
        return addParagraph(block, {
          type: 'text',
          body: tocBody
        })
      }
      return block
    })
  }
}
