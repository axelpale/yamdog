// Tools to detect preformatted sections in text.
//

const tagPattern = /(```+|`|<pre>|<code>)/i

exports.getEndTag = (startTag) => {
  // Return matching preformatted end tag for the given starting tag.
  //

  // The end tag must match tick count.
  // In GitHub flavoured Markdown quadruple backticks are allowed.
  const foundTicks = startTag.match(/(`+)/)
  if (foundTicks) {
    return foundTicks[1]
  }

  switch (startTag) {
    case '<pre>':
      return '</pre>'
    case '<code>':
      return '</code>'
    default:
      throw new Error('Unknown preformatting tag: ' + startTag)
  }
}

exports.findStartingPreTag = (line) => {
  // Find the first preformatting tag that does not end within the line.
  //
  // Precondition:
  //   Call in a context where the beginning of the line
  //   .. is not in a preformatted section. This is because
  //   .. we cannot be aware if it is a starting or ending tag
  //   .. based on only a single line.
  //
  // Return:
  //   string if found
  //   null if not or if the tag ends on the same line.
  //
  const foundTag = line.match(tagPattern)
  if (!foundTag) {
    return null
  }

  // Okay, a starting tag found.
  // Then we detect if it ends on the same line.
  const tag = foundTag[1]
  const startIndex = foundTag.index
  const endIndex = startIndex + tag.length
  const lineAfter = line.substring(endIndex)
  // The rest of the line might contain an ending tag.
  const endTag = exports.getEndTag(tag)

  const endTagIndex = lineAfter.indexOf(endTag)
  if (endTagIndex > -1) {
    // A matching end tag found.
    const restOfLine = lineAfter.substring(endTagIndex + endTag.length)
    // The rest of the line might contain new starting tags.
    // Solve by recursion.
    return exports.findStartingPreTag(restOfLine)
  }
  // else no matching end tag found. Therefore the preformatted area continues.
  return tag
}

exports.findEndingPreTag = (line, startTag) => {
  // Find if the line ends the given starting preformatting tag.
  //
  // Return:
  //   object with properties:
  //     tag
  //       a result object of a non-global String.prototype.match()
  //     rest
  //       string, the rest of the line.
  //   null
  //     if no matching end tag found.
  //
  const endTag = exports.getEndTag(startTag)

  const endTagIndex = line.indexOf(endTag)
  if (endTagIndex > -1) {
    // A matching end tag found.
    const restOfLine = line.substring(endTagIndex + endTag.length)

    return {
      tag: endTag,
      rest: restOfLine
    }
  }

  return null
}

exports.split = (str) => {
  // Split the string into normal and preformatted parts.
  //
  // Parameters:
  //   str
  //     a string. May contain newlines.
  //
  // Return:
  //   array of objects with properties:
  //     preformatted
  //       boolean
  //     content
  //       string
  //
  // The returned array will be empty for an empty input string.
  //

  const foundTag = str.match(tagPattern)
  if (!foundTag) {
    // No preformatting found. Only single part.
    if (str === '') {
      return []
    }
    return [
      {
        preformatted: false,
        content: str
      }
    ]
  }

  // Okay, a starting tag found.
  const tag = foundTag[1]
  const startIndex = foundTag.index
  const endIndex = startIndex + tag.length

  // Find where the preformatted section ends.
  const strAfter = str.substring(endIndex)
  const endTag = exports.getEndTag(tag)
  const endTagIndex = strAfter.indexOf(endTag)

  if (endTagIndex < 0) {
    // No end tag found. Treat the rest of the string as preformatted.
    return [
      {
        preformatted: false,
        content: str.substring(0, startIndex)
      },
      {
        preformatted: true,
        content: str.substring(startIndex)
      }
    ].filter(part => part.content !== '')
  }

  // Else, end tag found.
  const endTagEndIndex = endIndex + endTagIndex + endTag.length
  // Now we have the string in three parts:
  // - a known non-preformatted part (can be empty string)
  // - a known preformatted part
  // - an unknown part (can be empty string)
  const knownParts = [
    {
      preformatted: false,
      content: str.substring(0, startIndex)
    },
    {
      preformatted: true,
      content: str.substring(startIndex, endTagEndIndex)
    }
  ].filter(part => part.content !== '')
  // All we know about the unknown part is that it does not begin
  // inside a preformatted section.
  const restOfLine = str.substring(endTagEndIndex)

  // We solve this by tail recursion.
  return knownParts.concat(exports.split(restOfLine))
}
