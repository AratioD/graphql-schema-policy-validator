import type { GraphQLObjectType, GraphQLSchema } from 'graphql'

export const validateSubscriptionType = async (
  schema: GraphQLSchema,
  errors: string[],
): Promise<void> => {
  console.log(
    'ℹ️ Validating properties of the GraphQL subscription type for the schema...',
  )

  const comment =
    schema.getSubscriptionType()?.astNode?.name?.loc?.startToken?.prev?.prev
      ?.value

  if (!comment) {
    const rowNumber =
      schema.getSubscriptionType()?.astNode?.name?.loc?.startToken?.prev?.line

    errors.push(
      `Type: subscription is missing description from row → ${rowNumber}`,
    )
  }
}

export const validateSubscriptionFields = async (
  schema: GraphQLSchema,
  errors: string[],
): Promise<void> => {
  console.log(
    'ℹ️ Validating properties of the GraphQL subscription fields for the schema...',
  )

  const subscriptionType = schema.getSubscriptionType()
  if (!subscriptionType) {
    console.log('Subscription type fields is not defined in the schema.')
    return
  }
  errors.push(...validateFields(subscriptionType))
}

export const validateQueryType = async (
  schema: GraphQLSchema,
  errors: string[],
) => {
  console.log(
    'ℹ️ Validating properties of the GraphQL Query type for the schema...',
  )

  const comment =
    schema.getQueryType()?.astNode?.name?.loc?.startToken?.prev?.prev?.value

  if (!comment) {
    const rowNumber =
      schema.getQueryType()?.astNode?.name?.loc?.startToken?.prev?.line

    errors.push(`Type: Query is missing description from row → ${rowNumber}`)
  }
  return errors
}

export const validateQueryFields = async (
  schema: GraphQLSchema,
  errors: string[],
): Promise<void> => {
  console.log(
    'ℹ️ Validating properties of the GraphQL Query fields for the schema...',
  )

  const queryType = schema.getQueryType()
  if (!queryType) {
    console.log('Query type fields is not defined in the schema.')
    return
  }

  errors.push(...validateFields(queryType))
}

export const validateMutationType = async (
  schema: GraphQLSchema,
  errors: string[],
): Promise<void> => {
  console.log(
    'ℹ️ Validating properties of the GraphQL Mutation type for the schema...',
  )

  const comment =
    schema.getMutationType()?.astNode?.name?.loc?.startToken?.prev?.prev?.value

  if (!comment) {
    const rowNumber =
      schema.getMutationType()?.astNode?.name?.loc?.startToken?.prev?.line

    errors.push(`Type: Mutation is missing description from row → ${rowNumber}`)
  }
}

export const validateMutationFields = async (
  schema: GraphQLSchema,
  errors: string[],
): Promise<void> => {
  console.log(
    'ℹ️ Validating properties of the GraphQL Mutation fields for the schema...',
  )

  const mutationType = schema.getMutationType()
  if (!mutationType) {
    console.log('Mutation type fields is not defined in the schema.')
    return
  }

  errors.push(...validateFields(mutationType))
}

const validateFields = (grapqhlObjectType: GraphQLObjectType): string[] => {
  const errors: string[] = []
  const fields = grapqhlObjectType.getFields()

  for (const fieldName in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, fieldName)) {
      const fieldNode = fields[fieldName].astNode
      const isComment = fieldNode?.name?.loc?.startToken?.prev?.kind
      if (isComment !== 'Comment') {
        const rowNumber = fieldNode?.loc?.startToken?.line
        errors.push(
          `Field: "${grapqhlObjectType}.${fieldName}" is missing description from row → ${rowNumber}`,
        )
      }
    }
  }

  return errors
}

export const handleErrors = (errors: string[]) => {
  if (errors.length > 0) {
    console.error('❌ Documentation validation failed:')
    for (const error of errors) {
      console.error(`  - ${error}`)
    }
    process.exit(1)
  } else {
    console.log('✅ Documentation validation passed.')
  }
}
