---

# graphql-schema-policy-validator

The tool is now under initial development. The goal is to provide a CLI tool that validates
a GraphQL schema against a set of predefined rules and policies.

## Installation

To install the dependencies, run:

```bash
bun install
```

## Usage

To validate a GraphQL schema against the standard rule set, use the following command:

```bash
bun run src/cli.ts validate ./demoSchema validation-rule-config.json
```

### Arguments

- `./demoSchema`: Path to the GraphQL schema file or directory you want to validate. In your project you will use your own schema file or directory.
- `validation-rule-config.json`: Configuration file containing the rules and policies for validation.

## Purpose

The `graphql-schema-policy-validator` is a tool designed to ensure compliance with your project, team, or company's schema policies. It validates GraphQL schemas against predefined rules and throws errors if any violations are detected.

This helps maintain consistency, enforce standards, and ensure adherence to best practices across your GraphQL API development.

## Supported Rules

You can define all project-specific configuration parameters in the `validation-rule-config.json` file.

Example `validation-rule-config.json`:

```json
{
  "rules": {
    "validateSubscriptionType": true,
    "validateSubscriptionFields": true,
    "validateQueryType": true,
    "validateQueryFields": true,
    "validateMutationType": true,
    "validateMutationFields": true,
    "validateTypeType": true,
    "validateBasicTypeFields": true
  }
}
```

## Supported Rules

These rules ensure that the schema types and fields are properly documented:

- `validateSubscriptionType`: Ensures that subscription types are documented.
- `validateSubscriptionFields`: Ensures that subscription fields are documented.
- `validateQueryType`: Ensures that query types are documented.
- `validateQueryFields`: Ensures that query fields are documented.
- `validateMutationType`: Ensures that mutation types are documented.
- `validateMutationFields`: Ensures that mutation fields are documented.
- `validateTypeType`: Ensures that custom types are documented.
- `validateBasicTypeFields`: Ensures that basic type fields are documented.

## Contributing

Contributions to the `graphql-schema-policy-validator` are welcome! Feel free to submit issues, feature requests, or pull requests to help improve the project.
