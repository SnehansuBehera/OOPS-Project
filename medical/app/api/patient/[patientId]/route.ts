import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function GET(req: Request, { params }: { params: { patientId: string } }){
    try{
    const {patientId}=params;
    const patient = await db.patient.findUnique({
        where: { id: patientId },
        include: {
            records:true,
        }
    });

return NextResponse.json(patient);
}
 catch (error) {
    console.error("[PATIENT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
}
}