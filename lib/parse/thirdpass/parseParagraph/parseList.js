const trimBaseIndent = require('../trimBaseIndent')
const countIndent = require('../countIndent')

const getChildren = (lines) => {
  // Get array of { value, children } objects from lines.
  // Called recursively to parse the list tree.
  //

  // Collect chilren here
  const children = []
  // Collect current child lines here
  let childValue = null
  let childLines = null

  // Logic:
  // if indent larger than prev then children
  // if indent same as prev then sibling
  // if indent smaller than prev then end

  // Remove common indent
  const trimmed = trimBaseIndent(lines)

  trimmed.forEach(line => {
    const indent = countIndent(line)

    if (indent === 0) {
      if (childValue) {
        // End of a child.
        children.push({
          value: childValue,
          children: getChildren(childLines) // recursive
        })
        childValue = null
        childLines = null
      }
      // Begin of a child
      childValue = line
      childLines = []
    } else {
      // indent > 0
      // Collect as a line of a child
      if (childLines) {
        childLines.push(line)
      }
    }
  })

  // Last
  if (childValue) {
    children.push({
      value: childValue,
      children: getChildren(childLines)
    })
  }

  return children
}

module.exports = (lines) => {
  // Parse lines as list
  //
  // Parameters:
  //   lines
  //     array of strings
  //
  // Return
  //   object
  //     value
  //       string, the first line of the list
  //     children
  //       array
  //

  const title = lines[0]
  const children = getChildren(lines.slice(1))

  return {
    value: title,
    children: children
  }
}
