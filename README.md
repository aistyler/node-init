# node-init

NodeJS project initializer

## Usage

- basic usage using [npx](https://www.npmjs.com/package/npx)

```sh
npx aistyler/node-init {node-init-package-repository} [glob pattern to be copied]

# e.g. 1
npx aistyler/node-init aistyler/node-init-typescript "packages/react/**"

# e.g. 2
npx aistyler/node-init aistyler/node-init-typescript "packages/lint/**" "packages/lint/.*"
```

- command line help output

```txt
Usage: node-init [options] [git-repo-url] [glob-patterns ...]

Options:
      --version  Show version number                                   [boolean]
  -r, --ref      git reference to be donwloaded                         [string]
  -V, --verbose  verbose output                       [boolean] [default: false]
  -f, --force    Overwrite the existing files         [boolean] [default: false]
  -d, --dryrun   Dry run                              [boolean] [default: false]
  -o, --outdir   Output directory                       [string] [default: "./"]
  -h             Show help                                             [boolean]

Examples:
  node-init github:aistyler/node-init/main
```

## Glob pattern

* Wildcards (`**`, `*.js`)
* Negation (`'!a/*.js'`, `'*!(b).js']`)
* [extglobs](#extglobs) (`+(x|y)`, `!(a|b)`)
* [POSIX character classes](#posix-bracket-expressions) (`[[:alpha:][:digit:]]`)
* [brace expansion](https://github.com/micromatch/braces) (`foo/{1..5}.md`, `bar/{a,b,c}.js`)
* regex character classes (`foo-[1-5].js`)
* regex logical "or" (`foo/(abc|xyz).js`)

* See [Matching features in micromatch](https://github.com/micromatch/micromatch#matching-features) for details
