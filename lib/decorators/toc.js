const getChildren = require('./utils/getChildren')
const addParagraph = require('./utils/addParagraph')
const marked = require('marked')

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

  // We begin by empty line to ensure that the list is not
  // merged to a possible list before the ToC in the markup.
  let prefix = '\n'
  // Construct title line if so configured.
  if (title.length > 0) {
    // The configured title may contain Markdown.
    // Because we will wrap the title inside a marginless p tag,
    // eventually preventing the markdown being rendered later,
    // we must render the markdown here.
    const parsedTitle = marked.parse(title)
    // The rendering wrapped the title inside <p>-tag. Style the tag.
    prefix += parsedTitle.replace('<p>', '<p style="margin-bottom: 0">')
    // To prevent the toc list being treated as literal html, we must
    // add a empty line after the tag.
    prefix += '\n\n'
  }

  const postfix = '\n'
  return prefix + blocks.map(block => {
    const blockUrl = '#' + block.hash
    return '- [' + block.name + '](' + blockUrl + ')'
  }).join('\n') + postfix
}

module.exports = (config) => {
  // @decorators.toc(config)
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
  //         Default is the empty string '', meaning that ToC lists have
  //         .. no title.
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
