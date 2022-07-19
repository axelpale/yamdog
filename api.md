<a name="top"></a>
# Yamdog API Docs

Welcome to Yamdog v1.1.0 API documentation.


<a name="yamdog"></a>
## yamdog

The module provides following tools for parsing, decorating, and rendering
YAML and Markdown flavoured API documentation from source code comments.

- [yamdog.decorate](#yamdogdecorate)
- [yamdog.decorators](#yamdogdecorators)
- [yamdog.generate](#yamdoggenerate)
- [yamdog.parse](#yamdogparse)
- [yamdog.render](#yamdogrender)
- [yamdog.stringify](#yamdogstringify)


Source: [lib/index.js](https://github.com/axelpale/yamdog/blob/main/lib/index.js)

<a name="yamdogdecorate"></a>
## yamdog.decorate(blocks, decorators)

Decorate parsed blocks. The list of decorator functions are applied to
each block in the given order. See [yamdog.decorators](#yamdogdecorators) for available
built-in decorator functions.

**Parameters:**
- blocks
  - array of parsed blocks
- decorators
  - array of decorator functions

**Returns:**
- array of new decorated block objects

Source: [decorate/index.js](https://github.com/axelpale/yamdog/blob/main/lib/decorate/index.js)

<a name="yamdogdecorators"></a>
## yamdog.decorators

The default docs output is a bit dull.
With decorators you can style the document in various ways.
You can also create your own custom decorators.
Each decorator is a function that maps an array of parsed doc blocks
to a new array of decorated doc blocks.

The decorator function must be idempotent so that output of running it twice
does not differ from running it once. The idempotency also does protect
although not prevent decorators interfering with each other.
For example a bolding operation should not be done twice - the code
must recognize if the text is already bold.

The decorator function must also be immutable so that
the input stays unaltered.
This prevents a class of problems that would be very hard to debug.

The decorator function is allowed to create, modify, sort, and
remove blocks. However, the output must still be a valid array of blocks
that can be subjected for further processing.

- [yamdog.decorators.alphabetical](#yamdogdecoratorsalphabetical)
- [yamdog.decorators.backTopLinks](#yamdogdecoratorsbackTopLinks)
- [yamdog.decorators.boldKeywords](#yamdogdecoratorsboldKeywords)
- [yamdog.decorators.boldListTitles](#yamdogdecoratorsboldListTitles)
- [yamdog.decorators.fillAliases](#yamdogdecoratorsfillAliases)
- [yamdog.decorators.linkFiles](#yamdogdecoratorslinkFiles)
- [yamdog.decorators.linkNames](#yamdogdecoratorslinkNames)
- [yamdog.decorators.replace](#yamdogdecoratorsreplace)
- [yamdog.decorators.toc](#yamdogdecoratorstoc)


Source: [decorators/index.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/index.js)

<a name="yamdogdecoratorsalphabetical"></a>
## yamdog.decorators.alphabetical(opts)

Sort blocks in alphabetical order.

**Parameters:**
- opts
  - object

**Returns:**
- a function, a decorator function.

Source: [alphabetical.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/alphabetical.js)

<a name="yamdogdecoratorsbackTopLinks"></a>
## yamdog.decorators.backTopLinks(opts)

Extends the last block with a link back to the top of the page.
In future versions this decorator might be extended to add back
links also at every 10th block or so.

**Parameters:**
- opts
  - optional object with props:
    - label
      - optional string. Default '&uarr; Back To Top'

**Returns:**
- a function, a decorator function.

Source: [backTopLinks.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/backTopLinks.js)

<a name="yamdogdecoratorsboldKeywords"></a>
## yamdog.decorators.boldKeywords

Bolds the given keywords with Markdown &ast;&ast;bold&ast;&ast; syntax.

**Parameters:**
- keywords
  - array of strings or regexp objects

**Returns:**
- a function, a decorator function.

Source: [boldKeywords.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/boldKeywords.js)

<a name="yamdogdecoratorsboldListTitles"></a>
## yamdog.decorators.boldListTitles

Bolds the first line of all lists with
Markdown &ast;&ast;bold&ast;&ast; syntax.

**Returns:**
- a function, a decorator function.

Source: [boldListTitles.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/boldListTitles.js)

<a name="yamdogdecoratorsfillAliases"></a>
## yamdog.decorators.fillAliases(opts)

Creates a decorator function that appends paragraphs for aliases.

**Parameters:**
- opts
  - optional object with props:
    - aliasesLabel
      - optional string, default 'Aliases: '. For the primary unit.
    - aliasOfLabel:
      - optional string, default 'Alias of '. For the alias-only units.

**Returns:**
- a function, a decorator function.

Source: [aliases.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/aliases.js)

<a name="yamdogdecoratorslinkFiles"></a>
## yamdog.decorators.linkFiles(config)

Creates a decorator function that extends each block
with a paragraph that contains a link to the source code.

**Parameters:**
- config
  - object with props:
    - basePath
      - string, the dir path to trim away from abs file paths.
    - baseUrl
      - string, the URL to prefix the paths.
    - label
      - optional string, default 'Source: '.

**Returns:**
- a function, a decorator function.

Source: [sourceLinks.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/sourceLinks.js)

<a name="yamdogdecoratorslinkNames"></a>
## yamdog.decorators.linkNames()

Easy way to create links for block name occurrences in text.
Searches block contents for block names and replaces each match with
a link to the block heading anchor.

**Returns:**
- a function, a decorator function.

Source: [linkNames.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/linkNames.js)

<a name="yamdogdecoratorsreplace"></a>
## yamdog.decorators.replace

Replaces the given patterns using String.prototype.replace().

**Parameters:**
- rules
  - array of replacement rule objects { pattern, replacement }

**Returns:**
- a function, a decorator function.

Source: [replace.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/replace.js)

<a name="yamdogdecoratorstoc"></a>
## yamdog.decorators.toc(config)

Create and insert table of contents for each module that has child blocks.

**Parameters:**
- config
  - object

**Returns:**
- a function, a decorator function.

Source: [toc.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/toc.js)

<a name="yamdoggenerate"></a>
## yamdog.generate(config)

Generate the API documentation and save as Markdown document.
Internally uses [yamdog.parse](#yamdogparse), [yamdog.decorate](#yamdogdecorate), and [yamdog.render](#yamdogrender),
in this order.

**Parameters:**
- config
  - object with properties
    - entry
      - string, an absolute directory or file path. The location of the module to be documented. All relative require and import statements like `var lib = require('./lib')` are followed in the order they occur in the code. Absolute or named imports like `var _ = require('lodash')` and `import baz from 'foo/bar'` are skipped.
    - output
      - string, an absolute path to the target file to generate. For example '/home/xeli/projects/yamdog/API.md'.
    - earmark
      - string, the earmark signature to look for in the comment blocks to include to the documentation. The earmark is usually the module name like `mylib`. It does not need to match the real package name but it must match the signature used in the comments.
    - title
      - optional string, the document title and main heading. Default is `'API Documentation'`.
    - intro
      - optional string, the introduction paragraph. Default is `''`.
    - decorators
      - array of decorator functions. Default is `[]`.
    - silent
      - boolean. Disable console output. Default is `false`.

Source: [generate.js](https://github.com/axelpale/yamdog/blob/main/lib/generate.js)

<a name="yamdogparse"></a>
## yamdog.parse(mod)

Parse doc block objects from code.

**Parameters:**
- mod
  - earmark
    - string, the earmark signature, for example the module name. Comment blocks that begin with this signature will be included.
  - path
    - string, absolute directory or file path to the module

**Returns:**
- an array of doc block objects.

A parsed doc block object has properties:
- file
  - string, the absolute file path that contains the block.
- signature
  - string, the call signature
- name
  - string, the unit name derived from the call signature.
- hash
  - string, an URL friendly hash derived from the name.
- aliases
  - array of alias objects { hash, name, signature }. Navigational data about blocks that are aliases of this block.
- paragraphs
  - array of paragraph objects { type, body }

Aliases: [yamdog.stringify](#yamdogstringify)

Source: [parse/index.js](https://github.com/axelpale/yamdog/blob/main/lib/parse/index.js)

<a name="yamdogrender"></a>
## yamdog.render(blocks, options)

Render API docs in Markdown.

**Parameters:**
- blocks
  - parsed blocks
- options
  - title
    - optional string, default 'API Reference'.
  - intro
    - optional string, default ''.

**Returns:**
- string, in Markdown syntax.

Source: [render/index.js](https://github.com/axelpale/yamdog/blob/main/lib/render/index.js)

<a name="yamdogstringify"></a>
## yamdog.stringify(mod)

Alias of [yamdog.parse](#yamdogparse)

Source: [parse/index.js](https://github.com/axelpale/yamdog/blob/main/lib/parse/index.js)

<p style="text-align: right">
<a href="#top">&uarr; Back To Top</a>
</p>

