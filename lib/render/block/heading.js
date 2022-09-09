module.exports = (block) => {
  // Render block heading.
  //
  // Parameters:
  //   block
  //     object
  //
  // Return
  //   string
  //

  const navigableName = block.nameParts.reduce((acc, part) => {
    return acc + part.prefix + '[' + part.label + '](#' + part.hash + ')'
  }, '')

  return '## ' + navigableName + block.postfix
}
