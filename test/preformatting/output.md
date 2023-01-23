<a name="top"></a>
# Yamdog Test Docs

Test document output


<a name="testdogtest"></a>
## [testdog](#testdog).[test](#testdogtest)

Test various aspects of yamdog with this
test fixture.

A preformatted empty line does not split paragraph.
```
First line

Second line with preformatted `inline = code` and <pre> tag </pre>


Third line
```

A preformatted section with quadruple backtick
should preformat a triple backtick.
````
```
A code example
```
````

Also, linkNames should not decorate preformatted names `testdog.test`
like normally [testdog.test](#testdogtest).
