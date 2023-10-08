const addParagraph = require('./utils/addParagraph')

module.exports = (opts) => {
  // @decorators.backTopLinks(opts)
  //
  // Extends the last block with a link back to the top of the page.
  //
  // Parameters:
  //   opts
  //     optional object with properties:
  //       label
  //         optional string. Default is `'&uarr; Back To Top'`
  //
  // Return:
  //   a function, a decorator function.
  //
  /// DEV NOTE
  /// For the decorator to work, the yamdog.render is expected to
  /// add an anchor tag with name "top".

  // TODO In future versions this decorator might be upgraded to add back
  // links also at every 10th block or so.

  if (!opts) {
    opts = {}
  }
  if (!opts.label) {
    opts.label = '&uarr; Back To Top'
  }

  return (blocks) => {
    // The decorator function.
    //
    // Returns
    //   array of blocks
    //

    const lastIndex = blocks.length - 1

    return blocks.map((block, i) => {
      if (i === lastIndex) {
        return addParagraph(block, {
          type: 'text',
          body: '<p style="text-align: right">\n' +
            '<a href="#top">' + opts.label + '</a>\n' +
            '</p>\n'
        })
      }
      return block
    })
  }
}
