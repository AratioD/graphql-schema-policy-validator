import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'
import { program } from 'commander'
import type { GraphQLSchema } from 'graphql'

import {
  validateSubscriptionFields,
  validateSubscriptionType,
} from './validate/documentation'

export const validateSchema = async (schemaPath: string) => {
  try {
    const schema = await loadSchema(schemaPath, {
      loaders: [new GraphQLFileLoader()],
    })
    console.log(`✅ Schema loaded successfully: ${schemaPath}`)
    await validate(schema)
  } catch (error) {
    console.error(`❌ Failed to load schema: ${schemaPath}`)

    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(String(error))
    }

    process.exit(1)
  }
}

const validate = async (schema: GraphQLSchema) => {
  await validateSubscriptionType(schema)
  await validateSubscriptionFields(schema)
}

program
  .name('graphql-schema-policy-validator')
  .description('CLI tool for validating your schema policy')
  .version('0.1.0')

program
  .command('validate')
  .alias('v')
  .argument('<schemaPath>', 'Path to the GraphQL schema file(s)')
  .description('Validate the specified GraphQL schema policy')
  .action(validateSchema)

program.parse(process.argv)
