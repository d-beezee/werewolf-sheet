import Auspice from "@src/components/Sheet/Auspice";
import Chronicle from "@src/components/Sheet/Chronicle";
import Concept from "@src/components/Sheet/Concept";
import Crinos from "@src/components/Sheet/Crinos";
import Dottable from "@src/components/Sheet/Dottable";
import Health from "@src/components/Sheet/Health";
import Name from "@src/components/Sheet/Name";
import Patron from "@src/components/Sheet/Patron";
import { Renown } from "@src/components/Sheet/Renown";
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
          <div
            style={{
              display: "flex",
            }}
          >
            <Crinos sheet={item} />
          </div>
          <Separator text="SKILLS" />
          <div style={{ display: "flex" }}>
            <div style={{ width: "100%" }}>
              <Dottable
                allowZero
                title="athletics"
                getValue={() => data.skills.physical.athletics.value}
                saveValue={(value) =>
                  item.setSkill("physical", "athletics", value)
                }
              />
              <Dottable
                allowZero
                title="brawl"
                getValue={() => data.skills.physical.brawl.value}
                saveValue={(value) => item.setSkill("physical", "brawl", value)}
              />
              <Dottable
                allowZero
                title="craft"
                getValue={() => data.skills.physical.craft.value}
                saveValue={(value) => item.setSkill("physical", "craft", value)}
              />
              <Dottable
                allowZero
                title="driving"
                getValue={() => data.skills.physical.drive.value}
                saveValue={(value) => item.setSkill("physical", "drive", value)}
              />
              <Dottable
                allowZero
                title="firearms"
                getValue={() => data.skills.physical.firearms.value}
                saveValue={(value) =>
                  item.setSkill("physical", "firearms", value)
                }
              />
              <Dottable
                allowZero
                title="larceny"
                getValue={() => data.skills.physical.larceny.value}
                saveValue={(value) =>
                  item.setSkill("physical", "larceny", value)
                }
              />
              <Dottable
                allowZero
                title="melee"
                getValue={() => data.skills.physical.melee.value}
                saveValue={(value) => item.setSkill("physical", "melee", value)}
              />
              <Dottable
                allowZero
                title="stealth"
                getValue={() => data.skills.physical.stealth.value}
                saveValue={(value) =>
                  item.setSkill("physical", "stealth", value)
                }
              />
              <Dottable
                allowZero
                title="survival"
                getValue={() => data.skills.physical.survival.value}
                saveValue={(value) =>
                  item.setSkill("physical", "survival", value)
                }
              />
            </div>
            <div style={{ width: "100%" }}>
              <Dottable
                allowZero
                title="animalKen"
                getValue={() => data.skills.social.animalKen.value}
                saveValue={(value) =>
                  item.setSkill("social", "animalKen", value)
                }
              />
              <Dottable
                allowZero
                title="etiquette"
                getValue={() => data.skills.social.etiquette.value}
                saveValue={(value) =>
                  item.setSkill("social", "etiquette", value)
                }
              />
              <Dottable
                allowZero
                title="insight"
                getValue={() => data.skills.social.insight.value}
                saveValue={(value) => item.setSkill("social", "insight", value)}
              />
              <Dottable
                allowZero
                title="intimidation"
                getValue={() => data.skills.social.intimidation.value}
                saveValue={(value) =>
                  item.setSkill("social", "intimidation", value)
                }
              />
              <Dottable
                allowZero
                title="leadership"
                getValue={() => data.skills.social.leadership.value}
                saveValue={(value) =>
                  item.setSkill("social", "leadership", value)
                }
              />
              <Dottable
                allowZero
                title="performance"
                getValue={() => data.skills.social.performance.value}
                saveValue={(value) =>
                  item.setSkill("social", "performance", value)
                }
              />
              <Dottable
                allowZero
                title="persuasion"
                getValue={() => data.skills.social.persuasion.value}
                saveValue={(value) =>
                  item.setSkill("social", "persuasion", value)
                }
              />
              <Dottable
                allowZero
                title="streetwise"
                getValue={() => data.skills.social.streetwise.value}
                saveValue={(value) =>
                  item.setSkill("social", "streetwise", value)
                }
              />
              <Dottable
                allowZero
                title="subterfuge"
                getValue={() => data.skills.social.subterfuge.value}
                saveValue={(value) =>
                  item.setSkill("social", "subterfuge", value)
                }
              />
            </div>
            <div style={{ width: "100%" }}>
              <Dottable
                allowZero
                title="academics"
                getValue={() => data.skills.mental.academics.value}
                saveValue={(value) =>
                  item.setSkill("mental", "academics", value)
                }
              />
              <Dottable
                allowZero
                title="awareness"
                getValue={() => data.skills.mental.awareness.value}
                saveValue={(value) =>
                  item.setSkill("mental", "awareness", value)
                }
              />
              <Dottable
                allowZero
                title="finance"
                getValue={() => data.skills.mental.finance.value}
                saveValue={(value) => item.setSkill("mental", "finance", value)}
              />
              <Dottable
                allowZero
                title="investigation"
                getValue={() => data.skills.mental.investigation.value}
                saveValue={(value) =>
                  item.setSkill("mental", "investigation", value)
                }
              />
              <Dottable
                allowZero
                title="medicine"
                getValue={() => data.skills.mental.medicine.value}
                saveValue={(value) =>
                  item.setSkill("mental", "medicine", value)
                }
              />
              <Dottable
                allowZero
                title="occult"
                getValue={() => data.skills.mental.occult.value}
                saveValue={(value) => item.setSkill("mental", "occult", value)}
              />
              <Dottable
                allowZero
                title="politics"
                getValue={() => data.skills.mental.politics.value}
                saveValue={(value) =>
                  item.setSkill("mental", "politics", value)
                }
              />
              <Dottable
                allowZero
                title="science"
                getValue={() => data.skills.mental.science.value}
                saveValue={(value) => item.setSkill("mental", "science", value)}
              />
              <Dottable
                allowZero
                title="technology"
                getValue={() => data.skills.mental.technology.value}
                saveValue={(value) =>
                  item.setSkill("mental", "technology", value)
                }
              />
            </div>
          </div>
          <Separator text="RENOWN" />
          <div style={{ display: "flex", margin: "20px 0 60px 0" }}>
            <Renown
              allowZero
              title="Glory"
              getValue={() => data.renown.glory}
              saveValue={(value) => item.setRenown("glory", value)}
            />
            <Renown
              allowZero
              title="Honor"
              getValue={() => data.renown.honor}
              saveValue={(value) => item.setRenown("honor", value)}
            />
            <Renown
              allowZero
              title="Wisdom"
              getValue={() => data.renown.wisdom}
              saveValue={(value) => item.setRenown("wisdom", value)}
            />
          </div>
          <Separator text="GIFT & RITES" />
        </SheetContainer>
      </main>
    </div>
  );
};

export default SheetSinglePage;
