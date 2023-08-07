import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // schema: "./src/schema/schema.graphql",
  schema: ["./src/**/*.graphql"],
  documents: ["./src/**/*.tsx", "./src/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./gql/": {
      preset: "client",
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;
