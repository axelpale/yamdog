const preformatted = require('../../utils/preformatted')
const findEndingPreTag = preformatted.findEndingPreTag
const findStartingPreTag = preformatted.findStartingPreTag

module.exports = (lines) => {
  // Split lines of documentation to paragraphs by empty lines.
  // Preserve empty lines in preformatted sections.
  //
  // Parameters
  //   lines
  //     array of strings
  //
  // Return
  //   array of paragraphs
  //

  const paragraphs = []
  let par = []

  // Track pre tags to skip preformatted empty lines.
  // These tags include triple and single backticks and <pre> and <code> tags.
  let activePreTag = null

  lines.forEach((line) => {
    if (activePreTag) {
      // Detect if the preformatted section ends.
      const result = findEndingPreTag(line, activePreTag)
      if (result) {
        // Detect if the line after the ending tag begins
        // a new preformatted section. Returns null if not found.
        activePreTag = findStartingPreTag(result.rest)
      }
    } else {
      // Detect if a preformatted section begins.
      // Null if no tag found.
      activePreTag = findStartingPreTag(line)
    }

    if (line.trim() === '') {
      // Empty line detected.
      // If the empty line was inside a preformatted section,
      // the empty line should be a part of the same paragraph.
      if (activePreTag) {
        // The empty line is preformatted. Include.
        par.push(line)
        return
      }

      // The empty line was not preformatted.
      // Therefore either a paragraph ended or
      // there was consecutive empty lines.
      if (par.length > 0) {
        // Paragraph ended
        paragraphs.push({
          lines: par
        })
        // Begin new paragraph
        par = []
        // Next line.
        return
      }
      // Else the empty line was a consecutive empty line
      // or the first line. Skip.
      return
    }

    // Line is not empty. Collect it into the current paragraph.
    par.push(line)
  })

  // Handle the case if the last line was not empty.
  if (par.length > 0) {
    paragraphs.push({
      lines: par
    })
    // par = []
  }

  return paragraphs
}
