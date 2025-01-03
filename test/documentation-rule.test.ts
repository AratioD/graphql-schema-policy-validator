import { describe, expect, test } from 'bun:test'
import { exec } from 'node:child_process'
import path from 'node:path'

const cliPath = path.resolve(__dirname, '../src/cli.ts')

describe('Documentation Tests When All Values Are False', () => {
  test('should validate that all parameter is false', (done) => {
    const schemaPath = path.resolve(
      __dirname,
      'fixtures',
      'valid-schema.graphql',
    )

    const configPath = path.resolve(
      __dirname,
      'fixtures',
      'all-rules-false-config-test.json',
    )
    exec(
      `bun ${cliPath} validate ${schemaPath} ${configPath}`,
      (error, stdout, stderr) => {
        expect(stdout).toContain(`✅ Schema loaded successfully: ${schemaPath}`)
        expect(stderr).toBe('')
        done()
      },
    )
  })
})

describe('Type Subscription Documentation Tests', () => {
  test('should validate subscription type when validateSubscriptionType is true', (done) => {
    const schemaPath = path.resolve(
      __dirname,
      'fixtures',
      'subscription-type-schema-test.graphql',
    )

    const configPath = path.resolve(
      __dirname,
      'fixtures',
      'subscription-type-rule-config-test.json',
    )
    exec(
      `bun ${cliPath} validate ${schemaPath} ${configPath}`,
      (error, stdout, stderr) => {
        expect(stdout).toContain(`✅ Schema loaded successfully: ${schemaPath}`)
        expect(stderr).toBe(
          '❌ Documentation validation failed:\n  - Type: subscription is missing description from row → 1\n',
        )
        done()
      },
    )
  })
  test('should validate subscription fields when validateSubscriptionFields is true', (done) => {
    const schemaPath = path.resolve(
      __dirname,
      'fixtures',
      'subscription-fields-schema-test.graphql',
    )

    const configPath = path.resolve(
      __dirname,
      'fixtures',
      'subscription-fields-rule-config-test.json',
    )
    exec(
      `bun ${cliPath} validate ${schemaPath} ${configPath}`,
      (error, stdout, stderr) => {
        expect(stdout).toContain(`✅ Schema loaded successfully: ${schemaPath}`)
        expect(stderr).toBe(
          '❌ Documentation validation failed:\n  - Field: "Subscription.snackAdded" is missing description from row → 3\n',
        )
        done()
      },
    )
  })
})

describe('Type Query Documentation Tests', () => {
  test('should validate Query type when validateQueryType is true', (done) => {
    const schemaPath = path.resolve(
      __dirname,
      'fixtures',
      'query-type-rule-schema-test.graphql',
    )

    const configPath = path.resolve(
      __dirname,
      'fixtures',
      'query-type-rule-config-test.json',
    )
    exec(
      `bun ${cliPath} validate ${schemaPath} ${configPath}`,
      (error, stdout, stderr) => {
        expect(stdout).toContain(`✅ Schema loaded successfully: ${schemaPath}`)
        expect(stderr).toBe(
          '❌ Documentation validation failed:\n  - Type: Query is missing description from row → 1\n',
        )
        done()
      },
    )
  })

  test('should validate Query fields when validateQueryFields is true', (done) => {
    const schemaPath = path.resolve(
      __dirname,
      'fixtures',
      'query-fields-rule-schema-test.graphql',
    )

    const configPath = path.resolve(
      __dirname,
      'fixtures',
      'query-fields-rule-config-test.json',
    )
    exec(
      `bun ${cliPath} validate ${schemaPath} ${configPath}`,
      (error, stdout, stderr) => {
        expect(stdout).toContain(`✅ Schema loaded successfully: ${schemaPath}`)
        expect(stderr).toBe(
          '❌ Documentation validation failed:\n  - Field: "Query.snacks" is missing description from row → 3\n',
        )
        done()
      },
    )
  })
})
