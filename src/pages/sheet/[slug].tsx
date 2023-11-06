import Layout from "@src/components/Layout";
import AdvantageList from "@src/components/Sheet/AdvantageList";
import Auspice from "@src/components/Sheet/Auspice";
import Chronicle from "@src/components/Sheet/Chronicle";
import Concept from "@src/components/Sheet/Concept";
import Crinos from "@src/components/Sheet/Crinos";
import Dottable from "@src/components/Sheet/Dottable";
import GarouForms from "@src/components/Sheet/GarouForms";
import GiftList from "@src/components/Sheet/GiftList";
import Harano from "@src/components/Sheet/Harano";
import Hauglosk from "@src/components/Sheet/Hauglosk";
import Health from "@src/components/Sheet/Health";
import Inputable from "@src/components/Sheet/Inputable";
import Name from "@src/components/Sheet/Name";
import Patron from "@src/components/Sheet/Patron";
import Rage from "@src/components/Sheet/Rage";
import { Renown } from "@src/components/Sheet/Renown";
import Separator from "@src/components/Sheet/Separator";
import SheetContainer from "@src/components/Sheet/SheetContainer";
import Skill from "@src/components/Sheet/Skill";
import Tribe from "@src/components/Sheet/Tribe";
import Willpower from "@src/components/Sheet/Willpower";
import RusticBox from "@src/components/Styles/RusticBox";
import Sheet from "@src/database/Sheet";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { useSwipeable } from "react-swipeable";

const SheetSinglePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [item, setItem] = useState<Sheet>();
  const [isFlipped, setIsFlipped] = useState(true);
  const handlers = useSwipeable({
    onSwiped: () => setIsFlipped(!isFlipped),
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

        <main {...handlers}>
          <ReactCardFlip isFlipped={isFlipped}>
            <SheetContainer
              action={{
                flip: () => setIsFlipped(!isFlipped),
                back: () => {
                  window.location.href = "/sheet";
                },
                delete: () => {
                  if (confirm("Are you sure you want to delete this sheet?"))
                    item.delete().then(() => (window.location.href = "/sheet"));
                },
              }}
            >
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
                  <Skill
                    title="athletics"
                    getValue={() => data.skills.physical.athletics}
                    saveValue={(value) =>
                      item.setSkill("physical", "athletics", value)
                    }
                  />
                  <Skill
                    title="brawl"
                    getValue={() => data.skills.physical.brawl}
                    saveValue={(value) =>
                      item.setSkill("physical", "brawl", value)
                    }
                  />
                  <Skill
                    title="craft"
                    getValue={() => data.skills.physical.craft}
                    saveValue={(value) =>
                      item.setSkill("physical", "craft", value)
                    }
                  />
                  <Skill
                    title="driving"
                    getValue={() => data.skills.physical.drive}
                    saveValue={(value) =>
                      item.setSkill("physical", "drive", value)
                    }
                  />
                  <Skill
                    title="firearms"
                    getValue={() => data.skills.physical.firearms}
                    saveValue={(value) =>
                      item.setSkill("physical", "firearms", value)
                    }
                  />
                  <Skill
                    title="larceny"
                    getValue={() => data.skills.physical.larceny}
                    saveValue={(value) =>
                      item.setSkill("physical", "larceny", value)
                    }
                  />
                  <Skill
                    title="melee"
                    getValue={() => data.skills.physical.melee}
                    saveValue={(value) =>
                      item.setSkill("physical", "melee", value)
                    }
                  />
                  <Skill
                    title="stealth"
                    getValue={() => data.skills.physical.stealth}
                    saveValue={(value) =>
                      item.setSkill("physical", "stealth", value)
                    }
                  />
                  <Skill
                    title="survival"
                    getValue={() => data.skills.physical.survival}
                    saveValue={(value) =>
                      item.setSkill("physical", "survival", value)
                    }
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <Skill
                    title="animalKen"
                    getValue={() => data.skills.social.animalKen}
                    saveValue={(value) =>
                      item.setSkill("social", "animalKen", value)
                    }
                  />
                  <Skill
                    title="etiquette"
                    getValue={() => data.skills.social.etiquette}
                    saveValue={(value) =>
                      item.setSkill("social", "etiquette", value)
                    }
                  />
                  <Skill
                    title="insight"
                    getValue={() => data.skills.social.insight}
                    saveValue={(value) =>
                      item.setSkill("social", "insight", value)
                    }
                  />
                  <Skill
                    title="intimidation"
                    getValue={() => data.skills.social.intimidation}
                    saveValue={(value) =>
                      item.setSkill("social", "intimidation", value)
                    }
                  />
                  <Skill
                    title="leadership"
                    getValue={() => data.skills.social.leadership}
                    saveValue={(value) =>
                      item.setSkill("social", "leadership", value)
                    }
                  />
                  <Skill
                    title="performance"
                    getValue={() => data.skills.social.performance}
                    saveValue={(value) =>
                      item.setSkill("social", "performance", value)
                    }
                  />
                  <Skill
                    title="persuasion"
                    getValue={() => data.skills.social.persuasion}
                    saveValue={(value) =>
                      item.setSkill("social", "persuasion", value)
                    }
                  />
                  <Skill
                    title="streetwise"
                    getValue={() => data.skills.social.streetwise}
                    saveValue={(value) =>
                      item.setSkill("social", "streetwise", value)
                    }
                  />
                  <Skill
                    title="subterfuge"
                    getValue={() => data.skills.social.subterfuge}
                    saveValue={(value) =>
                      item.setSkill("social", "subterfuge", value)
                    }
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <Skill
                    title="academics"
                    getValue={() => data.skills.mental.academics}
                    saveValue={(value) =>
                      item.setSkill("mental", "academics", value)
                    }
                  />
                  <Skill
                    title="awareness"
                    getValue={() => data.skills.mental.awareness}
                    saveValue={(value) =>
                      item.setSkill("mental", "awareness", value)
                    }
                  />
                  <Skill
                    title="finance"
                    getValue={() => data.skills.mental.finance}
                    saveValue={(value) =>
                      item.setSkill("mental", "finance", value)
                    }
                  />
                  <Skill
                    title="investigation"
                    getValue={() => data.skills.mental.investigation}
                    saveValue={(value) =>
                      item.setSkill("mental", "investigation", value)
                    }
                  />
                  <Skill
                    title="medicine"
                    getValue={() => data.skills.mental.medicine}
                    saveValue={(value) =>
                      item.setSkill("mental", "medicine", value)
                    }
                  />
                  <Skill
                    title="occult"
                    getValue={() => data.skills.mental.occult}
                    saveValue={(value) =>
                      item.setSkill("mental", "occult", value)
                    }
                  />
                  <Skill
                    title="politics"
                    getValue={() => data.skills.mental.politics}
                    saveValue={(value) =>
                      item.setSkill("mental", "politics", value)
                    }
                  />
                  <Skill
                    title="science"
                    getValue={() => data.skills.mental.science}
                    saveValue={(value) =>
                      item.setSkill("mental", "science", value)
                    }
                  />
                  <Skill
                    title="technology"
                    getValue={() => data.skills.mental.technology}
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
              <GiftList sheet={item} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  bottom: "-120mm",
                  left: 0,
                  right: 0,
                }}
              >
                <div style={{ flexBasis: "18%" }}>
                  <Rage
                    getValue={() => data.rage}
                    saveValue={(value) => item.setRage(value)}
                  />
                </div>
              </div>
            </SheetContainer>
            <SheetContainer
              action={{
                flip: () => setIsFlipped(!isFlipped),
                back: () => {
                  window.location.href = "/sheet";
                },
                delete: () => {
                  if (confirm("Are you sure you want to delete this sheet?"))
                    item.delete().then(() => (window.location.href = "/sheet"));
                },
              }}
            >
              <RusticBox>
                <RusticBox.Item
                  style={{ minHeight: "200px" }}
                  title="Chronicle Tenets"
                >
                  <Inputable
                    type="textarea"
                    value={data.tenets}
                    onChange={(e) => {
                      item.setTenets(e.target.value);
                    }}
                  />
                </RusticBox.Item>
                <RusticBox.Item
                  style={{ minHeight: "200px" }}
                  title="Touchstones"
                >
                  <Inputable
                    type="textarea"
                    value={data.touchstones}
                    onChange={(e) => {
                      item.setTouchstones(e.target.value);
                    }}
                  />
                </RusticBox.Item>
                <RusticBox.Item
                  style={{ minHeight: "200px" }}
                  title="Favors & Banes"
                >
                  <Inputable
                    type="textarea"
                    value={data.favor}
                    onChange={(e) => {
                      item.setFavor(e.target.value);
                    }}
                  />
                </RusticBox.Item>
              </RusticBox>
              <div style={{ display: "flex", gap: "32px" }}>
                <div style={{ width: "50%", paddingTop: "40px" }}>
                  <AdvantageList sheet={item} />
                  <div style={{ display: "flex", marginTop: "20px" }}>
                    <Harano getValue={() => data.harano} saveValue={() => {}} />
                    <Hauglosk
                      getValue={() => data.hauglosk}
                      saveValue={() => {}}
                    />
                  </div>
                  <RusticBox
                    style={{
                      marginTop: "32px",
                    }}
                  >
                    <RusticBox.Item
                      style={{
                        minHeight: "200px",
                      }}
                      titleSize="medium"
                      title="Appearance"
                    >
                      <Inputable
                        type="textarea"
                        value={data.appearance}
                        onChange={(e) => {
                          item.setAppearance(e.target.value);
                        }}
                      />
                    </RusticBox.Item>
                  </RusticBox>
                  <RusticBox
                    style={{
                      marginTop: "-12px",
                    }}
                  >
                    <RusticBox.Item
                      style={{
                        minHeight: "300px",
                      }}
                      titleSize="medium"
                      title="History"
                    >
                      <Inputable
                        type="textarea"
                        value={data.history}
                        onChange={(e) => {
                          item.setHistory(e.target.value);
                        }}
                      />
                    </RusticBox.Item>
                  </RusticBox>
                </div>
                <div style={{ width: "50%", paddingTop: "40px" }}>
                  <GarouForms />

                  <RusticBox
                    style={{
                      marginTop: "32px",
                    }}
                  >
                    <RusticBox.Item
                      style={{ minHeight: "200px" }}
                      titleSize="medium"
                      title="Notes"
                    >
                      <Inputable
                        type="textarea"
                        value={data.appearance}
                        onChange={(e) => {
                          item.setNotes(e.target.value);
                        }}
                      />
                    </RusticBox.Item>
                  </RusticBox>
                  <p className="ww-tall-title" style={{ marginTop: "20px" }}>
                    Total Experience:
                    _______________________________________________
                  </p>
                  <p className="ww-tall-title" style={{ marginTop: "20px" }}>
                    Spent Experience:
                    _______________________________________________
                  </p>
                </div>
              </div>
            </SheetContainer>
          </ReactCardFlip>
        </main>
      </div>
    </Layout>
  );
};

export default SheetSinglePage;
