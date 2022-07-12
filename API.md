# Yadog API Docs

Welcome to Yadog documentation.


- [yadog.generate](#yadoggenerate)
- [yadog.parse](#yadogparse)
- [yadog.render](#yadogrender)

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
    - keywords TODO
      - array of KeywordSubstitution objects.
    - silent
      - boolean. Disable console output. Default false.

KeywordSubstitution object:
- keyword
  - regexp match input
- replacement
  - regexp match output

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
    - optional string, default 'API Reference'
  - intro
    - optional string, default ''

*Return*
- string, in Markdown syntax.
