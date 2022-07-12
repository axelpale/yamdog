module.exports = (blocks, decorators) => {
  // yadog.decorate(blocks, decorators)
  //
  // Decorate parsed blocks. The list of decorator functions are applied to
  // each block in the given order. See yadog.decorators for available
  // built-in decorator functions.
  //
  // Parameters:
  //   blocks
  //     array of parsed blocks
  //   decorators
  //     array of decorator functions
  //
  // Return:
  //   array of new decorated block objects
  //
  return blocks.map(block => {
    return decorators.reduce((acc, decorator) => {
      return decorator(acc)
    }, block)
  })
}
