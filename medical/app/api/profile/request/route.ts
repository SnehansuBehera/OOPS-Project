import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
    try {
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        // Fetch all symptoms
        const profiles = await db.profile.findMany({
            where:{role:"REQUEST"}
            });


        return NextResponse.json(profiles);
    } catch (error) {
        console.error("[PROFILE_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}