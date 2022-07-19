
module.exports = (opts) => {
  // yamdog.decorators.alphabetical(opts)
  //
  // Sort blocks in alphabetical order.
  //
  // Parameters:
  //   opts
  //     object
  //
  // Return:
  //   a function, a decorator function.
  //

  return (blocks) => {
    // The decorator function.
    //
    // Returns
    //   array of blocks
    //

    // Array:sort does in-place ordering. Copy for immutability.
    const b = blocks.slice(0)

    // Handle accents and other exotic characters with localeCompare.
    b.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })

    return b
  }
}
