import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Bebas_Neue } from "next/font/google";

import localFont from "next/font/local";
import { useRouter } from "next/router";

const hermes = localFont({
  src: [
    {
      path: "../fonts/HERMES-1943.ttf.woff",
    },
  ],
});
const bebanue = Bebas_Neue({
  weight: "400",
  subsets: ["latin-ext"],
});

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <style jsx global>{`
        :root {
          --bebas-neue: ${bebanue.style.fontFamily};
          --hermes: ${hermes.style.fontFamily};
        }
        @media (max-width: 600px) {
          ${router.pathname === "/sheet/[slug]" && "#__next { width: 397%; }"}
        }
        body {
          background-color: #0f0f0f;
        }
        p {
          margin: 0;
        }
        * {
          font-family: var(--hermes);
          font-size: 1.1rem;
        }
        .ww-tall-title {
          font-family: var(--bebas-neue);
          scale: 1 1.2;
          display: block;
          font-size: 1.6rem;
        }
      `}</style>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
