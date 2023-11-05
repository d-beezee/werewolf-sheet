import Layout from "@src/components/Layout";
import Button from "@src/components/Styles/Button";
import Head from "next/head";

export default function Home() {
  return (
    <Layout showSignout>
      <div>
        <Head>
          <title>Werewolf sheet</title>
        </Head>

        <main style={{ paddingTop: "20px" }}>
          <Button
            onClick={() => {
              window.location.href = "/sheet";
            }}
          >
            Go to sheets
          </Button>
        </main>
      </div>
    </Layout>
  );
}
