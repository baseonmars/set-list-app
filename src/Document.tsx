import React from "react";
import { AfterRoot, AfterData } from "@jaredpalmer/after";
import { HelmetData } from "react-helmet";
import { InitialProps } from "./server";
import { ServerStyleSheet } from "styled-components";

interface Props extends InitialProps {
  helmet: HelmetData;
}

class Document extends React.Component<Props> {
  public static async getInitialProps({
    assets,
    data,
    renderPage
  }: InitialProps) {
    const page = await renderPage();
    return { assets, data, ...page };
  }

  public render() {
    const { helmet, assets, data, initialApolloState, styleTags } = this.props;
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>SetLists</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {assets.client.css && (
            <link rel="stylesheet" href={assets.client.css} />
          )}
          {styleTags}
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData data={data} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__APOLLO_STATE__=${JSON.stringify(
                initialApolloState
              ).replace(/</g, "\\u003c")};`
            }}
          />
          <script
            type="text/javascript"
            src={assets.client.js}
            defer
            crossOrigin="anonymous"
          />
        </body>
      </html>
    );
  }
}

export default Document;
