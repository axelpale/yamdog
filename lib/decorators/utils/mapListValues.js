module.exports = function mapListValues (list, fn) {
  // Apply fn for each list text value.
  //
  // Return a new list
  //
  return {
    value: fn(list.value),
    children: list.children.map((child) => {
      return mapListValues(child, fn)
    })
  }
}
