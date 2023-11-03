import { AppProps } from "next/app";

import localFont from "next/font/local";

const hermes = localFont({
  src: [
    {
      path: "../fonts/HERMES-1943.ttf.woff",
    },
  ],
});

function MyApp({ Component, pageProps }: AppProps<{}>) {
  return (
    <>
      <style jsx global>{`
        * {
          font-family: ${hermes.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
