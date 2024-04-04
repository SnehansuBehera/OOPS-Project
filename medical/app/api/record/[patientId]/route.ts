import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function GET(req: Request, { params }: { params: { patientId: string } }) 
{
    try {
        const { patientId } = params;
        const record = await db.record.findFirst({
            where: {
              patientId: patientId,
            },
            orderBy: {
              createdAt: 'desc',
            },
          });
          if(!record){
            return new NextResponse("Record not found", { status: 404 });
        }
        console.log(record);
        return NextResponse.json(record);
        }
        catch (error) {
            console.error("[RECORD_GET]", error);
            return new NextResponse("Internal Error", { status: 500 });
        }
    }
    export async function PATCH(req: Request, { params }: { params: { patientId: string } }) {
      try {
          const { patientId } = params;
          const { checkedAdditionalSymptoms } = await req.json(); 
  
          const record = await db.record.findFirst({
              where: {
                  patientId: patientId,
              },
              orderBy: {
                  createdAt: 'desc',
              },
          });
  
          if (!record) {
              return new NextResponse("Record not found", { status: 404 });
          }
  
          const diseaseRecord = record.diseaseRecord.split(',');
          const diseases = await db.diseasea.findMany({
              where: {
                  name: {
                      in: diseaseRecord,
                  },
              },
              include: {
                  symptomas: true,
              },
          });
  
          const filteredDiseases = diseases.filter(disease => {
            console.log('additionalCheckedSymptoms:', checkedAdditionalSymptoms);
            return checkedAdditionalSymptoms.every((symptom: string) =>
                disease.symptomas.map(s => s.name).includes(symptom)
            );
        });
        const updatedSymptomRecord = record.symptomRecord
        ? `${record.symptomRecord},${checkedAdditionalSymptoms.join(',')}`
        : checkedAdditionalSymptoms.join(',');

    const updatedAdditionalSymptomRecord = record.additionalSymptomRecord
        ? record.additionalSymptomRecord
              .split(',')
              .filter(symptom => !checkedAdditionalSymptoms.includes(symptom))
              .join(',')
        : '';
          // Update the result field of the record with the filtered diseases
          const updatedRecord = await db.record.update({
              where: { id: record.id },
              data: {
                symptomRecord: updatedSymptomRecord,
                additionalSymptomRecord: updatedAdditionalSymptomRecord,
                diseaseRecord:filteredDiseases.map(disease => disease.name).join(','),
                  result: filteredDiseases.map(disease => disease.name).join(','),
              },
          });
  
          return NextResponse.json(updatedRecord);
      } catch (error) {
          console.error("[RECORD_PATCH]", error);
          return new NextResponse("Internal Error", { status: 500 });
      }
  }