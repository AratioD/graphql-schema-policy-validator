# graphql-schema-policy-validator

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/clits
```

This project purpose is to provide `graphql-schema-policy-validator`. The tool guard your project/team/company defined schema policy. If there is something which breaks the policy the tool will show a warning or error

* easy to config and set up
* the tool provides largest prefined rules and possibilities to guard your schema policy
* works in commit hooks and ci/cd pipelines

In the file `graphql-schema-policy-validator-config.ts`
 you can define all project specific config parameters.

* You need to define your schema location.
* Your custom rules file path
* Your build in rules what you are using in your schema.
