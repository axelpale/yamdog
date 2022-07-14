# Yadog API Docs

Welcome to Yadog documentation.


- [yadog.generate](#yadoggenerate)
- [yadog.parse](#yadogparse)
- [yadog.render](#yadogrender)
- [yadog.decorate](#yadogdecorate)
- [yadog.decorators](#yadogdecorators)
- [yadog.decorators.boldKeywords](#yadogdecoratorsboldKeywords)
- [yadog.decorators.boldListTitles](#yadogdecoratorsboldListTitles)
- [yadog.decorators.replace](#yadogdecoratorsreplace)

<a name="yadoggenerate"></a>
## yadog.generate(config)

Generate the API documentation to a Markdown document.

**Parameters:**
- config
  - object with properties
    - entry
      - string, an absolute directory or file path. The location of the module to be documented. All relative require and import statements like `var lib = require('./lib')` are followed in the order they occur in the code. Absolute or named imports like `var _ = require('lodash')` and `import baz from 'foo/bar'` are skipped.
    - output
      - string, an absolute path to the target file to generate. For example '/home/xeli/projects/yadog/API.md'.
    - earmark
      - string, the earmark signature to look for in the comment blocks to include to the documentation. The earmark is usually the module name like `mylib`. It does not need to match the real package name but it must match the signature used in the comments.
    - title
      - optional string, the document title and main heading.
    - intro
      - optional string, the introduction paragraph. Default ''.
    - decorators
      - array of decorator functions. Default [].
    - silent
      - boolean. Disable console output. Default false.

<a name="yadogparse"></a>
## yadog.parse(mod)

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
- name
  - string, the unit name derived from the call signature
- signature
  - string, the call signature
- paragraphs
  - array of paragraph objects { type, body }

<a name="yadogrender"></a>
## yadog.render(blocks, options)

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

<a name="yadogdecorate"></a>
## yadog.decorate(blocks, decorators)

Decorate parsed blocks. The list of decorator functions are applied to
each block in the given order. See yadog.decorators for available
built-in decorator functions.

**Parameters:**
- blocks
  - array of parsed blocks
- decorators
  - array of decorator functions

**Returns:**
- array of new decorated block objects

<a name="yadogdecorators"></a>
## yadog.decorators

The default docs output is a bit dull.
With decorators you can style the markdown in various ways.

<a name="yadogdecoratorsboldKeywords"></a>
## yadog.decorators.boldKeywords

Bolds the given keywords using Markdown &ast;bold&ast; syntax.

**Parameters:**
- keywords
  - array of strings or regexp objects

**Returns:**
- a function, a decorator function.

<a name="yadogdecoratorsboldListTitles"></a>
## yadog.decorators.boldListTitles

Bolds the first line of all lists using Markdown &ast;bold&ast; syntax.

**Returns:**
- a function, a decorator function.

<a name="yadogdecoratorsreplace"></a>
## yadog.decorators.replace

Replaces the given patterns using String.prototype.replace().

**Parameters:**
- rules
  - array of replacement rule objects { pattern, replacement }

**Returns:**
- a function, a decorator function.
