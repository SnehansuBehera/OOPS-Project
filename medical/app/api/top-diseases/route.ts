import { currentProfile } from "@/lib/current-profile";
import { db } from '@/lib/db';
import { NextResponse } from "next/server";
export async function POST(req: Request) {
    try {
        const { symptoms }: { symptoms: string } = await req.json();
        const symptomsArray = symptoms.split(',');
        // Fetch diseases from the database where symptom names match the provided symptoms
        const topDiseases = await db.diseasea.findMany({
            where: {
              symptomas: {
                some: {
                  name: {
                    in: symptomsArray
                  }
                }
              }
            },
            include: {
              symptomas: true
            }
          });
          
          // Filter out diseases that don't contain all the provided symptoms
          const filteredDiseases = topDiseases.filter(disease => {
            const diseaseSymptoms = disease.symptomas.map(symptom => symptom.name);
            return symptomsArray.every(symptom => diseaseSymptoms.includes(symptom));
          });
          const filteredDiseases2 = filteredDiseases.map(disease => ({
            id: disease.id,
            name: disease.name,
            createdAt: disease.createdAt,
            updatedAt: disease.updatedAt,
            symptomas: disease.symptomas.map(symptom => symptom.name) // Extracting only the symptom names
          }));
      console.log(filteredDiseases2);
        // Return the top diseases as JSON response
        return NextResponse.json(filteredDiseases2);
    } catch (error) {
        console.error('[TOP_DISEASES_POST]', error);
        // Return an internal server error response
        return new NextResponse('Internal Error', { status: 500 });
    }
}
