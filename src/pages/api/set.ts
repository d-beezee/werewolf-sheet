import type { NextApiRequest, NextApiResponse } from "next";

import { kv } from "@vercel/kv";

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
  await kv.set(key, JSON.parse(value));
  res.status(200).json({
    message: "ok",
  });
}
