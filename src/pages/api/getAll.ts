import type { NextApiRequest, NextApiResponse } from "next";

import { MongoClient } from "mongodb";

type ResponseData = {
  message: string;
};

export default async function (
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const client = new MongoClient(process.env.MONGODB_URI || "");
  const database = client.db(process.env.VERCEL_ENV || "development");
  const sheetsCollection = database.collection("sheets");
  const sheets = await sheetsCollection
    .find(
      {
        id: /^sheet-/,
      },
      {
        projection: {
          id: 1,
        },
      }
    )
    .toArray();

  res.status(200).json({
    message: JSON.stringify(
      sheets.map((sheet) => sheet.id.replace(/^sheet-/, ""))
    ),
  });
}
