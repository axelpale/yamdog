// @testdog
//
// Test how yamdog generates tocs with this fixture.
//

// @testdog.test
//
// A child block of testdog.
//
// A list immediately before toc:
// - should not be merged
// - to the toc list

// @testdog.test.doghouse
//
// A block for doghouses.
//

// @testdog.test.puppy
//
// A block for puppies.
//

// @testdog.test.doggo
//
// A block for doggos.
//

// @testdog.test.DOGGO
//
// A block with upper case name.
// Should be ordered before lower case names in toc when
// alphabetical decorator is used.
//

// @testdog.test.Doggo
// A block with CamelCase name.
