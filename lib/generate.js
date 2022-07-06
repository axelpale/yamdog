const fs = require('fs')
const asyn = require('async')
const scrapeModule = require('./scrapeModule')

module.exports = (config) => {
  // yadog.generate(config)
  //
  // Generate the api documentation in a markdown file.
  //
  // Parameters:
  //   config
  //     object with properties
  //       target
  //         string, an absolute path to the target file to generate.
  //         .. For example '/home/xeli/projects/yadog/API.md'.
  //       modules
  //         array of CodeModule objects for which to generate documents.
  //       keywords TODO
  //         array of KeywordSubstitution objects.
  //       verbose TODO
  //         boolean. Enable console output. Default true.
  //
  // CodeModule object:
  //   title
  //     string. The heading.
  //   intro
  //     string. The first paragraph. For example 'Welcome to Yadog API docs'.
  //   name
  //     string. The module name as it is referred in code.
  //     .. For example 'yadog'
  //   path
  //     string. A path to the directory of the module.
  //     .. The generation is started from there.
  //
  // KeywordSubstitution object:
  //   keyword
  //     regexp match input
  //   replacement
  //     regexp match output
  //

  // Code modules to document
  const modules = config.modules
  // {
  //   // Main title
  //   title: 'Affineplane API Documentation',
  //   // Introduction; initial docs for consistency
  //   doc: 'Types and functions for affine 2D geometry.',
  //   // Package name
  //   name: 'affineplane',
  //   // Where to start
  //   path: path.resolve(__dirname, '../../lib')
  // }
  //

  // Where to save the generated markdown file
  const saveTo = config.target

  // Gather the documentation to this string
  let markdown = ''

  asyn.eachSeries(modules, (mod, next) => {
    // For each listed module

    // Search for docs in module index
    try {
      markdown += scrapeModule(mod)
    } catch (idxerr) {
      return next(idxerr)
    }

    return next()
  }, (err) => {
    // All modules processed or error occurs.
    if (err) {
      console.error(err)

      return
    }

    // Save
    fs.writeFile(saveTo, markdown, (werr) => {
      if (werr) {
        console.error(werr)

        return
      }

      console.log('API docs created successfully.')
      console.log('See ' + saveTo)
    })
  })
}
