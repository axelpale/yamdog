// @@testdog
//
// Test how yamdog recognizes comment blocks with
// this test fixture.
//

// @@testdog.basic
//
// A basic comment block.
//

// @@testdog.dense
// A dense comment block syntax.

// @@ testdog.space
// Allow a space after the earmark.

// A comment block without the earmark
// must not be included into docs.
//

//
// @@testdog.delayed
//
// Allow empty lines at the beginning.

// Just some comment.
// @@testdog.skip
//
// Skip comment blocks that begin with non-signature content.

// @@testdog.longtail
//
// Allow multiple empty lines at the end.
//
//
//

// @@testdog.double
somecode
somecode
// @@testdog.trouble
//
// Double trouble

/** @@testdog.jsdocblock
 * Support JSDoc block comment syntax.
 */

/**
 * @@testdog.jsdocblock
 * Support JSDoc block comment syntax with an empty line at the beginning.
 */
