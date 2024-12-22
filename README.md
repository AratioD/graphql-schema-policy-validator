# graphql-schema-linter

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/clits
```

This project purpose is to provide graphql schema linter which is

* easy to config and set up
* which provides largest prefined rules and possibilities to fine tune your schema rules
* works in commit hooks and ci/cd pipelines

The file `graphql-schema-linter-config.ts`
contains all project specific config paramters.project

* What you need to define is your schema location.

* your custom rules file path,

* your build in rules what you are using in your schema.

This project was created using `bun init` in bun v1.1.40. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
