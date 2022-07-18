// yamdog.decorators
//
// The default docs output is a bit dull.
// With decorators you can style the document in various ways.
// You can also create your own custom decorators.
// Each decorator is a function that maps an array of parsed doc blocks
// to a new array of decorated doc blocks.
// A decorator function must be idempotent so that output of running it twice
// does not differ from running it once. The idempotency also does protect
// although not prevent decorators interfering with each other.
// For example a bolding operation should not be done twice - the code
// must recognize if the text is already bold.
//
exports.boldKeywords = require('./boldKeywords')
exports.boldListTitles = require('./boldListTitles')
exports.linkFiles = require('./linkFiles')
exports.linkNames = require('./linkNames')
exports.replace = require('./replace')
exports.fillAliases = require('./fillAliases')
