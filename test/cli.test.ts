import { describe, it, expect } from 'bun:test'
import { validateSchema } from '../src/cli'

describe('validateSchema', () => {
  it('should load and validate the schema successfully', async () => {
    const schemaPath = 'demoSchema/root.graphql'
    expect(validateSchema(schemaPath)).resolves.not.toThrow()
  })

  it('should fail to load an invalid schema', async () => {
    const invalidSchemaPath = 'path/to/invalid/schema.graphql'
    console.log('kisa')
    expect(validateSchema(invalidSchemaPath)).rejects.toThrow()
  })
})
