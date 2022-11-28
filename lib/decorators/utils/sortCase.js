const findCommonPrefix = require('./findCommonPrefix')

module.exports = (blocks, locales) => {
  // Reorder blocks based on block name and its case pattern.
  // The order is: UPPER, Camel, and lower.
  // In other words, upper case names like constants come first,
  // then names with the first letter capitalized, like class names,
  // and finally the names in lower case, such as methods and properties.
  //
  // Parameters:
  //   blocks
  //     array of block objects presorted in alphabetical order.
  //   locales
  //     optional string. See Intl.Collator in MDN.
  //
  // Return
  //   array of blocks in case
  //

  // Block names could come in this order:
  //   a.b.Foo
  //   a.c.Foo
  //   a.b
  //   a.c
  //   a.b.foo
  //   a.b.FOO
  // They should come out in this order:
  //   a.b
  //   a.b.FOO
  //   a.b.Foo
  //   a.b.foo
  //   a.c
  //   a.c.Foo

  // Copy the array
  const bl = blocks.slice(0)

  const compareCase = (a, b) => {
    // Compare string cases.
    //
    // Return integer:
    //  -2: a upper and b lower
    //  -1: a upper and b camel OR a camel and b lower
    //   0: a and b equal case OR not comparable
    //   1: a lower and b camel OR a camel and b upper
    //   2: a lower and b upper
    //
    let aPoints = 0
    let bPoints = 0

    if (a.length === 0 || b.length === 0) {
      // Nothing to compare
      return 0
    }

    if (a === a.toUpperCase()) {
      if (a === a.toLowerCase()) {
        // a has no caseable characters; comparison does not make sense.
        return 0
      }
      // a in full uppercase
      aPoints = 2
    } else {
      // a not in full uppercase
      const a0 = a.substring(0, 1)
      if (a0 === a0.toUpperCase()) {
        // first letter uppercase
        aPoints = 1
      }
      // else begins lowercase
    }

    if (b === b.toUpperCase()) {
      if (b === b.toLowerCase()) {
        // b has no caseable characters; comparison does not make sense.
        return 0
      }
      // b in full uppercase
      bPoints = 2
    } else {
      // b not in full uppercase
      const b0 = b.substring(0, 1)
      if (b0 === b0.toUpperCase()) {
        // first letter uppercase
        bPoints = 1
      }
      // else begins lowercase
    }

    return bPoints - aPoints
  }

  // Sort in place.
  bl.sort((a, b) => {
    const an = a.name // = foo.bar
    const bn = b.name // = foo.BAR
    const common = findCommonPrefix(an, bn) // = foo.
    const apost = an.substring(common.length) // = bar
    const bpost = bn.substring(common.length) // = BAR
    const caseDir = compareCase(apost, bpost)
    if (caseDir === 0) {
      // Same case class. Use alphabetical sort.
      // Handle accents and other exotic characters with localeCompare.
      return an.localeCompare(bn, locales)
    }
    return caseDir
  })

  // Consider also:
  //   an = foo.bar2
  //   bn = foo.bar2.baz
  //   common = foo.bar2
  //   apost = ''
  //   bpost = '.baz'

  // Consider also:
  //   an = foo.bar2
  //   bn = foo.bar1.baz
  //   common = foo.bar
  //   apost = '2'
  //   bpost = '1.baz'

  return bl
}
