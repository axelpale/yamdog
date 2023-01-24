const renderList = require('./list')

module.exports = (par) => {
  // Render a parapraph based on its type.
  //
  // Parameters:
  //   par
  //     object, { type, body }
  //
  // Return
  //   string
  //
  switch (par.type) {
    case 'text':
      return par.body + '\n'
    case 'preformat':
      return '```\n' + par.body.trim() + '\n```\n'
    case 'list':
      return renderList(par.body) + '\n'
    default:
      throw new Error('Unknown paragraph type: ' + par.type)
  }
}
