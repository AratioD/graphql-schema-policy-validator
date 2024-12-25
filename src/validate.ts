import type { GraphQLSchema } from "graphql";

export const validateDocumentation = (schema: GraphQLSchema) => {
	console.log(
		"ℹ️ Validating properties of the GraphQL subscription type for the schema...",
	);
	const errors: string[] = [];
	const subscriptionType = schema.getSubscriptionType();

	if (subscriptionType) {
		const fields = subscriptionType.getFields();
		Object.keys(fields).forEach((fieldName) => {
			const field = fields[fieldName];
			const astNode = field.astNode;
			if (astNode?.loc?.source?.body) {
				const isDocumentation = astNode?.name?.loc?.startToken?.prev?.kind;
				if (isDocumentation !== "Comment") {
					// const kissa1 = astNode?.name?.loc?.startToken?.prev;
					errors.push(
						`Field: "${subscriptionType}.${fieldName}" is missing description`,
					);
				}
			}
		});
	} else {
		console.log("Subscription type is not defined in the schema.");
	}

	if (errors.length > 0) {
		console.error("❌ Documentation validation failed:");
		for (const error of errors) {
			console.error(`  - ${error}`);
		}
		process.exit(1);
	} else {
		console.log("✅ Documentation validation passed.");
	}
};
