import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function PATCH(req: Request, { params }: { params: { symptomId: string } }) {
    try {
        const { symptomId } = params;
        const { imageUrl, remedies, diseases } = await req.json();
        console.log(symptomId);

        // Check if profile is authenticated
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Retrieve the existing symptom
        const existingSymptom = await db.symptom.findUnique({
            where: { id: symptomId },
            include: {
                remedies: true,
                diseases: true,
            },
        });

        if (!existingSymptom) {
            return new NextResponse("Symptom not found", { status: 404 });
        }

        // Split remedies and diseases string into arrays
        const remediesArray = remedies ? remedies.split(",").map((name: string) => ({ name })) : [];
        const diseasesArray = diseases ? diseases.split(",").map((name: string) => ({ name })) : [];

        // Update the symptom fields
        const updatedSymptom = await db.symptom.update({
            where: { id: symptomId },
            data: {
                imageUrl: imageUrl || existingSymptom.imageUrl, // Use existing imageUrl if not provided
                remedies: {
                    create: remediesArray, // Wrap createMany in a create property
                    deleteMany: { id: { in: existingSymptom.remedies.map(remedy => remedy.id) } },
                },
                diseases: {
                    create: diseasesArray, // Wrap createMany in a create property
                    deleteMany: { id: { in: existingSymptom.diseases.map(disease => disease.id) } },
                },
            },
            include: {
                remedies: true,
                diseases: true,
            },
        });

        // Return the updated symptom
        return NextResponse.json(updatedSymptom);
    } catch (error) {
        console.error("[SYMPTOM_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
