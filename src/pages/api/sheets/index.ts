import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

const get = async (
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
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
};

const post = async (
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  return res.status(500).json({
    message: "Not implemented.",
  });
};

const put = async (
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  return res.status(500).json({
    message: "Not implemented.",
  });
};

const del = async (
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  return res.status(500).json({
    message: "Not implemented.",
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
