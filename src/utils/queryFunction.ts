import { GraphQLClient } from "graphql-request";
import { useQuery } from "react-query";

const graphQLClient = new GraphQLClient(import.meta.env.BASE_URL);

export function executeQuery(queryKey: string, query: any) {
  return useQuery(queryKey, async () => {
    return await graphQLClient.request(query);
  });
}
