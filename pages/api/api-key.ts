import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { email, wallet, username, avatar } = req.body;
  const { data, status } = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/api-key`,
    {
      email,
      username,
      avatar,
      wallet_address: wallet,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_KEY}`,
      },
    }
  );
  if (status === 400) return res.status(400).send(data);
  res.status(200).send(data);
}
