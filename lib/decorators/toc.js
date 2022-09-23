
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
  const prefix = '\n'
  const postfix = '\n'
  return prefix + blocks.map(block => {
    return '- [' + block.name + '](' + anchorUtils.getPath(block) + ')'
  }).join('\n') + postfix
}

module.exports = (config) => {
  // yamdog.decorators.toc(config)
  //
  // Create and insert table of contents for each module that has child blocks.
  // The parent-child relationships are determined by the block names.
  // For example the block "yamdog.decorators" is a child of block "yamdog",
  // and the block "yamdog.decorators.toc" is a child of "yamdog.decorators".
  // However, "yamdogbone" would **not** be a child of "yamdog" because of
  // the missing separator. Allowed separator characters are `- .:#/`.
  //
  // Parameters:
  //   config
  //     optional object with properties:
  //       depth
  //         optional integer, the depth per table. Default 1.
  //
  // Return:
  //   a function, a decorator function.
  //

  if (!config) {
    config = {}
  }
  if (typeof config.depth !== 'number') {
    config.depth = 1
  }

  return (blocks) => {
    // The decorator function.
    //
    // Returns
    //   array of blocks
    //

    // Enhance blocks with children with ToCs.
    return blocks.map(block => {
      const children = getChildren(blocks, block, config.depth)
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
