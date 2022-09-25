// testdog
//
// Test how yamdog recognizes earmarks, names, and signatures with
// this test fixture.
//

// testdog.test
//
// A child block of testdog.
//

// # testdog.test.hash
//
// The signature line is allowed to have
// a hash symbol prefix a la markdown headings.
//

// ##testdog.test.doublehash
//
// The signature line is also allowed to have double hash followed
// by none to many spaces.
//

/// testdog.test.excluded
//
// Three slashes on the signature line should be enough to disable
// the block from being included into the docs.
//

// testdog.test.links
//
// Ensure links to various name syntaxes work as expected.
//   testdog.test.hash
//   testdog.test.doublehash
//   testdog.test.excluded
//

// test.shortname
//
// This shortname should be mapped to full name.
//
// Also, linkNames decorator should link: test.shortname
//
