import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req:Request) {
    try{
        const {name,imageUrl,remedies,diseases}=await req.json();
        const profile=await currentProfile();
        if(!profile){
            return new NextResponse("Unauthorized",{status:401});
        }
        const remedyArray: { name: string }[] = typeof remedies === 'string' ? remedies.split(',').map((remedy: string) => ({ name: remedy.trim() })) : [];
        
        // Check if diseases is a string before splitting
        const diseaseArray: { name: string }[] = typeof diseases === 'string' ? diseases.split(',').map((disease: string) => ({ name: disease.trim() })) : [];
        const symptom=await db.symptom.create({
         data:{
            name,
            imageUrl,
            remedies: { create: remedyArray },
            diseases: { create: diseaseArray }
         }
        });
        return NextResponse.json(symptom);

    }
    catch(error){
        console.log("[SYMPTOM_POST]",error);
        return new NextResponse("Internal Error",{status:500});
    }
    
}