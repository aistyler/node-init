const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const { downloadFromGithub } = require("./lib/github");

const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 [options] [git-repo-url] [glob-patterns ...]")
  .example("$0 github:aistyler/node-init/main")
  .options({
    "r": {
      alias: "ref",
      describe: "git reference to be donwloaded",
      type: "string",
    },
    "V": {
      alias: "verbose",
      default: false,
      describe: "verbose output",
      type: "boolean",
    },
    "f": {
      alias: "force",
      default: false,
      describe: "Overwrite the existing files",
      type: "boolean",
    },
    "d": {
      alias: "dryrun",
      default: false,
      describe: "Dry run",
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
(async() => await downloadFromGithub(
  argv._[0],        // github url
  argv._.slice(1),  // glob patterns
  {                 // options
    ref: argv.ref,
    verbose: argv.verbose,
    force: argv.force,
    dryrun: argv.dryrun,
    outdir: argv.outdir,
  }
))();
