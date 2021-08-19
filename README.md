# node-init

NodeJS project initializer

## Usage

```sh
npx aistyler/node-init {node-init-package-repository} [glob pattern to be copied]

# e.g. 1
npx aistyler/node-init aistyler/node-init-typescript "packages/react/**"

# e.g. 2
npx aistyler/node-init aistyler/node-init-typescript "packages/lint/**" "packages/lint/.*"
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
