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
  'test-ruleConfig.json',
)
const invalidSchemaPath = path.resolve(
  __dirname,
  'fixtures',
  'invalid-schema.graphql',
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

  // test('should fail on an invalid schema', (done) => {
  //   exec(
  //     `bun ${cliPath} validate ${invalidSchemaPath}`,
  //     (error, stdout, stderr) => {
  //       expect(error).not.toBeNull()
  //       expect(stdout).toBe('')
  //       expect(stderr).toContain(
  //         `❌ Failed to load schema: ${invalidSchemaPath}`,
  //       )
  //       done()
  //     },
  //   )
  // })
  //
  // test('should display help information', (done) => {
  //   exec(`bun ${cliPath} --help`, (error, stdout, stderr) => {
  //     expect(error).toBeNull()
  //     expect(stderr).toBe('')
  //     expect(stdout).toContain('CLI tool for validating your schema policy')
  //     done()
  //   })
  // })
})

describe('Math Operations', () => {
  test('adds two numbers', () => {
    expect(1 + 1).toBe(2)
  })

  test('subtracts two numbers', () => {
    expect(5 - 3).toBe(2)
  })
})
