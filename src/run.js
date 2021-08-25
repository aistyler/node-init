const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const { downloadFromGithub } = require("./lib/github");

const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 [options] [git-repository] [glob-patterns ...]")
  .example("$0 aistyler/yanc/main '**'")
  .options({
    "b": {
      alias: "branch",
      describe: "target branch name. e.g. 'master'",
      type: "string",
    },
    "t": {
      alias: "tag",
      describe: "target tag name. e.g. 'v1.0.0'",
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
      describe: "*overwrite* the existing files",
      type: "boolean",
    },
    "d": {
      alias: "dryrun",
      default: false,
      describe: "Dry run",
      type: "boolean",
    },
    "topLevelDot": {
      default: true,
      describe: "include top-level dot(.) files",
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
  argv._[0],        // github repository
  argv._.slice(1),  // glob patterns
  {                 // options
    branch: argv.branch,
    tag: argv.tag,
    verbose: argv.verbose,
    force: argv.force,
    dryrun: argv.dryrun,
    topLevelDot: argv.topLevelDot,
    outdir: argv.outdir,
  }
))();
