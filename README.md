# yadog

Yet another API documentation generator for JavaScript. Minimal, indentation-based syntax that keeps your comments readable. Reads CommonJS and generates Markdown.

> Ya dog, I herd you like docs so we wrote docs for our docs generator so you can read docs while u generate yo docs.


## Install

Via [NPM](https://www.npmjs.com/package/yadog)

    $ npm install yadog


## Example

Here is a function documented in Yadog syntax:

    exports.myfun = (foo, options) => {
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

    ## mylib.myfun

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

- Double slash `//` comment blocks in the beginning of a file or a function will be included into docs.
- Triple slash `///` to exclude comment from documentation.
- Double dot `..` in the beginning of comment continues line.
- If a parameter list contains single word, it will be `emphasised`.


## Usage

Create a file `docs/generate.js` with following contents:

    const yadog = require('yadog')
    const path = require('path')
    yadog({
      output: path.resolve(__dirname, 'API.md')
      modules: [{
        // Main title of the document
        title: 'Yadog API Documentation',
        // Introduction; initial paragraph
        intro: 'Types and functions for affine 2D geometry.',
        // Package name
        name: 'yadog',
        // Where to start
        path: path.resolve(__dirname, '../lib')
      }],
    })

Then run it with Node.

    $ node docs/generate.js

Finally, see the freshly baked docs at `docs/API.md`.


## License

[MIT](LICENSE)
