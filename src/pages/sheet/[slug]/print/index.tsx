import PageBack from "@src/components/Sheet/PageBack";
import PageFront from "@src/components/Sheet/PageFront";
import Sheet from "@src/database/Sheet";
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
  setTimeout(() => {
    window.print();
    location.href = `/sheet/${slug}`;
  }, 1000);

  return (
    <>
      <PageFront resize={false} item={item} />
      <PageBack resize={false} item={item} />
    </>
  );
};

export default SheetSinglePage;
