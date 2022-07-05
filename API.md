## Yadog API Docs

Welcome to Yadog documentation.



## yadog



- [yadog.generate](#yadoggenerate)

<a name="yadoggenerate"></a>
### yadog.generate(config)

Generate the api documentation in a markdown file.

<p style="display: inline">Parameters:</p>

- `config`
  - object with properties
    - `target`
      - string, an absolute path to the target file to generate.
         For example '/home/xeli/projects/yadog/API.md'.
    - `modules`
      - array of CodeModule objects for which to generate documents.
    - keywords TODO
      - array of KeywordSubstitution objects.
    - verbose TODO
      - boolean. Enable console output. Default true.

CodeModule object:
  title
    string. The heading.
  intro
    string. The first paragraph. For example 'Welcome to Yadog API docs'.
  name
    string. The module name as it is referred in code.
    .. For example 'yadog'
  path
    string. A path to the directory of the module.
    .. The generation is started from there.

KeywordSubstitution object:
  keyword
    regexp match input
  replacement
    regexp match output

