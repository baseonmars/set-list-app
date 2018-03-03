import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
// import schema from "../graphql/schema";
// import { SchemaLink } from "apollo-link-schema";

interface CreateApolloClientArgs {
  ssrMode: boolean;
}

function createApolloClient({ ssrMode }: CreateApolloClientArgs) {
  const client = new ApolloClient({
    ssrMode,
    link: new HttpLink({
      uri: "http://localhost:3000/graphql"
    }),
    cache: ssrMode
      ? new InMemoryCache()
      : new InMemoryCache().restore(window.__APOLLO_STATE__)
  });
  return client;
}

export default createApolloClient;
