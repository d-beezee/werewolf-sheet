import Layout from "@src/components/Layout";
import Loader from "@src/components/Layout/Loader";
import Button from "@src/components/Styles/Button";
import Sheet, { SheetAlreadyExistsError } from "@src/database/Sheet";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const SheetPage = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<{ id: string; name: string }[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    Sheet.list().then((sheets) => {
      setList(sheets);
      setLoading(false);
    });
  }, []);
  return (
    <Layout>
      <div>
        <Head>
          <title>Werewolf sheet</title>
        </Head>

        <main style={{ paddingTop: "3rem" }}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
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
                  {t("Create", { context: "sheet-index" })}
                </Button>
              </div>
              <h1
                style={{ color: "#fff", textAlign: "center", fontSize: "3rem" }}
              >
                {t("Characters", { context: "sheet-index" })}
              </h1>
              {list.map((item, i) => (
                <ButtonContainer key={item.id}>
                  <Button
                    invert={i % 2 !== 0}
                    onClick={() => (window.location.href = `/sheet/${item.id}`)}
                  >
                    {item.name}
                  </Button>
                </ButtonContainer>
              ))}
            </>
          )}
        </main>
      </div>
    </Layout>
  );
};

const ButtonContainer = styled.div`
  margin-bottom: 50px;
  width: 50%;
  @media (min-width: 768px) {
    width: 33%;
  }
  float: left;
`;

export default SheetPage;
