import type { GraphQLObjectType, GraphQLSchema } from "graphql"

export const validateSubscriptionType = async (schema: GraphQLSchema) => {
	console.log(
		"ℹ️ Validating properties of the GraphQL subscription type for the schema...",
	)

	const ifComment =
		schema.getSubscriptionType()?.astNode?.name?.loc?.startToken?.prev?.prev
			?.kind
	console.log(ifComment)
	const comment =
		schema.getSubscriptionType()?.astNode?.name?.loc?.startToken?.prev?.prev
			?.value

	if (!ifComment) {
		console.log("Subscription type is not documented in the schema.")
		return
	}

	if (comment && comment?.length < 10) {
		const errors: string[] = []
		errors.push("Field: kissa  is missing description")
		handleErrors(errors)
	}
}

export const validateSubscriptionFields = async (schema: GraphQLSchema) => {
	console.log(
		"ℹ️ Validating properties of the GraphQL subscription fields for the schema...",
	)

	const subscriptionType = schema.getSubscriptionType()
	if (!subscriptionType) {
		console.log("Subscription type fields is not defined in the schema.")
		return
	}

	const errors = validateFields(subscriptionType)
	handleErrors(errors)
}

const validateFields = (subscriptionType: GraphQLObjectType): string[] => {
	const errors: string[] = []
	const fields = subscriptionType.getFields()

	for (const fieldName in fields) {
		if (Object.prototype.hasOwnProperty.call(fields, fieldName)) {
			const fieldNode = fields[fieldName].astNode
			const isComment = fieldNode?.name?.loc?.startToken?.prev?.kind
			if (isComment !== "Comment") {
				const rowNumber = fieldNode?.loc?.startToken?.line
				errors.push(
					`Field: "${subscriptionType}.${fieldName}" is missing description. Row --> ${rowNumber}`,
				)
			}
		}
	}

	return errors
}

const handleErrors = (errors: string[]) => {
	if (errors.length > 0) {
		console.error("❌ Documentation validation failed:")
		for (const error of errors) {
			console.error(`  - ${error}`)
		}
		process.exit(1)
	} else {
		console.log("✅ Documentation validation passed.")
	}
}
