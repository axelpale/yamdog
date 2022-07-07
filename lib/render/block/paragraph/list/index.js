
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
  return list.value + '\n' + list.children.map((item) => {
    return renderItem(item, 1)
  }).join('\n')
}
