import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type ResponseData = {
  message: string;
};

const get = async (
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const session = await getSession({ req: _req });
  if (!session) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const client = new MongoClient(process.env.MONGODB_URI || "");
  const database = client.db(process.env.VERCEL_ENV || "development");
  const sheetsCollection = database.collection("sheets");
  const sheets = await sheetsCollection
    .find(
      {
        id: /^sheet-/,
        user: session?.user?.email || "anyone",
      },
      {
        projection: {
          id: 1,
          data: { name: 1 },
        },
      }
    )
    .toArray();
  res.status(200).json({
    message: JSON.stringify(
      sheets.map((sheet) => {
        const id = sheet.id.replace(/^sheet-/, "");
        return {
          id,
          name:
            sheet.data.name && sheet.data.name !== "" ? sheet.data.name : id,
        };
      })
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
