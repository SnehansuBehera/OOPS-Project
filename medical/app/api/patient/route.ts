import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req:Request) {
    try{
        const {name,sex,age}=await req.json();
        const profile=await currentProfile();
        if(!profile){
            return new NextResponse("Unauthorized",{status:401});
        }
        const patient=await db.patient.create({
         data:{
            name,
            sex,
            age,
            profileId:profile.id,
         }
        });
        return NextResponse.json(patient);

    }
    catch(error){
        console.log("[MEMBER_POST]",error);
        return new NextResponse("Internal Error",{status:500});
    }
    
}