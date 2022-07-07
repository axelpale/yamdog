const renderList = require('./list')

module.exports = (par) => {

  switch (par.type) {
    case 'text':
      return par.body + '\n'
    case 'list':
      return renderList(par.body) + '\n'
    default:
      throw new Error('Unknown paragraph type: ' + par.type)
  }
}
