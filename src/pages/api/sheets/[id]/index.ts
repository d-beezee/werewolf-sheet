import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

const get = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  const { id } = req.query;

  const client = new MongoClient(process.env.MONGODB_URI || "");
  const database = client.db(process.env.VERCEL_ENV || "development");
  const sheetsCollection = database.collection("sheets");
  const sheet = await sheetsCollection.findOne({
    id: `sheet-${id}`,
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
};

const post = async (
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  return res.status(500).json({
    message: "Not implemented.",
  });
};

const put = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  const { id, value } = req.query;

  if (typeof id !== "string" || typeof value !== "string") {
    res.status(400).json({
      message: `Invalid key. ${id} ${value}}`,
    });
    return;
  }

  const client = new MongoClient(process.env.MONGODB_URI || "");
  const database = client.db(process.env.VERCEL_ENV || "development");
  const sheetsCollection = database.collection("sheets");

  await sheetsCollection.updateOne(
    { id: `sheet-${id}` },
    {
      $set: { id: `sheet-${id}`, data: JSON.parse(value) },
    },
    {
      upsert: true,
    }
  );
  client.close();
  res.status(200).json({
    message: "ok",
  });
};

const del = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  const { id } = req.query;

  const client = new MongoClient(process.env.MONGODB_URI || "");
  const database = client.db(process.env.VERCEL_ENV || "development");
  const sheetsCollection = database.collection("sheets");
  const data = await sheetsCollection.findOne({
    id: `sheet-${id}`,
  });
  if (data === null) {
    client.close();
    res.status(404).json({
      message: "Not found.",
    });
    return;
  }
  await sheetsCollection.deleteOne({
    id: `sheet-${id}`,
  });
  client.close();
  res.status(200).json({
    message: "ok",
  });
};

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case "GET":
      return await get(req, res);
    case "POST":
      return await post(req, res);
    case "PUT":
      return await put(req, res);
    case "DELETE":
      return await del(req, res);
    default:
      res.status(405).json({
        message: "Method Not Allowed",
      });
      return;
  }
}
