import { del, get, getAll, put } from "@src/database";

export class SheetAlreadyExistsError extends Error {}

type Attribute = number;

export type tSkill = { value: number; specialty?: string };

type AdvantageFlaw = {
  value: number;
  name: string;
};

type SheetData = {
  name: string;
  chronicle: string;
  concept: string;
  auspice: string;
  patron: string;
  tribe: string;
  health: { aggravated: number; superficial: number };
  crinos: { aggravated: number; superficial: number };
  willpower: { aggravated: number; superficial: number };
  attributes: {
    physical: {
      strength: Attribute;
      dexterity: Attribute;
      stamina: Attribute;
    };
    social: {
      charisma: Attribute;
      manipulation: Attribute;
      appearance: Attribute;
    };
    mental: {
      resolve: Attribute;
      intelligence: Attribute;
      wits: Attribute;
    };
  };
  skills: {
    physical: {
      athletics: tSkill;
      brawl: tSkill;
      craft: tSkill;
      drive: tSkill;
      firearms: tSkill;
      larceny: tSkill;
      melee: tSkill;
      stealth: tSkill;
      survival: tSkill;
    };
    social: {
      animalKen: tSkill;
      etiquette: tSkill;
      insight: tSkill;
      intimidation: tSkill;
      leadership: tSkill;
      performance: tSkill;
      persuasion: tSkill;
      streetwise: tSkill;
      subterfuge: tSkill;
    };
    mental: {
      academics: tSkill;
      awareness: tSkill;
      finance: tSkill;
      investigation: tSkill;
      medicine: tSkill;
      occult: tSkill;
      politics: tSkill;
      science: tSkill;
      technology: tSkill;
    };
  };
  renown: {
    glory: number;
    honor: number;
    wisdom: number;
  };
  gifts: {
    _id: string;
    name: string;
    pool: string;
    cost: string;
    notes: string;
  }[];
  rage: number;
  tenets: string;
  touchstones: string[];
  favor: string;
  bans: string;
  advantages: AdvantageFlaw[];
  flaws: AdvantageFlaw[];
  harano: number;
  hauglosk: number;
  appearance: string;
  history: string;
  notes: string;
};

class Sheet {
  private data: SheetData | null = null;
  public ready: boolean = false;
  private name: string;

  constructor(name: string) {
    this.name = name.toLowerCase().replace(/\s/g, "-");
  }

  public async init() {
    const data = await get(`sheet-${this.name}`);
    if (data) this.data = data as unknown as SheetData;
    this.ready = true;
    return data;
  }

  public get() {
    return {
      ...this.data,
      attributes: {
        physical: {
          strength: 1,
          dexterity: 1,
          stamina: 1,
          ...this.data?.attributes?.physical,
        },
        mental: {
          resolve: 1,
          intelligence: 1,
          wits: 1,
          ...this.data?.attributes?.mental,
        },
        social: {
          charisma: 1,
          manipulation: 1,
          appearance: 1,
          ...this.data?.attributes?.social,
        },
      },
      skills: {
        physical: {
          athletics: { value: 0 },
          brawl: { value: 0 },
          craft: { value: 0 },
          drive: { value: 0 },
          firearms: { value: 0 },
          larceny: { value: 0 },
          melee: { value: 0 },
          stealth: { value: 0 },
          survival: { value: 0 },

          ...this.data?.skills?.physical,
        },
        social: {
          animalKen: { value: 0 },
          etiquette: { value: 0 },
          insight: { value: 0 },
          intimidation: { value: 0 },
          leadership: { value: 0 },
          performance: { value: 0 },
          persuasion: { value: 0 },
          streetwise: { value: 0 },
          subterfuge: { value: 0 },
          ...this.data?.skills?.physical,
        },
        mental: {
          academics: { value: 0 },
          awareness: { value: 0 },
          finance: { value: 0 },
          investigation: { value: 0 },
          medicine: { value: 0 },
          occult: { value: 0 },
          politics: { value: 0 },
          science: { value: 0 },
          technology: { value: 0 },

          ...this.data?.skills?.physical,
        },
      },
      health: this.data?.health || { aggravated: 0, superficial: 0 },
      crinos: this.data?.crinos || { aggravated: 0, superficial: 0 },
      willpower: this.data?.willpower || { aggravated: 0, superficial: 0 },
      renown: { glory: 0, honor: 0, wisdom: 0, ...this.data?.renown },
      rage: this.data?.rage || 0,
    };
  }

  get maxHealth() {
    return 3 + this.get().attributes.physical.stamina;
  }

  get maxWillpower() {
    return (
      this.get().attributes.mental.wits + this.get().attributes.mental.resolve
    );
  }

  public exists() {
    return this.data !== null;
  }

  public async create() {
    if (!this.ready) await this.init();
    if (this.exists())
      throw new SheetAlreadyExistsError("Sheet already exists");
    return await put(`sheet-${this.name}`, {});
  }

  public async delete() {
    if (!this.ready) await this.init();
    if (!this.exists()) return;
    await del(`sheet-${this.name}`);
  }

  public setName(name: string) {
    if (this.data === null) throw new Error("Sheet does not exists");
    this.data.name = name;
    this.save();
  }

  public setConcept(value: string) {
    if (this.data === null) throw new Error("Sheet does not exists");
    this.data.concept = value;
    this.save();
  }

  public setPatron(value: string) {
    if (this.data === null) throw new Error("Sheet does not exists");
    this.data.patron = value;
    this.save();
  }

  public setChronicle(value: string) {
    if (this.data === null) throw new Error("Sheet does not exists");
    this.data.chronicle = value;
    this.save();
  }

  public setAuspice(value: string) {
    if (this.data === null) throw new Error("Sheet does not exists");
    this.data.auspice = value;
    this.save();
  }

  public setTribe(value: string) {
    if (this.data === null) throw new Error("Sheet does not exists");
    this.data.tribe = value;
    this.save();
  }

  public setHealth(value: { aggravated: number; superficial: number }) {
    if (this.data === null) throw new Error("Sheet does not exists");
    if (
      this.get().health.aggravated === value.aggravated &&
      this.get().health.superficial === value.superficial
    )
      return;
    this.data.health = value;
    this.save();
  }

  public setCrinos(value: { aggravated: number; superficial: number }) {
    if (this.data === null) throw new Error("Sheet does not exists");
    if (
      this.get().crinos.aggravated === value.aggravated &&
      this.get().crinos.superficial === value.superficial
    )
      return;
    this.data.crinos = value;
    this.save();
  }

  public setWillpower(value: { aggravated: number; superficial: number }) {
    if (this.data === null) throw new Error("Sheet does not exists");
    if (
      this.get().health.aggravated === value.aggravated &&
      this.get().health.superficial === value.superficial
    )
      return;
    this.data.willpower = value;
    this.save();
  }

  public setAttributes<T extends keyof SheetData["attributes"]>(
    type: T,
    value: keyof SheetData["attributes"][T],
    newValue: number
  ) {
    if (this.data === null) throw new Error("Sheet does not exists");
    if (this.get().attributes[type][value] === newValue) return;
    const current =
      this.data.attributes && type in this.data.attributes
        ? this.data.attributes[type]
        : {};
    this.data.attributes = {
      ...this.data.attributes,
      [type]: { ...current, [value]: newValue },
    };
    this.save();
  }

  public setSkill<T extends keyof SheetData["skills"]>(
    type: T,
    value: keyof SheetData["skills"][T],
    newValue: tSkill
  ) {
    if (this.data === null) throw new Error("Sheet does not exists");
    const skill = this.get().skills[type][value] as tSkill;
    if (
      skill.value === newValue.value &&
      (typeof newValue.specialty === "undefined" ||
        skill.specialty === newValue.specialty)
    )
      return;

    const current =
      this.data.skills && type in this.data.skills
        ? this.data.skills[type]
        : {};
    const currentValue =
      this.data.skills &&
      type in this.data.skills &&
      value in this.data.skills[type]
        ? this.data.skills[type][value]
        : {};
    this.data.skills = {
      ...this.data.skills,
      [type]: { ...current, [value]: { ...currentValue, ...newValue } },
    };
    this.save();
  }

  public setRenown<T extends keyof SheetData["renown"]>(
    type: T,
    newValue: number
  ) {
    if (this.data === null) throw new Error("Sheet does not exists");
    const renown = this.get().renown[type];
    if (renown === newValue) return;
    this.data.renown = {
      ...this.data.renown,
      [type]: newValue,
    };
    this.save();
  }

  public setGifts(newValue: SheetData["gifts"]) {
    if (this.data === null) throw new Error("Sheet does not exists");
    if (JSON.stringify(this.get().gifts) === JSON.stringify(newValue)) return;
    this.data.gifts = newValue;
    this.data.gifts = this.data.gifts.map((gift, i) => ({
      ...gift,
      _id: i.toString(),
    }));
    this.save();
  }

  public setRage(newValue: number) {
    if (this.data === null) throw new Error("Sheet does not exists");
    if (this.get().rage === newValue) return;
    this.data.rage = newValue;
    this.save();
  }

  private save() {
    return put(`sheet-${this.name}`, this.data);
  }

  public static async list() {
    const sheets = await getAll();
    if (sheets === null) return [];
    return sheets as string[];
  }
}

export default Sheet;
