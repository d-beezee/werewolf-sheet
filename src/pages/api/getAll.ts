import type { NextApiRequest, NextApiResponse } from "next";

import { kv } from "@vercel/kv";

type ResponseData = {
  message: string;
};

export default async function (
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const data = await kv.get("sheets:list");
  res.status(200).json({
    message: JSON.stringify(data === null ? [] : data),
  });
}
