import type { NextApiRequest, NextApiResponse } from "next";

import { kv } from "@vercel/kv";

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
  const data = await kv.get(key);
  if (data === null) {
    res.status(404).json({
      message: "Not found.",
    });
    return;
  }
  await kv.del(key);
  res.status(200).json({
    message: "ok",
  });
}
