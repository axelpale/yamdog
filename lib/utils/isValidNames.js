module.exports = (val) => {
  // Test if val is a valid names argument.
  //
  // Parameter
  //   val
  //     anything
  //
  // Return
  //   a boolean
  //

  // Note: we do not allow empty names.
  if (typeof val === 'object') {
    if (Array.isArray(val)) {
      // Is array. Ensure all elements are strings.
      return val.every(item => typeof item === 'string' && item.length > 0)
    }
    // not array but object. Ensure all values are strings.
    return Object.keys(val).every(key => {
      return typeof val[key] === 'string' && val[key].length > 0
    })
  }
  // Not string, not object, not valid.
  return false
}
