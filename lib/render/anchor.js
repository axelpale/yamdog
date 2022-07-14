const hashExclude = /\W/g

exports.getHash = (block) => {
  const hashName = block.name.replace(hashExclude, '')
  return hashName
}

exports.getHashFromName = (name) => {
  return name.replace(hashExclude, '')
}

exports.getPath = (block) => {
  return '#' + exports.getHash(block)
}

exports.getPathFromName = (name) => {
  return '#' + exports.getHashFromName(name)
}

exports.getElement = (block) => {
  const navHash = exports.getHash(block)
  return '<a name="' + navHash + '"></a>'
}
