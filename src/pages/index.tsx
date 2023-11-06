import Layout from "@src/components/Layout";
import Button from "@src/components/Styles/Button";
import Head from "next/head";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
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
            {t("Go to sheets")}
          </Button>
        </main>
      </div>
    </Layout>
  );
}
