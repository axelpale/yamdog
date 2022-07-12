module.exports = (block, fn) => {
  // Apply fn to each paragraph of the block.
  //
  // Return a new block.
  //
  return Object.assign({}, block, {
    paragraphs: block.paragraphs.map(fn)
  })
}
