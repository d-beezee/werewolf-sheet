import Auspice from "@src/components/Sheet/Auspice";
import Chronicle from "@src/components/Sheet/Chronicle";
import Concept from "@src/components/Sheet/Concept";
import Dottable from "@src/components/Sheet/Dottable";
import Health from "@src/components/Sheet/Health";
import Name from "@src/components/Sheet/Name";
import Patron from "@src/components/Sheet/Patron";
import Separator from "@src/components/Sheet/Separator";
import SheetContainer from "@src/components/Sheet/SheetContainer";
import Tribe from "@src/components/Sheet/Tribe";
import Willpower from "@src/components/Sheet/Willpower";
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
        <SheetContainer>
          <div style={{ display: "flex" }}>
            <Name sheet={item} />
            <Concept sheet={item} />
            <Patron sheet={item} />
          </div>
          <div style={{ display: "flex" }}>
            <Chronicle sheet={item} />
            <Auspice sheet={item} />
            <Tribe sheet={item} />
          </div>
          <Separator text="ATTRIBUTES" />
          <div style={{ display: "flex" }}>
            <div style={{ width: "100%" }}>
              <div
                className="ww-tall-title"
                style={{
                  fontSize: "30px",
                  textAlign: "center",
                  marginBottom: "15px",
                }}
              >
                Physical
              </div>
              <Dottable
                title="Strength"
                getValue={() => data.attributes.physical.strength}
                saveValue={(value) =>
                  item.setAttributes("physical", "strength", value)
                }
              />
              <Dottable
                title="Dexterity"
                getValue={() => data.attributes.physical.dexterity}
                saveValue={(value) =>
                  item.setAttributes("physical", "dexterity", value)
                }
              />
              <Dottable
                title="Stamina"
                getValue={() => data.attributes.physical.stamina}
                saveValue={(value) =>
                  item.setAttributes("physical", "stamina", value)
                }
              />
            </div>
            <div style={{ width: "100%" }}>
              <div
                className="ww-tall-title"
                style={{
                  fontSize: "30px",
                  textAlign: "center",
                  marginBottom: "15px",
                }}
              >
                Social
              </div>
              <Dottable
                title="appearance"
                getValue={() => data.attributes.social.appearance}
                saveValue={(value) =>
                  item.setAttributes("social", "appearance", value)
                }
              />
              <Dottable
                title="charisma"
                getValue={() => data.attributes.social.charisma}
                saveValue={(value) =>
                  item.setAttributes("social", "charisma", value)
                }
              />
              <Dottable
                title="manipulation"
                getValue={() => data.attributes.social.manipulation}
                saveValue={(value) =>
                  item.setAttributes("social", "manipulation", value)
                }
              />
            </div>
            <div style={{ width: "100%" }}>
              <div
                className="ww-tall-title"
                style={{
                  fontSize: "30px",
                  textAlign: "center",
                  marginBottom: "15px",
                }}
              >
                Mental
              </div>
              <Dottable
                title="intelligence"
                getValue={() => data.attributes.mental.intelligence}
                saveValue={(value) =>
                  item.setAttributes("mental", "intelligence", value)
                }
              />
              <Dottable
                title="wits"
                getValue={() => data.attributes.mental.wits}
                saveValue={(value) =>
                  item.setAttributes("mental", "wits", value)
                }
              />
              <Dottable
                title="resolve"
                getValue={() => data.attributes.mental.resolve}
                saveValue={(value) =>
                  item.setAttributes("mental", "resolve", value)
                }
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "75%",
              margin: "20px auto 0 auto",
              justifyContent: "space-evenly",
            }}
          >
            <Health sheet={item} />

            <Willpower sheet={item} />
          </div>
          <Separator text="SKILLS" />
        </SheetContainer>
      </main>
    </div>
  );
};

export default SheetSinglePage;
