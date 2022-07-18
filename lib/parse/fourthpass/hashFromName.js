const hashExclude = /\W/g

module.exports = (name) => {
  return name.replace(hashExclude, '')
}
