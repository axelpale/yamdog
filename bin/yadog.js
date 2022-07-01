#!/usr/bin/env node

const gv = require('../lib/genversion')
const v = require('../lib/version')
const commander = require('commander')
const path = require('path')

// Setup
const program = commander.program

program
  .version(v, '-V, --version', 'output yadog version')
  .arguments('<target>')
  .description('Generate API documentation for a CommonJS project.')
  .option('-v, --verbose', 'increased output verbosity')
  .action((target, cliOpts) => {
    if (typeof target !== 'string' || target === '') {
      console.error('Missing argument: target')
      return process.exit(1)
    }

    // Short alias for verbosity as we use it a lot
    const verbose = cliOpts.verbose
    // Options
    const opts = {
      // TODO if needed
    }

    // Assume we are at the project root.

    console.log('hello yadog')
  })

// Additional newline after help
program.addHelpText('after', ' ')

program.parse(process.argv)

if (program.args.length === 0) {
  console.error('ERROR: Missing argument <target>')
  program.outputHelp()
}
