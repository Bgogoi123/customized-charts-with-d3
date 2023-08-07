/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query GetPatientCountData {\n      patientCountData {\n        doctor_email\n        doctor_id\n        doctor_name\n        doctor_phone\n        week_one\n        week_two\n        week_three\n        week_four\n      }\n    }\n  ": types.GetPatientCountDataDocument,
    "\n        query GetPatientCountData {\n          patientCountData {\n            doctor_email\n            doctor_id\n            doctor_name\n            doctor_phone\n            week_one\n            week_two\n            week_three\n            week_four\n          }\n        }\n      ": types.GetPatientCountDataDocument,
    "\n        query GetSimpleChartData {\n          chartData {\n            country\n            burger\n            burgerColor\n            sandwich\n            sandwichColor\n            kebab\n            kebabColor\n            fries\n            friesColor\n            donut\n            donutColor\n          }\n        }\n      ": types.GetSimpleChartDataDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetPatientCountData {\n      patientCountData {\n        doctor_email\n        doctor_id\n        doctor_name\n        doctor_phone\n        week_one\n        week_two\n        week_three\n        week_four\n      }\n    }\n  "): (typeof documents)["\n    query GetPatientCountData {\n      patientCountData {\n        doctor_email\n        doctor_id\n        doctor_name\n        doctor_phone\n        week_one\n        week_two\n        week_three\n        week_four\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query GetPatientCountData {\n          patientCountData {\n            doctor_email\n            doctor_id\n            doctor_name\n            doctor_phone\n            week_one\n            week_two\n            week_three\n            week_four\n          }\n        }\n      "): (typeof documents)["\n        query GetPatientCountData {\n          patientCountData {\n            doctor_email\n            doctor_id\n            doctor_name\n            doctor_phone\n            week_one\n            week_two\n            week_three\n            week_four\n          }\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query GetSimpleChartData {\n          chartData {\n            country\n            burger\n            burgerColor\n            sandwich\n            sandwichColor\n            kebab\n            kebabColor\n            fries\n            friesColor\n            donut\n            donutColor\n          }\n        }\n      "): (typeof documents)["\n        query GetSimpleChartData {\n          chartData {\n            country\n            burger\n            burgerColor\n            sandwich\n            sandwichColor\n            kebab\n            kebabColor\n            fries\n            friesColor\n            donut\n            donutColor\n          }\n        }\n      "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;