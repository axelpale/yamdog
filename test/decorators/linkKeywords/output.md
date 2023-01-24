<a name="top"></a>
# Test document title

Keywords in doc intro should not be decorated: doghouse.


<a name="testdog"></a>
## [testdog](#testdog)

Test how yamdog decorates keywords with this test fixture.

<a name="testdogtest"></a>
## [testdog](#testdog).[test](#testdogtest)

A child block of [testdog](#testdog). Custom keyword: [doghouse](https://www.example.com)

Custom keyword inside a link [doghouse](#foobar) should not
be redecorated.

<a name="testdogtestdoghouse"></a>
## [testdog](#testdog).[test](#testdogtest).[doghouse](#testdogtestdoghouse)

A block with same name as the custom keyword.
The decorator should prevent duplicate markup.

<a name="testdogtestlinks"></a>
## [testdog](#testdog).[test](#testdogtest).[links](#testdogtestlinks)

<p style="margin-bottom: 0">Ensure normal links to names work as expected.</p>

- [testdog.test](#testdogtest)
- [testdog.test.links](#testdogtestlinks)
- [testdog.test.doghouse](#testdogtestdoghouse)

