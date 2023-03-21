import Head from "next/head";
import React, { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [scenes, setScenes] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>();
  const [response, setResponse] = useState<string>();

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
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
              setResponse(JSON.stringify(data));
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
          <div style={{ whiteSpace: "pre-wrap" }}>{result}</div>
          <div style={{ whiteSpace: "pre-wrap" }}>{response}</div>
        </div>
      </main>
    </div>
  );
}
