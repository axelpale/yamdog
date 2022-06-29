# yadog

Yet another API documentation generator for JavaScript. Minimal, indentation-based syntax that keeps your comments readable. Reads CommonJS and generates Markdown.

> Ya dog, I herd you like docs so we wrote docs for our docs generator so you can read docs while u generate yo docs.


## Install

Via [NPM](https://www.npmjs.com/package/yadog)

> npm install yadog


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


## License

[MIT](LICENSE)
