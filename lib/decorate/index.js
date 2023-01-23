module.exports = (blocks, decorators) => {
  // @yamdog.decorate(blocks, decorators)
  //
  // Decorate parsed blocks. The list of decorator functions are applied to
  // each block in the given order. See yamdog.decorators for available
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

  // Each decorator creates a new blocks array
  return decorators.reduce((acc, decorator) => {
    return decorator(acc)
  }, blocks)
}
