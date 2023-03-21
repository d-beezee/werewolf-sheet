import Head from "next/head";
import React, { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [scenes, setScenes] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>();

  return (
    <div>
      <Head>
        <title>Sigmata Mission Generator</title>
        <link rel="icon" href="/fist.png" />
      </Head>

      <main className={styles.main}>
        <img src="/fist.png" className={styles.icon} />
        <h3>Sigmata Mission Generator</h3>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            setIsLoading(true);
            try {
              const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: input, scenes: scenes }),
              });

              const data = await response.json();
              if (response.status !== 200) {
                throw (
                  data.error ||
                  new Error(`Request failed with status ${response.status}`)
                );
              }

              setResult(`
${data.base}
${data.details
  .map((d: string, index) => {
    return `
----------------------
Dettagli scena ${index + 1}
${d}
----------------------
`;
  })
  .join("")}
              `);
              setInput("");
            } catch (error) {
              // Consider implementing your own error handling logic here
              console.error(error);
              alert(error.message);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <textarea
            name="animal"
            placeholder="Simple description"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="number"
            name="scenes"
            placeholder="Number of scenes"
            value={scenes}
            onChange={(e) => setScenes(parseInt(e.target.value))}
          />
          <input
            disabled={isLoading}
            type="submit"
            value={isLoading ? "Loading" : "Generate"}
          />
        </form>
        <div className={styles.result}>
          <div
            style={{
              whiteSpace: "pre-wrap",
              background: "#1d1f21",
              color: "#a8ff60",
              fontFamily: "Share Tech Mono",
              padding: result?.length ? "50px" : 0,
            }}
          >
            {result}
          </div>
        </div>
      </main>
    </div>
  );
}
