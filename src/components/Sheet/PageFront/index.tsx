import Chronicle from "@src/components/Sheet/Chronicle";
import Crinos from "@src/components/Sheet/Crinos";
import Dottable from "@src/components/Sheet/Dottable";
import GiftList from "@src/components/Sheet/GiftList";
import Health from "@src/components/Sheet/Health";
import Inputable from "@src/components/Sheet/Inputable";
import Rage from "@src/components/Sheet/Rage";
import { Renown } from "@src/components/Sheet/Renown";
import Selectable from "@src/components/Sheet/Selectable";
import Separator from "@src/components/Sheet/Separator";
import SheetContainer from "@src/components/Sheet/SheetContainer";
import Skill from "@src/components/Sheet/Skill";
import Willpower from "@src/components/Sheet/Willpower";
import Sheet from "@src/database/Sheet";
import { Trans, useTranslation } from "react-i18next";

const PageFront = ({
  resize,
  item,
  action,
}: {
  resize?: boolean;
  item: Sheet;
  version?: number;
  action?: {
    flip?: () => void;
  };
}) => {
  const { t } = useTranslation();
  const data = item.get();
  if (data === null) return <div>not found</div>;

  return (
    <div>
      {" "}
      <SheetContainer resize={resize} action={action ? action : {}}>
        <div style={{ display: "flex" }}>
          <Inputable
            title={t("Name", { context: "sheet" })}
            value={data.name || ""}
            onChange={(e) => item.setName(e.target.value)}
          />
          <Inputable
            title={t("Concept", { context: "sheet" })}
            value={data.concept || ""}
            onChange={(e) => item.setConcept(e.target.value)}
          />
          <Inputable
            title={t("Patron", { context: "sheet" })}
            value={data.patron || ""}
            onChange={(e) => item.setPatron(e.target.value)}
          />
        </div>
        <div style={{ display: "flex" }}>
          <Chronicle sheet={item} />
          <Selectable
            title={t("Auspice", { context: "sheet" })}
            value={data.auspice || "none"}
            onChange={(e) => item.setAuspice(e.target.value)}
            options={[
              { id: "ahroun", name: "Ahroun" },
              { id: "galliard", name: "Galliard" },
              { id: "philodox", name: "Philodox" },
              { id: "ragabash", name: "Ragabash" },
              { id: "theurge", name: "Theurge" },
            ]}
            noOptions={t("Select an auspice", { context: "sheet" })}
          />
          <Selectable
            title={t("Tribe", { context: "sheet" })}
            value={data.tribe || "none"}
            onChange={(e) => item.setTribe(e.target.value)}
            options={[
              {
                id: "red-talons",
                name: t("Red Talons", { context: "sheet" }),
              },
              {
                id: "glass-walkers",
                name: t("Glasswalkers", { context: "sheet" }),
              },
              {
                id: "ghost-council",
                name: t("Ghost Council", { context: "sheet" }),
              },
              {
                id: "harth-wardens",
                name: t("Harth Wardens", { context: "sheet" }),
              },
              {
                id: "children-of-gaia",
                name: t("Children of Gaia", { context: "sheet" }),
              },
              {
                id: "black-furies",
                name: t("Black Furies", { context: "sheet" }),
              },
              {
                id: "gale-stalkers",
                name: t("Galestalkers", { context: "sheet" }),
              },
              {
                id: "bone-gnawers",
                name: t("Bonegnawers", { context: "sheet" }),
              },
              {
                id: "shadow-lords",
                name: t("Shadow Lords", { context: "sheet" }),
              },
              {
                id: "silver-fangs",
                name: t("Silver Fangs", { context: "sheet" }),
              },
              {
                id: "silent-striders",
                name: t("Silent striders", { context: "sheet" }),
              },
            ]}
            noOptions={t("Select a tribe", { context: "sheet" })}
          />
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
              {t("Physical", { context: "sheet" })}
            </div>
            <Trans
              i18nKey="<strength/><dexterity/><stamina/>"
              components={{
                strength: (
                  <Dottable
                    title={t("Strength", { context: "sheet" })}
                    value={data.attributes.physical.strength}
                    saveValue={(value) =>
                      item.setAttributes("physical", "strength", value)
                    }
                  />
                ),
                dexterity: (
                  <Dottable
                    title={t("Dexterity", { context: "sheet" })}
                    value={data.attributes.physical.dexterity}
                    saveValue={(value) =>
                      item.setAttributes("physical", "dexterity", value)
                    }
                  />
                ),
                stamina: (
                  <Dottable
                    title={t("Stamina", { context: "sheet" })}
                    value={data.attributes.physical.stamina}
                    saveValue={(value) =>
                      item.setAttributes("physical", "stamina", value)
                    }
                  />
                ),
              }}
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
              {t("Social", { context: "sheet" })}
            </div>
            <Trans
              i18nKey="<composure/><charisma/><manipulation/>"
              components={{
                composure: (
                  <Dottable
                    title={t("Composure", { context: "sheet" })}
                    value={data.attributes.social.composure}
                    saveValue={(value) =>
                      item.setAttributes("social", "composure", value)
                    }
                  />
                ),
                charisma: (
                  <Dottable
                    title={t("Charisma", { context: "sheet" })}
                    value={data.attributes.social.charisma}
                    saveValue={(value) =>
                      item.setAttributes("social", "charisma", value)
                    }
                  />
                ),
                manipulation: (
                  <Dottable
                    title={t("Manipulation", { context: "sheet" })}
                    value={data.attributes.social.manipulation}
                    saveValue={(value) =>
                      item.setAttributes("social", "manipulation", value)
                    }
                  />
                ),
              }}
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
              {t("Mental", { context: "sheet" })}
            </div>
            <Trans
              i18nKey="<intelligence/><wits/><resolve/>"
              components={{
                intelligence: (
                  <Dottable
                    title={t("Intelligence", { context: "sheet" })}
                    value={data.attributes.mental.intelligence}
                    saveValue={(value) =>
                      item.setAttributes("mental", "intelligence", value)
                    }
                  />
                ),
                wits: (
                  <Dottable
                    title={t("Wits", { context: "sheet" })}
                    value={data.attributes.mental.wits}
                    saveValue={(value) =>
                      item.setAttributes("mental", "wits", value)
                    }
                  />
                ),
                resolve: (
                  <Dottable
                    title={t("Resolve", { context: "sheet" })}
                    value={data.attributes.mental.resolve}
                    saveValue={(value) =>
                      item.setAttributes("mental", "resolve", value)
                    }
                  />
                ),
              }}
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
        <Separator text={t("SKILLS", { context: "sheet" })} />
        <div style={{ display: "flex" }}>
          <div style={{ width: "100%" }}>
            <Trans
              i18nKey="<athletics/><brawl/><craft/><driving/><firearms/><larceny/><melee/><stealth/><survival/>"
              components={{
                athletics: (
                  <Skill
                    title={t("Athletics", { context: "sheet" })}
                    value={data.skills.physical.athletics}
                    saveValue={(value) =>
                      item.setSkill("physical", "athletics", value)
                    }
                  />
                ),
                brawl: (
                  <Skill
                    title={t("Brawl", { context: "sheet" })}
                    value={data.skills.physical.brawl}
                    saveValue={(value) =>
                      item.setSkill("physical", "brawl", value)
                    }
                  />
                ),
                craft: (
                  <Skill
                    title={t("Craft", { context: "sheet" })}
                    value={data.skills.physical.craft}
                    saveValue={(value) =>
                      item.setSkill("physical", "craft", value)
                    }
                  />
                ),
                driving: (
                  <Skill
                    title={t("Driving", { context: "sheet" })}
                    value={data.skills.physical.drive}
                    saveValue={(value) =>
                      item.setSkill("physical", "drive", value)
                    }
                  />
                ),
                firearms: (
                  <Skill
                    title={t("Firearms", { context: "sheet" })}
                    value={data.skills.physical.firearms}
                    saveValue={(value) =>
                      item.setSkill("physical", "firearms", value)
                    }
                  />
                ),
                larceny: (
                  <Skill
                    title={t("Larceny", { context: "sheet" })}
                    value={data.skills.physical.larceny}
                    saveValue={(value) =>
                      item.setSkill("physical", "larceny", value)
                    }
                  />
                ),
                melee: (
                  <Skill
                    title={t("Melee", { context: "sheet" })}
                    value={data.skills.physical.melee}
                    saveValue={(value) =>
                      item.setSkill("physical", "melee", value)
                    }
                  />
                ),
                stealth: (
                  <Skill
                    title={t("Stealth", { context: "sheet" })}
                    value={data.skills.physical.stealth}
                    saveValue={(value) =>
                      item.setSkill("physical", "stealth", value)
                    }
                  />
                ),
                survival: (
                  <Skill
                    title={t("Survival", { context: "sheet" })}
                    value={data.skills.physical.survival}
                    saveValue={(value) =>
                      item.setSkill("physical", "survival", value)
                    }
                  />
                ),
              }}
            />
          </div>
          <div style={{ width: "100%" }}>
            <Trans
              i18nKey="<animalken/><etiquette/><insight/><intimidation/><leadership/><performance/><persuasion/><streetwise/><subterfuge/>"
              components={{
                animalken: (
                  <Skill
                    title={t("Animal Ken", { context: "sheet" })}
                    value={data.skills.social.animalKen}
                    saveValue={(value) =>
                      item.setSkill("social", "animalKen", value)
                    }
                  />
                ),
                etiquette: (
                  <Skill
                    title={t("Etiquette", { context: "sheet" })}
                    value={data.skills.social.etiquette}
                    saveValue={(value) =>
                      item.setSkill("social", "etiquette", value)
                    }
                  />
                ),
                insight: (
                  <Skill
                    title={t("Insight", { context: "sheet" })}
                    value={data.skills.social.insight}
                    saveValue={(value) =>
                      item.setSkill("social", "insight", value)
                    }
                  />
                ),
                intimidation: (
                  <Skill
                    title={t("Intimidation", { context: "sheet" })}
                    value={data.skills.social.intimidation}
                    saveValue={(value) =>
                      item.setSkill("social", "intimidation", value)
                    }
                  />
                ),
                leadership: (
                  <Skill
                    title={t("Leadership", { context: "sheet" })}
                    value={data.skills.social.leadership}
                    saveValue={(value) =>
                      item.setSkill("social", "leadership", value)
                    }
                  />
                ),
                performance: (
                  <Skill
                    title={t("Performance", { context: "sheet" })}
                    value={data.skills.social.performance}
                    saveValue={(value) =>
                      item.setSkill("social", "performance", value)
                    }
                  />
                ),
                persuasion: (
                  <Skill
                    title={t("Persuasion", { context: "sheet" })}
                    value={data.skills.social.persuasion}
                    saveValue={(value) =>
                      item.setSkill("social", "persuasion", value)
                    }
                  />
                ),
                streetwise: (
                  <Skill
                    title={t("Streetwise", { context: "sheet" })}
                    value={data.skills.social.streetwise}
                    saveValue={(value) =>
                      item.setSkill("social", "streetwise", value)
                    }
                  />
                ),
                subterfuge: (
                  <Skill
                    title={t("Subterfuge", { context: "sheet" })}
                    value={data.skills.social.subterfuge}
                    saveValue={(value) =>
                      item.setSkill("social", "subterfuge", value)
                    }
                  />
                ),
              }}
            />
          </div>
          <div style={{ width: "100%" }}>
            <Trans
              i18nKey="<academics/><awareness/><finance/><investigation/><medicine/><occult/><politics/><science/><technology/>"
              components={{
                academics: (
                  <Skill
                    title={t("Academics", { context: "sheet" })}
                    value={data.skills.mental.academics}
                    saveValue={(value) =>
                      item.setSkill("mental", "academics", value)
                    }
                  />
                ),
                awareness: (
                  <Skill
                    title={t("Awareness", { context: "sheet" })}
                    value={data.skills.mental.awareness}
                    saveValue={(value) =>
                      item.setSkill("mental", "awareness", value)
                    }
                  />
                ),
                finance: (
                  <Skill
                    title={t("Finance", { context: "sheet" })}
                    value={data.skills.mental.finance}
                    saveValue={(value) =>
                      item.setSkill("mental", "finance", value)
                    }
                  />
                ),
                investigation: (
                  <Skill
                    title={t("Investigation", { context: "sheet" })}
                    value={data.skills.mental.investigation}
                    saveValue={(value) =>
                      item.setSkill("mental", "investigation", value)
                    }
                  />
                ),
                medicine: (
                  <Skill
                    title={t("Medicine", { context: "sheet" })}
                    value={data.skills.mental.medicine}
                    saveValue={(value) =>
                      item.setSkill("mental", "medicine", value)
                    }
                  />
                ),
                occult: (
                  <Skill
                    title={t("Occult", { context: "sheet" })}
                    value={data.skills.mental.occult}
                    saveValue={(value) =>
                      item.setSkill("mental", "occult", value)
                    }
                  />
                ),
                politics: (
                  <Skill
                    title={t("Politics", { context: "sheet" })}
                    value={data.skills.mental.politics}
                    saveValue={(value) =>
                      item.setSkill("mental", "politics", value)
                    }
                  />
                ),
                science: (
                  <Skill
                    title={t("Science", { context: "sheet" })}
                    value={data.skills.mental.science}
                    saveValue={(value) =>
                      item.setSkill("mental", "science", value)
                    }
                  />
                ),
                technology: (
                  <Skill
                    title={t("Technology", { context: "sheet" })}
                    value={data.skills.mental.technology}
                    saveValue={(value) =>
                      item.setSkill("mental", "technology", value)
                    }
                  />
                ),
              }}
            />
          </div>
        </div>
        <Separator text={t("RENOWN", { context: "sheet" })} />
        <div style={{ display: "flex", margin: "20px 0 60px 0" }}>
          <Renown
            allowZero
            title={t("Glory", { context: "sheet" })}
            value={data.renown.glory}
            saveValue={(value) => item.setRenown("glory", value)}
          />
          <Renown
            allowZero
            title={t("Honor", { context: "sheet" })}
            value={data.renown.honor}
            saveValue={(value) => item.setRenown("honor", value)}
          />
          <Renown
            allowZero
            title={t("Wisdom", { context: "sheet" })}
            value={data.renown.wisdom}
            saveValue={(value) => item.setRenown("wisdom", value)}
          />
        </div>
        <Separator text={t("GIFT & RITES", { context: "sheet" })} />
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
              value={data.rage}
              saveValue={(value) => item.setRage(value)}
            />
          </div>
        </div>
      </SheetContainer>
    </div>
  );
};

export default PageFront;
