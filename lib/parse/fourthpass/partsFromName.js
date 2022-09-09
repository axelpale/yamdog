const expressions = require('../../expressions')
const hashFromName = require('./hashFromName')

module.exports = (name) => {
  // Split the name into nav parts.
  //
  // For example the name 'mylib.myfun' becomes parts:
  //  [
  //    { label: 'mylib', name: 'mylib', hash: 'mylib', prefix: '' },
  //    { label: 'myfun', name: 'mylib.myfun', hash: 'mylibmyfun', prefix: '.' }
  //  ]
  //
  // Parameters:
  //   name
  //     string
  //
  // Return
  //   array of objects with properties:
  //     label: string, the part short name e.g. 'myfun'
  //     name: string, the full name e.g. 'mylib.myfun'
  //     hash: string, the nav hash for the full name e.g. 'mylibmyfun'
  //     prefix: string, the separator character found before the label
  //
  const foundParts = name.split(expressions.nameDepthSeparator)

  if (!foundParts) {
    throw new Error('Invalid name: ' + name)
  }

  const partsLen = foundParts.length
  const output = []

  let remaining = '' + name
  let cursor = 0

  // For each part, collect separator, name and hash
  for (let j = 0; j < partsLen; j += 1) {
    const partName = foundParts[j]
    const firstOccur = remaining.indexOf(partName)

    if (firstOccur >= 0) {
      // found
      const beginIndex = firstOccur
      const endIndex = firstOccur + partName.length

      const separator = remaining.substring(0, beginIndex)
      const nameForHash = name.substring(0, cursor + endIndex)
      const partHash = hashFromName(nameForHash)

      output.push({
        label: partName,
        name: nameForHash,
        hash: partHash,
        prefix: separator
      })

      cursor = cursor + endIndex
      remaining = remaining.substring(endIndex)
    }
  }

  return output
}
