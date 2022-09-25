module.exports = (a, b) => {
  // Find common prefix of two strings.
  //
  // Return
  //   string, the common prefix
  //
  const len = Math.min(a.length, b.length)
  let i = 0
  while (i < len && a.charAt(i) === b.charAt(i)) {
    i += 1
  }

  return a.substring(0, i)
}
