import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function User(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { token, email } = req.body;
  try {
    const { data, status } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dashboard/merchant/metadata/?email=${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.status(200).send(data);
  } catch (e: any) {
    if (e.response.status === 400) {
      res.status(200).send({
        metadata: null,
      });
    }
  }
}
