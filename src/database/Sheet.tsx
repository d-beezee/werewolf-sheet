import { del, get, put } from "@src/database";

export class SheetAlreadyExistsError extends Error {}

type Attribute = number;

type Skill = number;

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
      athletics: Skill;
      brawl: Skill;
      craft: Skill;
      drive: Skill;
      firearms: Skill;
      larceny: Skill;
      melee: Skill;
      stealth: Skill;
      survival: Skill;
    };
    social: {
      animalKen: Skill;
      etiquette: Skill;
      insight: Skill;
      intimidation: Skill;
      leadership: Skill;
      performance: Skill;
      persuasion: Skill;
      streetwise: Skill;
      subterfuge: Skill;
    };
    mental: {
      academics: Skill;
      awareness: Skill;
      finance: Skill;
      investigation: Skill;
      medicine: Skill;
      occult: Skill;
      politics: Skill;
      science: Skill;
      technology: Skill;
    };
  };
  renown: {
    glory: number;
    honor: number;
    wisdom: number;
  };
  gifts: {
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
      health: this.data?.health || { aggravated: 0, superficial: 0 },
      willpower: this.data?.willpower || { aggravated: 0, superficial: 0 },
    };
  }

  get maxHealth() {
    return 3 + (this.data?.attributes?.physical?.stamina || 1);
  }

  get maxWillpower() {
    return (
      (this.data?.attributes?.mental?.wits || 1) +
      (this.data?.attributes?.mental?.resolve || 1)
    );
  }

  public exists() {
    return this.data !== null;
  }

  public async create() {
    if (!this.ready) await this.init();
    if (this.exists())
      throw new SheetAlreadyExistsError("Sheet already exists");
    const sheets = await get("sheets:list");
    const list: string[] = [...(sheets || []), this.name];
    await put(`sheets:list`, list);
    return await put(`sheet-${this.name}`, {});
  }

  public async delete() {
    if (!this.ready) await this.init();
    if (!this.exists()) return;
    const sheets = await get("sheets:list");
    const list: string[] = [...(sheets || [])];
    const index = list.indexOf(this.name);
    if (index > -1) {
      list.splice(index, 1);
    }
    await put(`sheets:list`, list);
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

  private save() {
    return put(`sheet-${this.name}`, this.data);
  }

  public static async list() {
    const sheets = await get("sheets:list");
    if (sheets === null) return [];
    return sheets as string[];
  }
}

export default Sheet;
