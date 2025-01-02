import { describe, expect, test } from 'bun:test'
import { exec } from 'node:child_process'
import path from 'node:path'

const cliPath = path.resolve(__dirname, '../src/cli.ts')
const validSchemaPath = path.resolve(
  __dirname,
  'fixtures',
  'valid-schema.graphql',
)

const validConfigPath = path.resolve(
  __dirname,
  'fixtures',
  'test-validation-rule-config.json',
)

describe('graphql-schema-policy-validator CLI (Integration)', () => {
  test('should validate a valid schema', (done) => {
    exec(
      `bun ${cliPath} validate ${validSchemaPath} ${validConfigPath}`,
      (error, stdout, stderr) => {
        expect(error).toBeNull()
        expect(stdout).toContain(
          `✅ Schema loaded successfully: ${validSchemaPath}`,
        )
        expect(stderr).toBe('')
        done()
      },
    )
  })

  describe('Type Subscription Documentation Tests', () => {
    test('should validate subscription type when validateSubscriptionType is true', (done) => {
      const validSchemaPath = path.resolve(
        __dirname,
        'fixtures',
        'subscription-type-schema-test.graphql',
      )

      const validConfigPath = path.resolve(
        __dirname,
        'fixtures',
        'subscription-type-rule-config-test.json',
      )
      exec(
        `bun ${cliPath} validate ${validSchemaPath} ${validConfigPath}`,
        (error, stdout, stderr) => {
          expect(stdout).toContain(
            `✅ Schema loaded successfully: ${validSchemaPath}`,
          )
          console.log('this is my error -->', stderr)
          expect(stderr).toBe(
            '❌ Documentation validation failed:\n  - Type: subscription is missing description from row → 1\n',
          )
          done()
        },
      )
    })
    // test('should validate subscription type when validateSubscriptionType is false', (done) => {
    //   exec(
    //     `bun ${cliPath} validate ${validSchemaPath} ${validConfigPath}`,
    //     (error, stdout, stderr) => {
    //       expect(error).toBeNull()
    //       expect(stdout).toContain(
    //         `✅ Schema loaded successfully: ${validSchemaPath}`,
    //       )
    //       expect(stderr).toBe('')
    //       done()
    //     },
    //   )
    // })
    // test('should validate subscription field when validateSubscriptionFields is true', (done) => {
    //   exec(
    //     `bun ${cliPath} validate ${validSchemaPath} ${validConfigPath}`,
    //     (error, stdout, stderr) => {
    //       expect(error).toBeNull()
    //       expect(stdout).toContain(
    //         `✅ Schema loaded successfully: ${validSchemaPath}`,
    //       )
    //       expect(stderr).toBe('')
    //       done()
    //     },
    //   )
    // })
    // test('should validate subscription field when validateSubscriptionFields is false', (done) => {
    //   exec(
    //     `bun ${cliPath} validate ${validSchemaPath} ${validConfigPath}`,
    //     (error, stdout, stderr) => {
    //       expect(error).toBeNull()
    //       expect(stdout).toContain(
    //         `✅ Schema loaded successfully: ${validSchemaPath}`,
    //       )
    //       expect(stderr).toBe('')
    //       done()
    //     },
    //   )
    // })
  })
})
