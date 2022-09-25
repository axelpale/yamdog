// testdog
//
// Test how yamdog decorates keywords with this test fixture.
//

// testdog.test
//
// A child block of testdog. Custom keyword: doghouse
//
// Custom keyword inside a link [doghouse](#foobar) should not
// be redecorated.
//

// testdog.test.doghouse
//
// A block with same name as the custom keyword.
// The decorator should prevent duplicate markup.
//

// testdog.test.links
//
// Ensure normal links to names work as expected.
//   testdog.test
//   testdog.test.links
//   testdog.test.doghouse
//
