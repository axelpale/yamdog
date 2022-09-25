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
    // Note: we allow empty string as earmark.
    return true
  }
  if (typeof val === 'object') {
    if (Array.isArray(val)) {
      // Is array. Ensure all elements are strings.
      return val.every(item => typeof item === 'string')
    }
    // not array but object. Ensure all values are strings.
    return Object.keys(val).every(key => typeof val[key] === 'string')
  }
  // Not string, not object, not valid.
  return false
}
