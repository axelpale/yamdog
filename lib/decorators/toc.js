
const getChildren = require('./utils/getChildren')
const anchorUtils = require('../render/anchor')
const addParagraph = require('./utils/addParagraph')

const renderToc = (blocks, title) => {
  // Render table of contents.
  //
  // Parameters:
  //   blocks
  //     array of block objects
  //   title
  //     string, the title line before ToC lists.
  //     A linebreak will be added after the title.
  //
  // Return:
  //   string
  //
  const prefix = '\n' + ((title.length > 0) ? title + '\n' : '')
  const postfix = '\n'
  return prefix + blocks.map(block => {
    return '- [' + block.name + '](' + anchorUtils.getPath(block) + ')'
  }).join('\n') + postfix
}

module.exports = (config) => {
  // decorators.toc(config)
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
  //       title
  //         optional string, the line before the ToC list.
  //         Default is '' meaning that no titles are rendered before lists.
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
  if (typeof config.title !== 'string') {
    config.title = ''
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
        const tocBody = renderToc(children, config.title)
        return addParagraph(block, {
          type: 'text',
          body: tocBody
        })
      }
      return block
    })
  }
}
