# Yadog API Docs

Welcome to Yadog documentation.


- [yadog.generate](#yadoggenerate)
- [yadog.parse](#yadogparse)
- [yadog.render](#yadogrender)
- [yadog.decorate](#yadogdecorate)
- [yadog.decorators](#yadogdecorators)
- [yadog.decorators.boldKeywords](#yadogdecoratorsboldKeywords)
- [yadog.decorators.boldListTitles](#yadogdecoratorsboldListTitles)

<a name="yadoggenerate"></a>
## yadog.generate(config)

Generate the API documentation to a Markdown document.

*Parameters:*
- config
  - object with properties
    - entry
      - string, an absolute directory or file path. The location of the module to document.
    - output
      - string, an absolute path to the target file to generate. For example '/home/xeli/projects/yadog/API.md'.
    - name
      - string, the module name. The module name acts as the signature to look for comment blocks that are to be included to the documentation.
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

Parse a tree from code.

*Parameters:*
- mod
  - name
    - string, module name
  - path
    - string, absolute directory or file path to the module

*Return*
- an array of doc block objects

<a name="yadogrender"></a>
## yadog.render(blocks, options)

Render API docs in Markdown.

*Parameters:*
- blocks
  - parsed blocks
- options
  - title
    - optional string, default 'API Reference'.
  - intro
    - optional string, default ''.

*Return*
- string, in Markdown syntax.

<a name="yadogdecorate"></a>
## yadog.decorate(blocks, decorators)

Decorate parsed blocks. The list of decorator functions are applied to
each block in the given order. See yadog.decorators for available
built-in decorator functions.

*Parameters:*
- blocks
  - array of parsed blocks
- decorators
  - array of decorator functions

*Return:*
- array of new decorated block objects

<a name="yadogdecorators"></a>
## yadog.decorators

The default docs output is a bit dull.
With decorators you can style the markdown in various ways.

<a name="yadogdecoratorsboldKeywords"></a>
## yadog.decorators.boldKeywords

Bolds the given keywords using Markdown &ast;bold&ast; syntax.

*Parameters*
- keywords
  - array of strings or regexp objects

*Return*
- a function, a decorator function.

<a name="yadogdecoratorsboldListTitles"></a>
## yadog.decorators.boldListTitles

Bolds the first line of all lists using Markdown &ast;bold&ast; syntax.

*Return*
- a function, a decorator function.
