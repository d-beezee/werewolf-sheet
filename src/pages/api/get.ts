import type { NextApiRequest, NextApiResponse } from "next";

import { MongoClient } from "mongodb";

type ResponseData = {
  message: string;
};

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { key } = req.query;
  const client = new MongoClient(process.env.MONGODB_URI || "");
  const database = client.db(process.env.VERCEL_ENV || "development");
  const sheetsCollection = database.collection("sheets");
  const sheet = await sheetsCollection.findOne({
    id: key,
  });
  client.close();
  if (sheet === null || "data" in sheet === false) {
    res.status(404).json({
      message: "Not found.",
    });
    return;
  }
  res.status(200).json({
    message: JSON.stringify(sheet),
  });
}
