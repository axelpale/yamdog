module.exports = (list, newTitle) => {
  // Replace list title and return new updated list.
  //
  // Parameters:
  //   list
  //   newTitle
  //
  // Returns:
  //   object, a new list
  //
  return Object.assign({}, list, {
    value: newTitle
  })
}
