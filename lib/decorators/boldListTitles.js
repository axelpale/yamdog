module.exports = () => {
  // yadog.decorators.boldListTitles
  //
  // Bolds the first line of all lists using Markdown &ast;bold&ast; syntax.
  //
  // Return
  //   a function, a decorator function.
  //

  const bold = (t) => {
    return '*' + t + '*'
  }

  const boldListTitle = (list) => {
    return Object.assign({}, list, {
      value: bold(list.value)
    })
  }

  return (block) => {
    // Returns a new block where all list paragraphs are updated.
    //

    // Update paragraphs that are lists.
    return Object.assign({}, block, {
      paragraphs: block.paragraphs.map(par => {
        // If a list, update top node value property.
        if (par.type === 'list') {
          return boldListTitle(par.body)
        }
        return par
      })
    })
  }
}
