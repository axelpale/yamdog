module.exports = (lines) => {
  // Split lines of documentation to paragraphs by empty lines.
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

  lines.forEach((line) => {
    if (line.trim() === '') {
      // Empty line detected.
      // Either a paragraph ended or
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

  return paragraphs
}
