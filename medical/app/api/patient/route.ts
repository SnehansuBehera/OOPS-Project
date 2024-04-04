import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
    try {
        const { name, sex, age, weight, height, imageUrl, bloodgroup } = await req.json();
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const patient = await db.patient.create({
            data: {
                name,
                sex,
                age,
                weight,
                height,
                imageUrl,
                bloodgroup,
                profileId: profile.id,
            }
        });
        return NextResponse.json(patient);

    }
    catch (error) {
        console.log("[MEMBER_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }

}
export async function GET(req: Request) {
    try {
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const patients = await db.patient.findMany({
            where: {
                profileId: profile.id
            }
        });
        return NextResponse.json(patients);
    } catch (error) {
        console.error("[PATIENT_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}