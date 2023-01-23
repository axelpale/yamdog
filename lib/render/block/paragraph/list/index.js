const marked = require('marked')

// Recursive rendering
const renderItem = (list, depth) => {
  const indentation = '  '.repeat(depth - 1) + '- '
  const valueLine = indentation + list.value
  if (list.children.length === 0) {
    return valueLine
  } else {
    return valueLine + '\n' + list.children.map((item) => {
      return renderItem(item, depth + 1)
    }).join('\n')
  }
}

module.exports = (list) => {
  // Render a list.
  //
  // Parameters:
  //   list
  //     object { value, children }, a tree
  //

  let titleLine = ''
  if (list.value.length > 0) {
    // The list has a title line.

    // Prevent the gap between list title and list items by
    // explicit paragraph tag with margin set zero.
    // We must render possible markdown, such as **, to HTML here
    // because wrapping it inside tags prevents detecting it as markdown later.
    const parsedTitle = marked.parse(list.value)
    // The rendering wrapped the title inside <p>-tag. Style the tag.
    titleLine += parsedTitle.replace('<p>', '<p style="margin-bottom: 0">')

    // Add double linebreak postfix: Markdown handles HTML tags so that
    // everything until next empty line is treated as literal HTML and not
    // as markdown.
    titleLine = titleLine.trim() + '\n\n'
  }

  return titleLine + list.children.map((item) => {
    return renderItem(item, 1)
  }).join('\n') + '\n'
}
