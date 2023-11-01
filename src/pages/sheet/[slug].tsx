import Chronicle from "@src/components/Sheet/Chronicle";
import Concept from "@src/components/Sheet/Concept";
import Name from "@src/components/Sheet/Name";
import Patron from "@src/components/Sheet/Patron";
import Sheet from "@src/database/Sheet";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SheetSinglePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [item, setItem] = useState<Sheet>();

  useEffect(() => {
    if (slug === undefined) return;
    const sheet = new Sheet(slug as string);
    sheet.init().then(() => {
      setItem(sheet);
    });
  }, [slug]);

  if (item === undefined || slug === undefined) return <div>loading...</div>;

  const data = item.get();
  if (data === null) return <div>not found</div>;

  return (
    <div>
      <Head>
        <title>Werewolf sheet</title>
      </Head>

      <main>
        <div>
          <button
            onClick={() =>
              item.delete().then(() => (window.location.href = "/sheet"))
            }
          >
            delete
          </button>
        </div>
        <Name sheet={item} />
        <Concept sheet={item} />
        <Patron sheet={item} />
        <Chronicle sheet={item} />
      </main>
    </div>
  );
};

export default SheetSinglePage;
