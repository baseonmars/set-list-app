import React, { ReactNode, ReactElement } from "react";
import express from "express";
import { render } from "@jaredpalmer/after";
import { renderToString } from "react-dom/server";
import cors from "cors";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import routes from "./routes";
import createApolloClient from "./lib/createApolloClient";
import Document from "./Document";
import { match } from "react-router";
import * as History from "history";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import schema from "./graphql/schema";
import { ServerStyleSheet } from "styled-components";
import { ThemeProvider, theme } from "./common/styled-components";

// tslint:disable no-var-requires
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST || "");

export interface InitialProps {
  req: Request;
  res: Response;
  routes: any;
  assets: KeyValueObject;
  data: KeyValueObject;
  initialApolloState: KeyValueObject;
  renderPage: () => any;
  match: match<any>;
  history: History.History;
  location: History.Location;
  styleTags: Array<ReactElement<HTMLStyleElement>>;
}

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || ""))
  .use("/graphql", cors(), bodyParser.json(), graphqlExpress({ schema }))
  .get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }))
  .get("/*", async (req, res) => {
    const client = createApolloClient({ ssrMode: true });
    const sheet = new ServerStyleSheet();

    const customRenderer = (node: Node) => {
      const App = (
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>{node}</ApolloProvider>
        </ThemeProvider>
      );
      return getDataFromTree(App).then(() => {
        const initialApolloState = client.extract();
        const html = renderToString(sheet.collectStyles(App));
        const styleTags = sheet.getStyleElement();
        return { html, initialApolloState, styleTags };
      });
    };

    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        customRenderer,
        document: Document
      });
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
