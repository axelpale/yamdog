module.exports = (par, newbody) => {
  // Set text paragraph body.
  //
  // Parameters
  //   par
  //     a paragraph { type, body }
  //   newbody
  //     a string
  //
  // Return a new text paragraph.
  //
  return Object.assign({}, par, {
    body: newbody
  })
}
