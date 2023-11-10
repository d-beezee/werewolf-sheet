import Layout from "@src/components/Layout";
import Menu from "@src/components/Layout/Menu";
import Modal from "@src/components/Layout/ShareModal";
import PageBack from "@src/components/Sheet/PageBack";
import PageFront from "@src/components/Sheet/PageFront";
import Sheet from "@src/database/Sheet";
import useWindowDimensions from "@src/hooks/useWindowDimensions";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { useTranslation } from "react-i18next";
import { useSwipeable } from "react-swipeable";

const SheetSinglePage = () => {
  const router = useRouter();
  const [width] = useWindowDimensions();
  const { t } = useTranslation();
  const { slug } = router.query;
  const [item, setItem] = useState<Sheet>();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const handlers = useSwipeable({
    onSwipedLeft: () => setIsFlipped(!isFlipped),
    onSwipedRight: () => setIsFlipped(!isFlipped),
    delta: 200,
  });
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
    <Layout>
      <div>
        <Head>
          <title>Werewolf sheet</title>
        </Head>
        <Modal
          sheet={item}
          open={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        />
        <Menu
          size={width < 768 ? 400 : undefined}
          actions={{
            onDelete: () => {
              if (
                confirm(
                  t("Are you sure you want to delete this sheet?", {
                    context: "sheet",
                  })
                )
              )
                item.delete().then(() => (window.location.href = "/sheet"));
            },
            onPrint: () => {
              location.href = `/sheet/${slug}/print`;
            },
            onShare: () => setIsShareModalOpen(!isShareModalOpen),
          }}
        />
        <main {...handlers}>
          <ReactCardFlip isFlipped={isFlipped}>
            <PageFront
              item={item}
              action={{
                flip: () => setIsFlipped(!isFlipped),
                back: () => {
                  window.location.href = "/sheet";
                },
              }}
            />
            <PageBack
              item={item}
              action={{
                flip: () => setIsFlipped(!isFlipped),
                back: () => {
                  window.location.href = "/sheet";
                },
              }}
            />
          </ReactCardFlip>
        </main>
      </div>
    </Layout>
  );
};

export default SheetSinglePage;
