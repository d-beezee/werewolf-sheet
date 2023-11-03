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
  if (typeof key !== "string") {
    res.status(400).json({
      message: "Invalid key.",
    });
    return;
  }

  const client = new MongoClient(process.env.MONGODB_URI || "");
  const database = client.db(process.env.VERCEL_ENV || "development");
  const sheetsCollection = database.collection("sheets");
  const data = await sheetsCollection.findOne({
    id: key,
  });
  if (data === null) {
    client.close();
    res.status(404).json({
      message: "Not found.",
    });
    return;
  }
  await sheetsCollection.deleteOne({
    id: key,
  });
  client.close();
  res.status(200).json({
    message: "ok",
  });
}
