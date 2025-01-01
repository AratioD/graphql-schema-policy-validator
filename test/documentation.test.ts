// import { describe, it, expect, beforeEach, vi } from 'bun:test'
// import { GraphQLSchema, GraphQLObjectType } from 'graphql'
// import {
//   validateSubscriptionType,
//   validateSubscriptionFields,
// } from './documentation'
//
// describe('validateSubscriptionType', () => {
//   let schema: GraphQLSchema
//
//   beforeEach(() => {
//     schema = new GraphQLSchema({
//       subscription: new GraphQLObjectType({
//         name: 'Subscription',
//         fields: {},
//         astNode: {
//           kind: 'ObjectTypeDefinition',
//           name: {
//             kind: 'Name',
//             value: 'Subscription',
//             loc: { start: 0, end: 12 },
//           },
//           loc: { start: 0, end: 12 },
//         },
//       }),
//     })
//   })
//
//   it('should validate subscription type with description', async () => {
//     schema.getSubscriptionType().astNode.name.loc.startToken = {
//       prev: { prev: { value: 'Description' } },
//     }
//
//     const consoleSpy = vi.spyOn(console, 'log')
//     await validateSubscriptionType(schema)
//     expect(consoleSpy).toHaveBeenCalledWith(
//       'ℹ️ Validating properties of the GraphQL subscription type for the schema...',
//     )
//   })
//
//   it('should fail validation if subscription type is missing description', async () => {
//     schema.getSubscriptionType().astNode.name.loc.startToken = {
//       prev: { line: 1 },
//     }
//
//     const consoleErrorSpy = vi.spyOn(console, 'error')
//     const processExitSpy = vi
//       .spyOn(process, 'exit')
//       .mockImplementation(() => {})
//
//     await validateSubscriptionType(schema)
//
//     expect(consoleErrorSpy).toHaveBeenCalledWith(
//       '❌ Documentation validation failed:',
//     )
//     expect(consoleErrorSpy).toHaveBeenCalledWith(
//       '  - Type: subscription is missing description from row → 1',
//     )
//     expect(processExitSpy).toHaveBeenCalledWith(1)
//   })
// })
//
// describe('validateSubscriptionFields', () => {
//   let schema: GraphQLSchema
//
//   beforeEach(() => {
//     schema = new GraphQLSchema({
//       subscription: new GraphQLObjectType({
//         name: 'Subscription',
//         fields: {
//           testField: {
//             type: GraphQLObjectType,
//             astNode: {
//               kind: 'FieldDefinition',
//               name: {
//                 kind: 'Name',
//                 value: 'testField',
//                 loc: { start: 0, end: 9 },
//               },
//               loc: { start: 0, end: 9 },
//             },
//           },
//         },
//         astNode: {
//           kind: 'ObjectTypeDefinition',
//           name: {
//             kind: 'Name',
//             value: 'Subscription',
//             loc: { start: 0, end: 12 },
//           },
//           loc: { start: 0, end: 12 },
//         },
//       }),
//     })
//   })
//
//   it('should validate subscription fields with description', async () => {
//     schema
//       .getSubscriptionType()
//       .getFields().testField.astNode.name.loc.startToken = {
//       prev: { kind: 'Comment' },
//     }
//
//     const consoleSpy = vi.spyOn(console, 'log')
//     await validateSubscriptionFields(schema)
//     expect(consoleSpy).toHaveBeenCalledWith(
//       'ℹ️ Validating properties of the GraphQL subscription fields for the schema...',
//     )
//   })
//
//   it('should fail validation if subscription field is missing description', async () => {
//     schema
//       .getSubscriptionType()
//       .getFields().testField.astNode.name.loc.startToken = {
//       prev: { line: 1 },
//     }
//
//     const consoleErrorSpy = vi.spyOn(console, 'error')
//     const processExitSpy = vi
//       .spyOn(process, 'exit')
//       .mockImplementation(() => {})
//
//     await validateSubscriptionFields(schema)
//
//     expect(consoleErrorSpy).toHaveBeenCalledWith(
//       '❌ Documentation validation failed:',
//     )
//     expect(consoleErrorSpy).toHaveBeenCalledWith(
//       '  - Field: "Subscription.testField" is missing description from row → 1',
//     )
//     expect(processExitSpy).toHaveBeenCalledWith(1)
//   })
// })
