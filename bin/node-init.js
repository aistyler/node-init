#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const { downloadFromGithub } = require("../lib/github");

const argv = yargs(hideBin(process.argv))
              .usage("Usage: $0 [options] [git-repo-url]")
              .example("$0 github:aistyler/node-init/main")
              .options({
                "f": {
                  alias: "force",
                  default: false,
                  describe: "Overwrite the existing files",
                  type: "boolean",
                },
                "o": {
                  alias: "outdir",
                  default: "./",
                  describe: "Output directory",
                  type: "string",
                }
              })
              .demandCommand(1)
              .help('h')
              .epilog('copyright 2019')
              .argv;

//console.log(argv);
(async() => await downloadFromGithub(argv._[0], {
  force: argv.force,
  outdir: argv.outdir,
}))();
