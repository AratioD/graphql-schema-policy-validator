import type { GraphQLSchema, GraphQLObjectType } from "graphql";


export const validateSubscriptionFields = (schema: GraphQLSchema) => {
	console.log("ℹ️ Validating properties of the GraphQL subscription type for the schema...");

	const subscriptionType = schema.getSubscriptionType();
	if (!subscriptionType) {
		console.log("Subscription type is not defined in the schema.");
		return;
	}

	const errors = validateFields(subscriptionType);
	handleErrors(errors);
};

const validateFields = (subscriptionType: GraphQLObjectType): string[] => {
	const errors: string[] = [];
	const fields = subscriptionType.getFields();

	Object.keys(fields).forEach((fieldName) => {
		const field = fields[fieldName];
		const astNode = field.astNode;
		if (astNode?.loc?.source?.body) {
			const isDocumentation = astNode?.name?.loc?.startToken?.prev?.kind;
			if (isDocumentation !== "Comment") {
				errors.push(`Field: "${subscriptionType}.${fieldName}" is missing description`);
			}
		}
	});

	return errors;
};

const handleErrors = (errors: string[]) => {
	if (errors.length > 0) {
		console.error("❌ Documentation validation failed:");
		errors.forEach((error) => console.error(`  - ${error}`));
		process.exit(1);
	} else {
		console.log("✅ Documentation validation passed.");
	}
};

