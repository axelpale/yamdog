const mapBlockParagraphs = require('./utils/mapBlockParagraphs')
const setListTitle = require('./utils/setListTitle')

module.exports = () => {
  // yamdog.decorators.boldListTitles
  //
  // Bolds the first line of all lists with
  // Markdown &ast;&ast;bold&ast;&ast; syntax.
  //
  // Return
  //   a function, a decorator function.
  //

  const bold = (t) => {
    return '**' + t + '**'
  }

  return (blocks) => {
    return blocks.map((block) => {
      // Returns a new block where all list paragraphs are updated.
      // Update paragraphs that are lists.
      return mapBlockParagraphs(block, (par) => {
        // If a list, update top node value property.
        if (par.type === 'list') {
          const list = par.body
          return setListTitle(list, bold(list.value))
        }
        return par
      })
    })
  }
}
