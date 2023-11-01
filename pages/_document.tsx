import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Html>
          <Head>
            <link
              href="https://fonts.googleapis.com/css2?family=Linden+Hill:ital@0;1&family=Share+Tech+Mono&family=Special+Elite&display=swap"
              rel="stylesheet"
            />
          </Head>
          <body style={{ margin: 0 }}>
            <Main />
            <NextScript />
          </body>
        </Html>
      </ThemeProvider>
    );
  }
}

export default MyDocument;
