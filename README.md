---

# graphql-schema-policy-validator

## Installation

To install the dependencies, run:

```bash
bun install
```

## Usage

To validate a GraphQL schema against the standard rule set, use the following command:

```bash
bun run src/cli.ts validate ./demoSchema ruleConfig.json
```

### Arguments

- `./demoSchema`: Path to the GraphQL schema file or directory you want to validate. In your project you will use your own schema file or directory.
- `ruleConfig.json`: Configuration file containing the rules and policies for validation.

## Purpose

The `graphql-schema-policy-validator` is a tool designed to ensure compliance with your project, team, or company's schema policies. It validates GraphQL schemas against predefined rules and throws errors if any violations are detected.

This helps maintain consistency, enforce standards, and ensure adherence to best practices across your GraphQL API development.

## Supported Rules

### Subscription Type Documentation

- Ensures that the `Subscription` type and its fields have proper documentation.

## Configuration

You can define all project-specific configuration parameters in the `ruleConfig.json` file.

Example `ruleConfig.json`:

```json
{
  "rules": {
    "validateSubscriptionType": true,
    "validateSubscriptionFields": true
  }
}
```

### Example File Structure

```plaintext
.
├── demoSchema/
│   ├── schema.graphql
├── ruleConfig.json
├── src/
│   ├── cli.ts
├── package.json
```

## Contributing

Contributions to the `graphql-schema-policy-validator` are welcome! Feel free to submit issues, feature requests, or pull requests to help improve the project.
