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
  health: number;
  willpower: number;
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
  private ready: boolean = false;
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
    return this.data;
  }
  public exists() {
    return this.get() !== null;
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
