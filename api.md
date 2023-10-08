<a name="top"></a>
# Yamdog API Docs

Welcome to Yamdog v2.1.0 API documentation. This document is generated with Yamdog itself, of course. See [docs/generate.js](https://github.com/axelpale/yamdog/blob/main/docs/generate.js) for the recipe.

![Two bones](docs/yamdog_two_bones.png)


<a name="yamdog"></a>
## [yamdog](#yamdog)

The module provides following tools for parsing, decorating, and rendering
[YAML](https://yaml.org/) and [Markdown](https://daringfireball.net/projects/markdown/) flavoured API documentation from source code comments.


<p style="margin-bottom: 0"><strong>Contents:</strong></p>


- [yamdog.decorate](#yamdogdecorate)
- [yamdog.decorators](#yamdogdecorators)
- [yamdog.generate](#yamdoggenerate)
- [yamdog.parse](#yamdogparse)
- [yamdog.render](#yamdogrender)
- [yamdog.stringify](#yamdogstringify)


Source: [lib/index.js](https://github.com/axelpale/yamdog/blob/main/lib/index.js)

<a name="yamdogdecorate"></a>
## [yamdog](#yamdog).[decorate](#yamdogdecorate)(blocks, decorators)

Decorate parsed blocks. The list of decorator functions are applied to
each block in the given order. See [yamdog.decorators](#yamdogdecorators) for available
built-in decorator functions.

<p style="margin-bottom: 0"><strong>Parameters:</strong></p>

- *blocks*
  - array of parsed blocks
- *decorators*
  - array of decorator functions


<p style="margin-bottom: 0"><strong>Returns:</strong></p>

- array of new decorated block objects


Source: [decorate/index.js](https://github.com/axelpale/yamdog/blob/main/lib/decorate/index.js)

<a name="yamdogdecorators"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators)

The default [yamdog](#yamdog) output is very minimal and dull.

With decorators you can enhance the document in various ways.
Below you can find many prebuilt decorators, for example
to emphasize matching keywords, insert tables of contents,
and order the documentation blocks in alphabetical order.
See [custom decorators](#yamdogdecoratorsaboutcustomdecorators) for more info on
how decorator functions work and how to create your own decorators.


<p style="margin-bottom: 0"><strong>Contents:</strong></p>


- [yamdog.decorators.aliases](#yamdogdecoratorsaliases)
- [yamdog.decorators.alphabetical](#yamdogdecoratorsalphabetical)
- [yamdog.decorators.backTopLinks](#yamdogdecoratorsbacktoplinks)
- [yamdog.decorators.boldKeywords](#yamdogdecoratorsboldkeywords)
- [yamdog.decorators.boldListTitles](#yamdogdecoratorsboldlisttitles)
- [yamdog.decorators.italicSingles](#yamdogdecoratorsitalicsingles)
- [yamdog.decorators.linkKeywords](#yamdogdecoratorslinkkeywords)
- [yamdog.decorators.linkNames](#yamdogdecoratorslinknames)
- [yamdog.decorators.replace](#yamdogdecoratorsreplace)
- [yamdog.decorators.replaceListValues](#yamdogdecoratorsreplacelistvalues)
- [yamdog.decorators.sourceLinks](#yamdogdecoratorssourcelinks)
- [yamdog.decorators.toc](#yamdogdecoratorstoc)


Source: [decorators/index.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/index.js)

<a name="yamdogdecoratorsaboutcustomdecorators"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators) [About](#yamdogdecoratorsabout) [Custom](#yamdogdecoratorsaboutcustom) [Decorators](#yamdogdecoratorsaboutcustomdecorators)

Each decorator is a function that maps an array of parsed doc blocks
to a new array of doc blocks.
For example, [yamdog.decorators.alphabetical](#yamdogdecoratorsalphabetical) is a function that takes in
an array of doc blocks, sorts them by their title, and outputs
the blocks in the new order.

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

Source: [decorators/index.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/index.js)

<a name="yamdogdecoratorsaliases"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[aliases](#yamdogdecoratorsaliases)(opts)

Creates a decorator function that appends a paragraph in each
multi-name block. The paragraph consists of a label
followed by a list of alternative names.

<p style="margin-bottom: 0"><strong>Parameters:</strong></p>

- *opts*
  - optional object with properties:
    - *aliasesLabel*
      - optional string, default is `'Aliases: '`. This label is used in the paragraph within the block of the primary name. The label is followed by a list of links to aliases.
    - *aliasOfLabel*
      - optional string, default is `'Alias of '`. This label is used the paragraph within the blocks of the aliases. The label is followed by a link to the primary name.


<p style="margin-bottom: 0"><strong>Returns:</strong></p>

- a function, a decorator function.


Source: [aliases.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/aliases.js)

<a name="yamdogdecoratorsalphabetical"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[alphabetical](#yamdogdecoratorsalphabetical)(opts)

Sort blocks in alphabetical order.

<p style="margin-bottom: 0"><strong>Parameters:</strong></p>

- *opts*
  - optional object with properties:
    - *intro*
      - optional string or array of strings. Blocks that have these names are placed first regardless of their alphabetical position.
    - *outro*
      - optional string or array of strings. Blocks that have these names are placed last regardless of their alphabetical position.
    - *locales*
      - optional string or array that defines the locale for the order.
      - The available values are documented in [Intl.Collator]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/ Reference/Global_Objects/Intl/Collator).
      - Default is `undefined` which selects the local default locale.
    - *groupCase*
      - optional boolean.
      - Set `true` to group block names in the order: UPPER, Camel, and lower. In other words, upper case names like constants come first, then names with the first letter capitalized, like class names, and finally the names in lower case, such as methods and properties.
      - Default is `false`. Note that the default might flip in the next major release.


<p style="margin-bottom: 0"><strong>Returns:</strong></p>

- a function, a decorator function.


Source: [alphabetical.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/alphabetical.js)

<a name="yamdogdecoratorsbacktoplinks"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[backTopLinks](#yamdogdecoratorsbacktoplinks)(opts)

Extends the last block with a link back to the top of the page.

<p style="margin-bottom: 0"><strong>Parameters:</strong></p>

- *opts*
  - optional object with properties:
    - *label*
      - optional string. Default is `'&uarr; Back To Top'`


<p style="margin-bottom: 0"><strong>Returns:</strong></p>

- a function, a decorator function.


Source: [backTopLinks.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/backTopLinks.js)

<a name="yamdogdecoratorsboldkeywords"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[boldKeywords](#yamdogdecoratorsboldkeywords)(keywords)

Bolds the given keywords with [Markdown](https://daringfireball.net/projects/markdown/) double asterisk syntax.

<p style="margin-bottom: 0"><strong>Parameters:</strong></p>

- *keywords*
  - array of strings or RegExp objects


<p style="margin-bottom: 0"><strong>Returns:</strong></p>

- a function, a decorator function.


Source: [boldKeywords.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/boldKeywords.js)

<a name="yamdogdecoratorsboldlisttitles"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[boldListTitles](#yamdogdecoratorsboldlisttitles)()

Bolds the first line of all lists with
[Markdown](https://daringfireball.net/projects/markdown/) double asterisk syntax.

<p style="margin-bottom: 0"><strong>Returns:</strong></p>

- a function, a decorator function.


Source: [boldListTitles.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/boldListTitles.js)

<a name="yamdogdecoratorsitalicsingles"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[italicSingles](#yamdogdecoratorsitalicsingles)()

This decorator emphasizes list items that contain only a single word.
This can be used to make parameter names and property names stand out.

For example the list items "foobar", "fooBar", and "foo_bar"
would be emphasized but the values "foo bar", "foo.bar", and "foo:"
would not. See [yamdog.decorators.replaceListValues](#yamdogdecoratorsreplacelistvalues) for customization.

<p style="margin-bottom: 0"><strong>Returns:</strong></p>

- a function, a decorator function.


Source: [italicSingles.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/italicSingles.js)

<a name="yamdogdecoratorslinkkeywords"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[linkKeywords](#yamdogdecoratorslinkkeywords)(keywordToUrl)

Create links for keyword occurrences in text.
Searches block contents for the given keywords names
and replaces each keyword match with a link to the matching URL.
The decorator skips occurrences in preformatted text sections.

<p style="margin-bottom: 0"><strong>Parameters:</strong></p>

- *keywordToUrl*
  - an object where keys are keywords and values are URLs.


**Example:**
```
linkKeywords({
  'point2d': 'geometry/point2d.html',
  'point3d': '#geometrypoint3d'
})
```

<p style="margin-bottom: 0"><strong>Returns:</strong></p>

- a function, a decorator function.


Source: [linkKeywords.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/linkKeywords.js)

<a name="yamdogdecoratorslinknames"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[linkNames](#yamdogdecoratorslinknames)()

Easy way to create internal links for block name occurrences in text.
Searches block contents for block names and replaces each match with
a link to the block with matching name.
This decorator skips occurrences in preformatted text sections.

<p style="margin-bottom: 0"><strong>Returns:</strong></p>

- a function, a decorator function.


Source: [linkNames.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/linkNames.js)

<a name="yamdogdecoratorsreplace"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[replace](#yamdogdecoratorsreplace)(rules)

Replaces the given patterns in text and lists
by using [String.prototype.replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace).
This decorator skips matches in preformatted text sections and
block names.

<p style="margin-bottom: 0"><strong>Parameters:</strong></p>

- *rules*
  - array of replacement rule objects `{ pattern, replacement }` where
    - *pattern*
      - a string or RegExp object
    - *replacement*
      - a string


<p style="margin-bottom: 0"><strong>Returns:</strong></p>

- a function, a decorator function.


Source: [replace.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/replace.js)

<a name="yamdogdecoratorsreplacelistvalues"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[replaceListValues](#yamdogdecoratorsreplacelistvalues)(config)

Replaces all list values according to given rules.
Applies [String.prototype.replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)() for each list value.

<p style="margin-bottom: 0"><strong>Parameters:</strong></p>

- *config*
  - object with properties:
    - *rules*
      - array of replacement rule objects `{ pattern, replacement }`
    - *minDepth*
      - optional integer. Default is `0`. Value of `1` means the root list item is skipped.
    - *maxDepth*
      - optional integer. Default is `Infinity`. Value of `1` means that list items at depth 2 and beyond are skipped.


<p style="margin-bottom: 0"><strong>Returns:</strong></p>

- a function, a decorator function.


Source: [replaceListValues.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/replaceListValues.js)

<a name="yamdogdecoratorssourcelinks"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[sourceLinks](#yamdogdecoratorssourcelinks)(config)

This decorator extends each block
with a paragraph that contains a link to the source code file.

Yamdog is aware of the absolute file paths of blocks.
In order to convert these paths to URLs, you need to specify
what part of the file path needs to be replaced with a URL prefix.

<p style="margin-bottom: 0"><strong>Parameters:</strong></p>

- *config*
  - object with properties:
    - *basePath*
      - a string. The part in absolute file paths to replace with base URL.
      - For example `'/home/johndoe/myproject'`
    - *baseUrl*
      - a string. The prefix to add in place of the base path.
      - For example `'https://www.example.org/docs'`
    - *label*
      - optional string. Default is `'Source: '`.


<p style="margin-bottom: 0"><strong>Returns:</strong></p>

- a function, a decorator function.


**Example:**
```
yamdog.decorators.sourceLinks({
  basePath: path.resolve(__dirname, '..'),
  baseUrl: 'https://github.com/axelpale/yamdog/blob/main/'
}),
```

Source: [sourceLinks.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/sourceLinks.js)

<a name="yamdogdecoratorstoc"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[toc](#yamdogdecoratorstoc)(config)

Create and insert a table of contents (ToC) for each block
that has child blocks.
The parent-child relationships are determined by the block names.
For example the block `yamdog.decorators` is a child of block `yamdog`,
and the block `yamdog.decorators.toc` is a child of `yamdog.decorators`.
However, `yamdogbone` would **not** be a child of `yamdog` because of
the missing separator. Allowed separator characters are `- .:#/`.

<p style="margin-bottom: 0"><strong>Parameters:</strong></p>

- *config*
  - optional object with properties:
    - *title*
      - optional string, the line before the ToC list.
      - Default is the empty string `''`, meaning that ToC lists have no title.
    - *depth*
      - optional integer, the depth per table. Default is `1`.


<p style="margin-bottom: 0"><strong>Returns:</strong></p>

- a function, a decorator function.


Source: [toc.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/toc.js)

<a name="yamdoggenerate"></a>
## [yamdog](#yamdog).[generate](#yamdoggenerate)(config)

Generate the API documentation and save as [Markdown](https://daringfireball.net/projects/markdown/) document.
Internally uses [yamdog.parse](#yamdogparse), [yamdog.decorate](#yamdogdecorate), and [yamdog.render](#yamdogrender),
in this order.

<p style="margin-bottom: 0"><strong>Parameters:</strong></p>

- *config*
  - an object with properties
    - *entry*
      - string, an absolute directory or file path. The location of the module to be documented. All relative require and import statements like `var lib = require('./lib')` are followed in the order they occur in the code. Absolute or named imports like `var _ = require('lodash')` and `import baz from 'foo/bar'` are skipped.
    - *output*
      - a string, an absolute path to the target file to generate. For example `'/home/xeli/projects/yamdog/API.md'`.
    - *earmark*
      - optional string, default is `'@'`. The earmark prefix to look for in the beginning of comment blocks. The matching blocks will be included to the docs. The rest of the line becomes the name of the doc block. The earmark is usually a character like `#` or `@` but can be longer.
    - *names*
      - optional array of string. Specifies a filter to include only the blocks with a name that begins with one of the names in the array.
      - optional object of strings. Specifies a filter and a mapping from allowed names to their full names. This becomes handy if you feel it tedious to write long sequences of namespaces in your names like `foo.bar.baz.biz()` instead of `baz.biz()`. By setting names { baz: 'foo.bar.baz', ... } you still ensure that `baz.biz()` is treated and positioned in the doc as the full name would.
    - *title*
      - optional string, the document title and main heading. Default is `'API Documentation'`.
    - *intro*
      - optional string, the introduction paragraph. Default is `''`.
    - *decorators*
      - array of decorator functions. Default is `[]`.
    - *silent*
      - boolean. Disable console output. Default is `false`.


Source: [generate.js](https://github.com/axelpale/yamdog/blob/main/lib/generate.js)

<a name="yamdogparse"></a>
## [yamdog](#yamdog).[parse](#yamdogparse)(mod)

Parse doc block objects from code.

<p style="margin-bottom: 0"><strong>Parameters:</strong></p>

- *mod*
  - *earmark*
    - a string, the earmark prefix, for example `@`. Comment blocks that begin with this prefix will be included.
  - *names*
    - an array of strings, to specify valid names. The comment block that has a name that begins with one of the names in the array, will be included.
    - an object of strings, to specify multiple valid names as keys and their extended full names as values.
  - *path*
    - a string, an absolute directory or file path to the module


<p style="margin-bottom: 0"><strong>Returns:</strong></p>

- an array of doc block objects.


<p style="margin-bottom: 0">A parsed doc block object has properties:</p>

- *file*
  - a string, the absolute file path that contains the block.
- *signature*
  - a string, the call signature e.g. `'mylib.myfun(param)'`. The signature is equivalent to shortName + postfix. Signatures are especially used in headings.
- *name*
  - a string, the unit name derived from the call signature. For example `'mylib.myfun'`
- *postfix*
  - a string, the remainder of the signature after the name. For example `'(param)'`
- *nameParts*
  - array of objects with properties:
    - *label*
      - a string, the part single name e.g. `'myfun'`
    - *name*
      - a string, the full name of the part e.g. `'mylib.myfun'`
    - *hash*
      - a string, the nav hash for the part full name e.g. `'mylibmyfun'`
    - *prefix*
      - a string, the separator character found before the label. For example `'.'`
- *shortName*
  - a string, the original name of the block before possible name extensions caused by earmark name mapping.
- *hash*
  - string, an URL friendly hash derived from the name e.g. 'mylibmyfun'
- *aliases*
  - array of alias objects `{ hash, name, postfix, nameParts, shortName, signature }` containing navigational data about blocks that are aliases of this block.
- *paragraphs*
  - array of paragraph objects { type, body }


If a module file is not found, it will be skipped without error.

![Ball Skipping](docs/yamdog_boink_ball.png)

Aliases: [yamdog.stringify](#yamdogstringify)

Source: [parse/index.js](https://github.com/axelpale/yamdog/blob/main/lib/parse/index.js)

<a name="yamdogrender"></a>
## [yamdog](#yamdog).[render](#yamdogrender)(blocks, options)

Render the blocks in [Markdown](https://daringfireball.net/projects/markdown/).

<p style="margin-bottom: 0"><strong>Parameters:</strong></p>

- *blocks*
  - parsed blocks
- *options*
  - *title*
    - optional string, default is `'API Reference'`.
  - *intro*
    - optional string, default is `''`.


<p style="margin-bottom: 0"><strong>Returns:</strong></p>

- string, in [Markdown](https://daringfireball.net/projects/markdown/) syntax.


Source: [render/index.js](https://github.com/axelpale/yamdog/blob/main/lib/render/index.js)

<a name="yamdogstringify"></a>
## [yamdog](#yamdog).[stringify](#yamdogstringify)(mod)

Alias of [yamdog.parse](#yamdogparse)

<p style="text-align: right">
<a href="#top">&uarr; Back To Top</a>
</p>

