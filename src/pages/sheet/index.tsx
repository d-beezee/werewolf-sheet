import Sheet, { SheetAlreadyExistsError } from "@src/database/Sheet";
import Head from "next/head";
import { useState } from "react";

const SheetPage = () => {
  const [name, setName] = useState("");
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
            try {
              new Sheet(name).create();
            } catch (error) {
              if (error instanceof SheetAlreadyExistsError) {
                return;
              }
              throw error;
            } finally {
              window.location.href = `/sheet/${name}`;
            }
          }}
        >
          create
        </button>
      </main>
    </div>
  );
};

export default SheetPage;
