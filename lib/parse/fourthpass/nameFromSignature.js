const expressions = require('../../expressions')

module.exports = (signature) => {
  // Pick a name portion from a general call signature.
  //
  // For example the name of 'mylib.myfun(foo, bar)' is 'mylib.myfun'.
  //
  // Parameters:
  //   signature
  //     string
  //
  // Return
  //   string
  //
  const foundName = signature.match(expressions.nameInSignature)
  if (foundName) {
    return foundName[1]
  }

  throw new Error('Invalid call signature: ' + signature)
}
