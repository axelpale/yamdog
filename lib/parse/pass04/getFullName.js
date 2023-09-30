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

    // Namemap can be empty. Then the name is the full name.
    if (len === 0) {
      return name
    }

    // If the name is already a full name, return immediately.
    if (Object.values(namemap).includes(name)) {
      return name
    }

    // Find all matching prefixes. Extend with the longest.
    // Why: def -> abc.def should not override ext.def
    const matchingPrefixes = prefixesToReplace.filter((prefix) => {
      return name.startsWith(prefix)
    }).sort((a, b) => b.length - a.length)

    if (matchingPrefixes.length > 0) {
      // Match found. Extend and return.
      const prefix = matchingPrefixes[0]
      const full = namemap[prefix]
      return full + name.substring(prefix.length)
    }

    throw new Error('No names matches the name. Possibly a bug.')
  } // else no extension is needed.
  return name
}
