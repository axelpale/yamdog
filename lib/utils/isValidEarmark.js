module.exports = (val) => {
  // Test if val is a valid earmark argument.
  //
  // Parameter
  //   val
  //     anything
  //
  // Return
  //   a boolean
  //
  if (typeof val === 'string') {
    // Note: we do not allow empty string as earmark. Too dangerous.
    return val.length > 0
  }

  // Not string, not valid.
  return false
}
