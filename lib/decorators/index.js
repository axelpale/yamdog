// @yamdog.decorators
//
// The default yamdog output is very minimal and dull.
//
// With decorators you can enhance the document in various ways.
// Below you can find many prebuilt decorators, for example
// to emphasize matching keywords, insert tables of contents,
// and order the documentation blocks in alphabetical order.
// See [custom decorators](#yamdogdecoratorsaboutcustomdecorators) for more info on
// how decorator functions work and how to create your own decorators.
//

// @yamdog.decorators About Custom Decorators
//
// Each decorator is a function that maps an array of parsed doc blocks
// to a new array of doc blocks.
// For example, yamdog.decorators.alphabetical is a function that takes in
// an array of doc blocks, sorts them by their title, and outputs
// the blocks in the new order.
//
// The decorator function must be idempotent so that output of running it twice
// does not differ from running it once. The idempotency also does protect
// although not prevent decorators interfering with each other.
// For example a bolding operation should not be done twice - the code
// must recognize if the text is already bold.
//
// The decorator function must also be immutable so that
// the input stays unaltered.
// This prevents a class of problems that would be very hard to debug.
//
// The decorator function is allowed to create, modify, sort, and
// remove blocks. However, the output must still be a valid array of blocks
// that can be subjected for further processing.
//
exports.aliases = require('./aliases')
exports.alphabetical = require('./alphabetical')
exports.backTopLinks = require('./backTopLinks')
exports.boldKeywords = require('./boldKeywords')
exports.boldListTitles = require('./boldListTitles')
exports.italicSingles = require('./italicSingles')
exports.linkFiles = exports.sourceLinks // legacy
exports.linkKeywords = require('./linkKeywords')
exports.linkNames = require('./linkNames')
exports.replace = require('./replace')
exports.replaceListValues = require('./replaceListValues')
exports.sourceLinks = require('./sourceLinks')
exports.toc = require('./toc')
