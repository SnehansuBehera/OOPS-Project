import { NextResponse } from "next/server";
import { db } from '@/lib/db';
import { currentProfile } from "@/lib/current-profile";

export async function POST(req: Request) {
  try {
    const { symptoms, patientId }: { symptoms: string; patientId: string } = await req.json();
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

    // Extract the names of filtered diseases
    const filteredDiseaseNames = filteredDiseases.map(disease => disease.name);

    // Find additional symptoms for the filtered diseases
    const additionalSymptoms: string[] = [];
    for (const disease of filteredDiseases) {
      const diseaseSymptoms = disease.symptomas.map(symptom => symptom.name);
      const newSymptoms = diseaseSymptoms.filter(symptom => !symptomsArray.includes(symptom));
      additionalSymptoms.push(...newSymptoms);
    }

    // Deduplicate additional symptoms
    const uniqueAdditionalSymptoms = Array.from(new Set(additionalSymptoms));

    // Convert additional symptoms array to a comma-separated string
    const additionalSymptomsString = uniqueAdditionalSymptoms.join(',');

    // Save the record with additional symptoms and filtered diseases
    const record = await db.record.create({
      data: {
        patient: { connect: { id: patientId } },
        symptomRecord: symptoms,
        diseaseRecord: filteredDiseaseNames.join(','), // Use filtered diseases here
        additionalSymptomRecord: additionalSymptomsString,
      }
    });

    // Return the record as JSON response
    return NextResponse.json(record);
  } catch (error) {
    console.error('[RECORD_POST]', error);
    // Return an internal server error response
    return new NextResponse('Internal Error', { status: 500 });
  }
}
