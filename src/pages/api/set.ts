import type { NextApiRequest, NextApiResponse } from "next";

import { MongoClient } from "mongodb";

type ResponseData = {
  message: string;
};

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { key, value } = req.query;

  if (typeof key !== "string" || typeof value !== "string") {
    res.status(400).json({
      message: `Invalid key. ${key} ${value}}`,
    });
    return;
  }

  const client = new MongoClient(process.env.MONGODB_URI || "");
  const database = client.db(process.env.VERCEL_ENV || "development");
  const sheetsCollection = database.collection("sheets");

  await sheetsCollection.updateOne(
    { id: key },
    {
      $set: { id: key, data: JSON.parse(value) },
    },
    {
      upsert: true,
    }
  );
  client.close();
  res.status(200).json({
    message: "ok",
  });
}
