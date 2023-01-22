module.exports = (name, namemap) => {
  // Extend the given name if the namemap is a map from
  // short names to full names.
  //
  // Parameters:
  //   name
  //     a string to convert to full name.
  //   namemap
  //     an array, or an object.
  //     Only the object form has effect here; array of names
  //     .. do not show need to modify the name.
  //
  // Return
  //   a string, the full name
  //
  if (typeof namemap === 'object' && !Array.isArray(namemap)) {
    // If the name begins with one of the keys, then replace
    // the matched part with the full name.
    const prefixesToReplace = Object.keys(namemap)
    const len = prefixesToReplace.length
    let i, prefix
    for (i = 0; i < len; i += 1) {
      prefix = prefixesToReplace[i]
      if (name.startsWith(prefix)) {
        // Match found. Replace and return.
        const full = namemap[prefix]
        return full + name.substring(prefix.length)
      }
    }
    throw new Error('No names matches the name. Possibly a bug.')
  } // else no extension is needed.
  return name
}
