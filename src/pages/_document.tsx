import { theme } from "@src/components/theme";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet, ThemeProvider } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
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
