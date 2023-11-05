import Layout from "@src/components/Layout";
import Button from "@src/components/Styles/Button";
import Sheet, { SheetAlreadyExistsError } from "@src/database/Sheet";
import Head from "next/head";
import { useEffect, useState } from "react";

const SheetPage = () => {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    Sheet.list().then((sheets) => {
      setList(sheets);
    });
  }, []);
  return (
    <Layout>
      <div>
        <Head>
          <title>Werewolf sheet</title>
        </Head>

        <main>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="medium"
              onClick={() => {
                const name = prompt("Nome del personaggio");
                if (name === null || name === "") return;

                new Sheet(name)
                  .create()
                  .then(() => {
                    window.location.href = `/sheet/${name}`;
                  })
                  .catch((error) => {
                    if (error instanceof SheetAlreadyExistsError) {
                      window.location.href = `/sheet/${name}`;
                      return;
                    }
                    throw error;
                  });
              }}
            >
              create
            </Button>
          </div>
          <h1 style={{ color: "#fff", textAlign: "center", fontSize: "3rem" }}>
            Personaggi
          </h1>
          {list.map((item) => (
            <div style={{ marginBottom: "10px" }} key={item}>
              <Button onClick={() => (window.location.href = `/sheet/${item}`)}>
                {item}
              </Button>
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default SheetPage;
