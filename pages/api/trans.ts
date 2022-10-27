import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function Trans(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { token } = req.body;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dashboard/transactions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  res.status(200).send(data);
}
