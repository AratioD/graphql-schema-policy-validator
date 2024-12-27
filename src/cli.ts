import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { program } from "commander";
import { validateSubscriptionFields as subscriptionFieldsDocumentationValidation } from "./validate/documentation";

const lintSchema = async (schemaPath: string) => {
	try {
		const schema = await loadSchema(schemaPath, {
			loaders: [new GraphQLFileLoader()],
		});
		console.log(`✅ Schema loaded successfully: ${schemaPath}`);
		subscriptionFieldsDocumentationValidation(schema);
	} catch (error) {
		console.error(`❌ Failed to load schema: ${schemaPath}`);
		console.error(error.message);
		process.exit(1);
	}
}

program
	.name("graphql-schema-policy-validator")
	.description("CLI tool for validating your schema policy")
	.version("0.1.0");

program
	.command("validate")
	.alias("v")
	.argument("<schemaPath>", "Path to the GraphQL schema file(s)")
	.description("Validate the specified GraphQL schema policy")
	.action(lintSchema);

program.parse(process.argv);
