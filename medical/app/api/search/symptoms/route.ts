// API endpoint: /api/symptoms
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";
import { db } from '@/lib/db';
import { currentProfile } from "@/lib/current-profile";
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;
  const profile = await currentProfile();
  if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const symptoms = await db.symptom.findMany({
      where: {
        name: {
          startsWith: query as string,
        },
      },
    });
    res.status(200).json(symptoms);
  } catch (error) {
    console.error("[SYMPTOM_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
}
}
