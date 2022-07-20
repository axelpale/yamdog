// yamdog
//
// The module provides following tools for parsing, decorating, and rendering
// YAML and Markdown flavoured API documentation from source code comments.
//

exports.generate = require('./generate')
exports.parse = require('./parse')
exports.stringify = exports.parse
exports.render = require('./render')
exports.decorate = require('./decorate')
exports.decorators = require('./decorators')

// Test commented import of unknown module
// exports.foo = require('./bar')
