import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ensureReady, After } from "@jaredpalmer/after";
import { ApolloProvider } from "react-apollo";
import "./css/client.css";
import routes from "./routes";
import createApolloClient from "./lib/createApolloClient";

const client = createApolloClient({ ssrMode: false });

ensureReady(routes).then(data => {
  const props = { data, routes }; // this is a work around for Property 'data' does not exist on type 'IntrinsicAttributes & IntrinsicClassAttributes<Component<Pick<any, never>, ComponentState>> & Rea...'.
  return hydrate(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <After {...props} />
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById("root")
  );
});
if (module.hot) {
  module.hot.accept();
}
