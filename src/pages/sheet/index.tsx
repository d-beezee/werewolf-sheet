import Sheet, { SheetAlreadyExistsError } from "@src/database/Sheet";
import Head from "next/head";
import { useEffect, useState } from "react";

const SheetPage = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    Sheet.list().then((sheets) => {
      setList(sheets);
    });
  }, []);
  return (
    <div>
      <Head>
        <title>Werewolf sheet</title>
      </Head>

      <main>
        <input defaultValue={name} onChange={(e) => setName(e.target.value)} />
        <button
          disabled={name === ""}
          onClick={() => {
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
        </button>
        {list.map((item) => (
          <div key={item}>
            <a href={`/sheet/${item}`}>{item}</a>
          </div>
        ))}
      </main>
    </div>
  );
};

export default SheetPage;
