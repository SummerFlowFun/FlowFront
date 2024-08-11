// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApiBaseURL } from "@/components/URL";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const UserReq = await axios.get(
      `${ApiBaseURL}user/information/${"4725152c-7f59-4874-9a87-0ce5e02ba065"}`
    );
    console.log(UserReq);
    console.log(UserReq.data);
  } catch (e: any) {
    console.log(e.message);
  }

  res.status(200).json({ name: "John Doe" });
}
