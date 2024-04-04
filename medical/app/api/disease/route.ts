import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req:Request) {
    try{
        const {name,remedies,symptoms}=await req.json();
        const profile=await currentProfile();
        if(!profile){
            return new NextResponse("Unauthorized",{status:401});
        }
        const remedyArray: { name: string }[] = typeof remedies === 'string' ? remedies.split(',').map((remedy: string) => ({ name: remedy.trim() })) : [];        
        const symptomArray: { name: string }[] = typeof symptoms === 'string' ? symptoms.split(',').map((symptom: string) => ({ name: symptom.trim() })) : [];
        const disease=await db.diseasea.create({
         data:{
            name,
            treatmenta: { create: remedyArray },
            symptomas: { create: symptomArray}
         }
        });
        return NextResponse.json(disease);

    }
    catch(error){
        console.log("[DISEASE_POST]",error);
        return new NextResponse("Internal Error",{status:500});
    }
    
}

