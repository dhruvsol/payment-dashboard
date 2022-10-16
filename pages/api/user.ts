import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function User(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/me`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );
  res.status(200).send(data);
}
