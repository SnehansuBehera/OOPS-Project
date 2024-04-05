import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request){
    try{
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const approvedWorkers=await db.profile.findMany({
            where:{role:"APPROVED"}
        })
        return NextResponse.json(approvedWorkers);
    }catch (error) {
    console.error("[WORKERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}