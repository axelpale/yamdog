<a name="top"></a>
# Yamdog API Docs

Welcome to Yamdog v1.4.0 API documentation. This document is generated with Yamdog itself, of course. See [docs/generate.js](https://github.com/axelpale/yamdog/blob/main/docs/generate.js) for the recipe.

![Two bones](docs/yamdog_two_bones.png)


<a name="yamdog"></a>
## [yamdog](#yamdog)

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
## [yamdog](#yamdog).[decorate](#yamdogdecorate)(blocks, decorators)

Decorate parsed blocks. The list of decorator functions are applied to
each block in the given order. See [yamdog.decorators](#yamdogdecorators) for available
built-in decorator functions.

**Parameters:**
- *blocks*
  - array of parsed blocks
- *decorators*
  - array of decorator functions

**Returns:**
- array of new decorated block objects

Source: [decorate/index.js](https://github.com/axelpale/yamdog/blob/main/lib/decorate/index.js)

<a name="yamdogdecorators"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators)

The default docs output is a bit dull.

With decorators you can style the document in various ways.
See [custom decorators](#yamdogdecoratorsaboutcustomdecorators) for more info on
how decorator functions work and how to create your own decorators.


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

Creates a decorator function that appends paragraphs for aliases.

**Parameters:**
- *opts*
  - optional object with props:
    - *aliasesLabel*
      - optional string, default 'Aliases: '. For the primary unit.
    - *aliasOfLabel*
      - optional string, default 'Alias of '. For the alias-only units.

**Returns:**
- a function, a decorator function.

Source: [aliases.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/aliases.js)

<a name="yamdogdecoratorsalphabetical"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[alphabetical](#yamdogdecoratorsalphabetical)(opts)

Sort blocks in alphabetical order.

**Parameters:**
- *opts*
  - optional object with properties:
    - *locales*
      - optional string or array that defines the locale for the order.
      - The available values are documented in [Intl.Collator]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/ Reference/Global_Objects/Intl/Collator).
      - Default is `undefined` which selects the local default locale.
    - *groupCase*
      - optional boolean. Set true to group block names in the order: UPPER, Camel, and lower. In other words, upper case names like constants come first, then names with the first letter capitalized, like class names, and finally the names in lower case, such as methods and properties.
      - Default is `false`. Note that the default might flip in the next major release.

**Returns:**
- a function, a decorator function.

Source: [alphabetical.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/alphabetical.js)

<a name="yamdogdecoratorsbacktoplinks"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[backTopLinks](#yamdogdecoratorsbacktoplinks)(opts)

Extends the last block with a link back to the top of the page.
In future versions this decorator might be upgraded to add back
links also at every 10th block or so.

**Parameters:**
- *opts*
  - optional object with props:
    - *label*
      - optional string. Default '&uarr; Back To Top'

**Returns:**
- a function, a decorator function.

Source: [backTopLinks.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/backTopLinks.js)

<a name="yamdogdecoratorsboldkeywords"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[boldKeywords](#yamdogdecoratorsboldkeywords)(keywords)

Bolds the given keywords with Markdown &ast;&ast;bold&ast;&ast; syntax.

**Parameters:**
- *keywords*
  - array of strings or regexp objects

**Returns:**
- a function, a decorator function.

Source: [boldKeywords.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/boldKeywords.js)

<a name="yamdogdecoratorsboldlisttitles"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[boldListTitles](#yamdogdecoratorsboldlisttitles)()

Bolds the first line of all lists with
Markdown &ast;&ast;bold&ast;&ast; syntax.

**Returns:**
- a function, a decorator function.

Source: [boldListTitles.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/boldListTitles.js)

<a name="yamdogdecoratorsitalicsingles"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[italicSingles](#yamdogdecoratorsitalicsingles)()

Emphasizes list item values that contain only a single word.
This can be used to make parameter names and property names stand out.

For example the list values "foobar", "fooBar", and "foo_bar"
would be emphasized but the values "foo bar", "foo.bar", and "foo:"
would not. See [yamdog.decorators.replaceListValues](#yamdogdecoratorsreplacelistvalues) for customization.

**Returns:**
- a function, a decorator function.

Source: [italicSingles.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/italicSingles.js)

<a name="yamdogdecoratorslinkkeywords"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[linkKeywords](#yamdogdecoratorslinkkeywords)(keywordToUrl)

Create links for keyword occurrences in text.
Searches block contents for the given keywords names
and replaces each keyword match with a link to the matching URL.
Skips preformatted text sections.

**Parameters:**
- *keywordToUrl*
  - an object where keys are keywords and values are URLs.

**Example:**
```
linkKeywords({
  'point2d': 'geometry/point2d.html',
  'point3d': '#geometrypoint3d'
})
```

**Returns:**
- a function, a decorator function.

Source: [linkKeywords.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/linkKeywords.js)

<a name="yamdogdecoratorslinknames"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[linkNames](#yamdogdecoratorslinknames)()

Easy way to create internal links for block name occurrences in text.
Searches block contents for block names and replaces each match with
a link to the block heading anchor.
Skips preformatted text.

**Returns:**
- a function, a decorator function.

Source: [linkNames.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/linkNames.js)

<a name="yamdogdecoratorsreplace"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[replace](#yamdogdecoratorsreplace)(rules)

Replaces the given patterns in text and lists
by using [String.prototype.replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace).
Skips preformatted text sections, block names, and block signatures.

**Parameters:**
- *rules*
  - array of replacement rule objects { pattern, replacement }

**Returns:**
- a function, a decorator function.

Source: [replace.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/replace.js)

<a name="yamdogdecoratorsreplacelistvalues"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[replaceListValues](#yamdogdecoratorsreplacelistvalues)(config)

Replaces all list values according to given rules.
Uses applies [String.prototype.replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)() for each list value.

**Parameters:**
- *config*
  - object with properties:
    - *rules*
      - array of replacement rule objects { pattern, replacement }
    - *minDepth*
      - optional integer. Default 0. Value of 1 means the root list item is skipped.
    - *maxDepth*
      - optional integer. Default Infinity. Value of 1 means that list items at depth 2 and beyond are skipped.

**Returns:**
- a function, a decorator function.

Source: [replaceListValues.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/replaceListValues.js)

<a name="yamdogdecoratorssourcelinks"></a>
## [yamdog](#yamdog).[decorators](#yamdogdecorators).[sourceLinks](#yamdogdecoratorssourcelinks)(config)

Creates a decorator function that extends each block
with a paragraph that contains a link to the source code.

**Parameters:**
- *config*
  - object with props:
    - *basePath*
      - string, the dir path to trim away from abs file paths.
    - *baseUrl*
      - string, the URL to prefix the paths.
    - *label*
      - optional string, default 'Source: '.

**Returns:**
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

Create and insert table of contents for each module that has child blocks.
The parent-child relationships are determined by the block names.
For example the block "yamdog.decorators" is a child of block "yamdog",
and the block "yamdog.decorators.toc" is a child of "yamdog.decorators".
However, "yamdogbone" would **not** be a child of "yamdog" because of
the missing separator. Allowed separator characters are `- .:#/`.

**Parameters:**
- *config*
  - optional object with properties:
    - *title*
      - optional string, the line before the ToC list.
      - Default is '' meaning that no titles are rendered before lists.
    - *depth*
      - optional integer, the depth per table. Default 1.

**Returns:**
- a function, a decorator function.

Source: [toc.js](https://github.com/axelpale/yamdog/blob/main/lib/decorators/toc.js)

<a name="yamdoggenerate"></a>
## [yamdog](#yamdog).[generate](#yamdoggenerate)(config)

Generate the API documentation and save as Markdown document.
Internally uses [yamdog.parse](#yamdogparse), [yamdog.decorate](#yamdogdecorate), and [yamdog.render](#yamdogrender),
in this order.

**Parameters:**
- *config*
  - object with properties
    - *entry*
      - string, an absolute directory or file path. The location of the module to be documented. All relative require and import statements like `var lib = require('./lib')` are followed in the order they occur in the code. Absolute or named imports like `var _ = require('lodash')` and `import baz from 'foo/bar'` are skipped.
    - *output*
      - string, an absolute path to the target file to generate. For example '/home/xeli/projects/yamdog/API.md'.
    - *earmark*
      - string, the earmark signature to look for in the comment blocks to include to the documentation. The earmark is usually the module name like `mylib`. It does not need to match the real package name but it must match the signature used in the comments.
      - OR an array of strings, for multiple alternative earmarks.
      - OR an object of strings, for multiple alternative earmarks with their full names. This becomes handy if you feel it tedious to write the full sequence of namespaces in your signatures like `foo.bar.baz.biz()` instead of `baz.biz()`. By setting earmark { baz: 'foo.bar.baz', ... } you still ensure that `baz.biz()` is treated and positioned in the doc as the full name would.
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

**Parameters:**
- *mod*
  - *earmark*
    - a string, the earmark signature, for example the module name. Comment blocks that begin with this signature will be included.
    - OR an array of strings, to specify multiple valid earmarks.
    - OR an object of strings, to specify multiple valid earmarks as keys and their extended full names as values.
  - *path*
    - string, absolute directory or file path to the module

**Returns:**
- an array of doc block objects.

A parsed doc block object has properties:
- *file*
  - string, the absolute file path that contains the block.
- *signature*
  - string, the call signature e.g. 'mylib.myfun(param)'. The signature is equivalent to shortName + postfix. Signatures are especially used in headings.
- *name*
  - string, the unit name derived from the call signature. e.g. 'mylib.myfun'
- *postfix*
  - string, the remainder of the signature after the name. e.g. '(param)'
- *nameParts*
  - array of objects with properties:
    - *label*
      - string, the part single name e.g. 'myfun'
    - *name*
      - string, the full name of the part e.g. 'mylib.myfun'
    - *hash*
      - string, the nav hash for the part full name e.g. 'mylibmyfun'
    - *prefix*
      - string, the separator character found before the label e.g. '.'
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

Render API docs in Markdown.

**Parameters:**
- *blocks*
  - parsed blocks
- *options*
  - *title*
    - optional string, default 'API Reference'.
  - *intro*
    - optional string, default ''.

**Returns:**
- string, in Markdown syntax.

Source: [render/index.js](https://github.com/axelpale/yamdog/blob/main/lib/render/index.js)

<a name="yamdogstringify"></a>
## [yamdog](#yamdog).[stringify](#yamdogstringify)(mod)

Alias of [yamdog.parse](#yamdogparse)

Source: [parse/index.js](https://github.com/axelpale/yamdog/blob/main/lib/parse/index.js)

<p style="text-align: right">
<a href="#top">&uarr; Back To Top</a>
</p>

