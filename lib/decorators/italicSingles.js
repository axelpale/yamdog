const replaceListValues = require('./replaceListValues')

module.exports = () => {
  // decorators.italicSingles()
  //
  // Emphasizes list item values that contain only a single word.
  // This can be used to make parameter names and property names stand out.
  //
  // For example the list values "foobar", "fooBar", and "foo_bar"
  // would be emphasized but the values "foo bar", "foo.bar", and "foo:"
  // would not. See yamdog.decorators.replaceListValues for customization.
  //
  // Return
  //   a function, a decorator function.
  //

  return replaceListValues({
    minDepth: 1,
    rules: [
      {
        pattern: /^(\w+)$/,
        replacement: '*$1*'
      }
    ]
  })
}
