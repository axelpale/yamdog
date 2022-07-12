
module.exports = (keywords) => {
  // yadog.decorators.boldKeywords
  //
  // Bolds the given keywords using Markdown &ast;bold&ast; syntax.
  //
  // Parameters
  //   keywords
  //     array of strings or regexp objects
  //
  // Return
  //   a function, a decorator function.
  //

  const len = keywords.length

  const replacer = (match) => {
    return '*' + match + '*'
  }

  return (line) => {
    for (let i = 0; i < len; i += 1) {
      line = line.replace(keywords[i], replacer)
    }

    return line
  }
}
