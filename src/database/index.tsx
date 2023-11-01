import { Level } from "level";

const db = new Level("database", {
  valueEncoding: "json",
});

export const put = async (key: string, value: any) => {
  db.open();
  return await db.put(key, value);
};

export const get = async (key: string) => {
  db.open();
  try {
    return await db.get(key);
  } catch (error) {
    return null;
  }
};

export const del = async (key: string) => {
  db.open();
  return await db.del(key);
};
