<a name="top"></a>
# Test document title

Test document intro.


<a name="testdog"></a>
## [testdog](#testdog)

Test how yamdog generates tocs with this fixture.


<p style="margin-bottom: 0">Contents:</p>


- [testdog.test](#testdogtest)


<a name="testdogtest"></a>
## [testdog](#testdog).[test](#testdogtest)

A child block of testdog.

<p style="margin-bottom: 0">A list immediately before toc:</p>


- should not be merged
- to the toc list



<p style="margin-bottom: 0">Contents:</p>


- [testdog.test.DOGGO](#testdogtestdoggo)
- [testdog.test.Doggo](#testdogtestdoggo)
- [testdog.test.doggo](#testdogtestdoggo)
- [testdog.test.doghouse](#testdogtestdoghouse)
- [testdog.test.puppy](#testdogtestpuppy)


<a name="testdogtestdoggo"></a>
## [testdog](#testdog).[test](#testdogtest).[DOGGO](#testdogtestdoggo)

A block with upper case name.
Should be ordered before lower case names in toc when
alphabetical decorator is used.

<a name="testdogtestdoggo"></a>
## [testdog](#testdog).[test](#testdogtest).[Doggo](#testdogtestdoggo)

A block with CamelCase name.

<a name="testdogtestdoggo"></a>
## [testdog](#testdog).[test](#testdogtest).[doggo](#testdogtestdoggo)

A block for doggos.

<a name="testdogtestdoghouse"></a>
## [testdog](#testdog).[test](#testdogtest).[doghouse](#testdogtestdoghouse)

A block for doghouses.

<a name="testdogtestpuppy"></a>
## [testdog](#testdog).[test](#testdogtest).[puppy](#testdogtestpuppy)

A block for puppies.
