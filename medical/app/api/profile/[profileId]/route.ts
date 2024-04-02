import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function PATCH(req: Request, { params }: { params: { profileId: string } }) {
    try {
        const { profileId } = params;
        const role=await req.json();
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const updatedProfile = await db.profile.update({
            where: { id: profileId },
           data:{
            role:"APPROVED"
           }
        });
        return NextResponse.json(updatedProfile);
    } catch (error) {
        console.error("[PROFILE_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
export async function DELETE(req: Request, { params }: { params: { profileId: string } }) {
    try {
        const { profileId } = params;
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const updatedProfile = await db.profile.delete({
            where: { id: profileId },
        });
        return NextResponse.json(updatedProfile);
    } catch (error) {
        console.error("[PROFILE_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}