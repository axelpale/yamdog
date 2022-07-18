const depthSeparator = /[-.:\s]/

module.exports = (blocks, block, depthLimit) => {
  // Use block names to determine child blocks for the given block.
  //
  // Parameters:
  //   blocks
  //     array of blocks. All the blocks to search.
  //   block
  //     block, the parent block.
  //   depthLimit
  //     integer, number of generations to include. 2 = kids and grandkids.
  //
  // Return:
  //   array of blocks. The children blocks.
  //

  // Find depth of given block once..
  const parentDepth = block.name.split(depthSeparator).length

  return blocks.filter(bl => {
    if (bl.name.startsWith(block.name)) {
      // Is a descendant.
      // Find depth.
      const blDepth = bl.name.split(depthSeparator).length

      // if (blDepth - parentDepth === 0) => they are siblings
      const depthDiff = blDepth - parentDepth

      if (depthDiff > 0 && depthDiff <= depthLimit) {
        // Include blocks that are children or close descendants.
        return true
      }
    }
    return false
  })
}
