module.exports = function mapListValues (list, fn, depth) {
  // Apply fn for each list text value.
  //
  // Parameters:
  //   list
  //     a parsed list object { value, children }
  //   fn
  //     a function (string value, integer depth) => string newValue
  //   depth
  //     optional integer, the depth of current list item. Default 0.
  //     .. The depth data will be passed to fn for selective mapping.
  //
  // Return a new list
  //

  if (!depth) {
    depth = 0
  }

  return {
    value: fn(list.value, depth),
    children: list.children.map((child) => {
      return mapListValues(child, fn, depth + 1)
    })
  }
}
