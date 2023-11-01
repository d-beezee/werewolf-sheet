import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function (
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(500).json({
    message: "Not implemented.",
  });
}
