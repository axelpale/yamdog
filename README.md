# yamdog

![Yamdog logo](docs/yamdog_logo.png)

[![npm version](https://img.shields.io/npm/v/yamdog?color=green)](https://www.npmjs.com/package/yamdog)
[![license](https://img.shields.io/npm/l/yamdog)](#license)

Yet another documentation generator for JavaScript modules. Generate your interface reference documents, API docs, for your code in a fun way. Yamdog's minimal syntax is based on [Markdown](https://en.wikipedia.org/wiki/Markdown) and [YAML](https://yaml.org/) and keeps your comments readable and your code pretty. Yamdog crawls through your ECMAScript projects structured in [CommonJS](https://www.commonjs.org/) or [ESM](https://nodejs.org/api/esm.html) module format. It follows relative require and import statements and scrapes earmarked comment blocks for plain text, Markdown, and YAML. Then it renders the blocks together, spices them up with tables of contents and other happiness, and finally outputs a Markdown document.

[Install](#install) - [Syntax](#syntax) - [Usage](#usage) - [API Docs](https://axelpale.github.io/yamdog/api) - [Contribute](#contribute) - [GitHub](https://github.com/axelpale/yamdog)

> Ya m'dog, I herd you like docs so we wrote docs for our docs generator so you can read docs while u generate yo docs.


## Install

Via [npm](https://www.npmjs.com/package/yamdog) or [yarn](https://yarnpkg.com/en/package/yamdog):

    $ npm install --save-dev yamdog
    $ yarn add --dev yamdog


## Example

Here is a function documented in Yamdog syntax:

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
      //     - bar
      //         optional string. Default 'barval'.
      //     - baz
      //         optional number that does a thing and
      //         ..then some more. Default 'bazval'.
      //
      // Return:
      //   integer
      //
      // Some included remarks.
      /// Some excluded remarks.
      //

      // This comment is excluded due to the empty line
      ...
    }

The code above is converted to markdown:

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

    Some included remarks.

The markdown above renders to:

> ## mylib.myfun(foo, \[options\])
>
> My function with some general documentation at the beginning.
>
> **Parameters:**
> - *foo*
>   - string that does something.
> - *options*
>   - optional object with properties:
>     - *bar*
>       - optional string. Default 'barval'.
>     - *baz*
>       - optional number that does a thing and then some more. Default 'bazval'.
>
> **Return:** integer
>
> Some included remarks.

## Syntax

A *comment block* is a set of adjacent lines of `//` comments.

    // A comment block
    // that has some text
    some = code

To *earmark* a comment block to be included to your docs, begin the block with a line that contains `// name.of.this.module`. The earmark line also presents how to access and call the documented feature.

    // name.of.this.module
    // This comment block will be included
    // to the docs with a title "name.of.this.module"
    some = code

To exclude a line in an earmarked comment block, use triple slash `///`.

    // name.of.this.module
    // This line of text is visible in docs.
    /// This line of text is not in docs.
    some = code

Indent with space `' '` or dash `'-'` to create lists.

    // name.of.this.module(x, y)
    //
    // Parameters
    //   x
    //     list item with some text, for example
    //   y
    //     a number. Vertical coordinate.
    //

To write multi-line list items, prefix each new line with a double or triple dot `..`. Otherwise the new line becomes a new list item.

    // name.of.this.module
    //
    // list title
    //   first list item
    //   second list item that spans
    //   .. multiple lines of text like
    //   .. no tomorrow
    //   third list item

![Three bones](docs/yamdog_three_bones.png)

*Use triple slash `///` to exclude a line in an earmarked comment block.*


## Usage

Here we cover the basic usage. See [yamdog API docs](https://axelpale.github.io/yamdog/api) for details, generated with yamdog itself, of course.

In your project, create a file `docs/generate.js` with contents similar to:

    const yamdog = require('yamdog')
    const path = require('path')
    yamdog.generate({
      // Where to start collecting comment blocks
      entry: path.resolve(__dirname, '../'),
      // Where to generate
      output: path.resolve(__dirname, 'API.md'),
      // Earmark; include comment blocks that begin with this string
      earmark: 'mylib',
      // Main title of the document
      title: 'Mylib API Documentation',
      // Introduction; the initial paragraph
      intro: 'Welcome to mylib API documentation.',
      // Decorators; a customizable palette of features to pimp yo docs
      decorators: [
        yamdog.decorators.alphabetical(), // render in alphabetical order
        yamdog.decorators.linkNames(), // convert name patterns to links
        yamdog.decorators.toc() // insert tables of contents
      ]
    })

Then you can run it with Node and find your freshly baked docs at `docs/API.md`.

    $ node docs/generate.js

Integrate to your `$ npm run` workflow with the script to your package.json:

    scripts: {
      ...
      "build:docs": "node docs/generate.js",
      ...
    }

Naturally you can choose any directory and file names you like. Some prefer `docs/`, others `doc/`, and some even the project root. Suit to your purpose.

See [API documentation](https://axelpale.github.io/yamdog/api) for details.


## Contribute

Pull requests and [bug reports](https://github.com/axelpale/yamdog/issues) via [GitHub](https://github.com/axelpale/yamdog) are highly appreciated. Please test your contribution with the following scripts:

Run code linter:

    $ npm run lint

Test generate Yamdog's docs:

    $ npm run build:docs


## Versioning

We use [Semantic Versioning 2.0.0](http://semver.org/)


## License

[MIT](LICENSE)
