# yadog

![Yadog logo](doc/yadog_logo.png)

Yet another API documentation generator for JavaScript. Minimal, indentation-based syntax that keeps your comments readable. Reads CommonJS and generates Markdown.

> Ya dog, I herd you like docs so we wrote docs for our docs generator so you can read docs while u generate yo docs.


## Install

Via [npm](https://www.npmjs.com/package/yadog)

    $ npm install yadog


## Example

Here is a function documented in Yadog syntax:

    exports.myfun = (foo, options) => {
      // mylib.myfun(foo, [options])
      //
      // My function with some general documentation at
      // the beginning.
      //
      // Parameters:
      //   foo
      //     string that does something.
      //   options
      //     optional object with properties:
      //       bar
      //         optional string. Default 'barval'.
      //       baz
      //         optional number that does a thing and
      //         ..then some more. Default 'bazval'.
      //
      // Return:
      //   integer
      //
      // Some other remarks...
      /// Some excluded remarks.
      //

      // This comment is excluded due to the empty line
      ...
    }

The code above is converted to Markdown:

    ## mylib.myfun(foo, \[options\])

    My function with some general documentation at the beginning.

    **Parameters:**
    - *foo*
      - string that does something.
    - *options*
      - optional object with properties:
        - *bar*
          - optional string. Default 'barval'.
        - *baz*
          - optional number that does a thing and then some more. Default 'bazval'.

    **Return:** integer

    Some other remarks...


## Syntax

- A comment block is a set of adjacent lines of `//` comments.
- If a comment block begins with a line that contains `// name_of_my_module` then it will be included into the docs.
- Triple slash `///` to exclude comment in a comment block.
- Indent comments to create a list, for example a list of parameters.
- Double or triple dot `..` in the beginning of comment in a list continues previous list item instead of starting a new list item.


## Usage

In your project, create a file `docs/generate.js` with contents similar to:

    const yadog = require('yadog')
    const path = require('path')
    yadog.generate({
      // Where to start collecting comment blocks
      entry: path.resolve(__dirname, '../'),
      // Where to generate
      output: path.resolve(__dirname, 'API.md'),
      // Module name; include blocks that begin with this name.
      name: 'yadog',
      // Main title of the document
      title: 'Yadog API Documentation',
      // Introduction; the initial paragraph
      intro: 'Types and functions for affine 2D geometry.',
    })

Then run it with Node.

    $ node docs/generate.js

Finally, see your freshly baked docs at `docs/API.md`.

See [API documentation](API.md) for details. Generated by yadog, of course.


## License

[MIT](LICENSE)
