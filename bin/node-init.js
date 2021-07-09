#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv))
.usage("Usage: $0 [options] [git-repo-url]")
.example("$0 https://github.com/aistyler/node-init.git")
.alias("o", "options")
.describe("o", "options for init")
.demandCommand(1)
.help('h')
.epilog('copyright 2019')
.argv;

console.log(">>>", argv);



