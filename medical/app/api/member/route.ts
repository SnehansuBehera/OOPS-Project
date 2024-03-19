import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req:Request) {
    try{
        const {name,MemberImageUrl,role,doctorProofImageUrl,ImpMessage}=await req.json();
        const profile=await currentProfile();
        if(!profile){
            return new NextResponse("Unauthorized",{status:401});
        }
        if(!MemberImageUrl){
            return new NextResponse("No Member Image",{status:400});
        }
        const member=await db.member.create({
         data:{
            name,
            ImpMessage,
            MemberImageUrl,
            role,
            doctorProofImageUrl,
            profileId:profile.id,
         }
        });
        return NextResponse.json(member);

    }
    catch(error){
        console.log("[MEMBER_POST]",error);
        return new NextResponse("Internal Error",{status:500});
    }
    
}