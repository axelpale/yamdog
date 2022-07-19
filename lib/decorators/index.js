// yamdog.decorators
//
// The default docs output is a bit dull.
// With decorators you can style the document in various ways.
// You can also create your own custom decorators.
// Each decorator is a function that maps an array of parsed doc blocks
// to a new array of decorated doc blocks.
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
exports.alphabetical = require('./alphabetical')
exports.backTopLinks = require('./backTopLinks')
exports.boldKeywords = require('./boldKeywords')
exports.boldListTitles = require('./boldListTitles')
exports.italicSingles = require('./italicSingles')
exports.sourceLinks = require('./sourceLinks')
exports.linkNames = require('./linkNames')
exports.replace = require('./replace')
exports.replaceListValues = require('./replaceListValues')
exports.aliases = require('./aliases')
exports.toc = require('./toc')
