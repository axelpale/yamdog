module.exports = (block, par) => {
  // Add a paragraph to the block in an immutable way.
  //
  // Return a new block.
  //
  return Object.assign({}, block, {
    paragraphs: block.paragraphs.concat([par])
  })
}
