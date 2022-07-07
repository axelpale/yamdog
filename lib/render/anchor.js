const hashExclude = /\W/g

exports.getHash = (block) => {
  const hashName = block.name.replace(hashExclude, '')
  return hashName
}

exports.getPath = (block) => {
  return '#' + exports.getHash(block)
}

exports.getElement = (block) => {
  const navHash = exports.getHash(block)
  return '<a name="' + navHash + '"></a>'
}
