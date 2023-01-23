<a name="top"></a>
# Yamdog Test Docs

Test document output


<a name="testdog"></a>
## [testdog](#testdog)

Test how yamdog recognizes earmarks, names, and signatures with
this test fixture.

<a name="testdogtest"></a>
## [testdog](#testdog).[test](#testdogtest)

A child block of [testdog](#testdog).

<a name="testdogtest"></a>
## [testdog](#testdog).[test](#testdogtest)

A duplicate name

<a name="testdogtestdoublehash"></a>
## [testdog](#testdog).[test](#testdogtest).[doublehash](#testdogtestdoublehash)

The signature line is also allowed to have double hash followed
by none to many spaces.

<a name="testdogtestatsign"></a>
## [testdog](#testdog).[test](#testdogtest).[atsign](#testdogtestatsign)

The signature can begin with at-sign. It will not be included into
the name.

<a name="testdogtestlinks"></a>
## [testdog](#testdog).[test](#testdogtest).[links](#testdogtestlinks)

<p style="margin-bottom: 0">Ensure links to various name syntaxes work as expected.</p>


- [testdog.test](#testdogtest).hash
- [testdog.test.doublehash](#testdogtestdoublehash)
- [testdog.test](#testdogtest).excluded


<a name="testdogtestshortname"></a>
## [testdog](#testdog).[test](#testdogtest).[shortname](#testdogtestshortname)

This shortname should be mapped to full name.

Also, linkNames decorator should link: [test.shortname](#testdogtestshortname)
