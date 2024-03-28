import { currentMember } from "@/lib/current-member";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req:Request) {
    try{
        const {HasConvulsion,breathinoneminute,chestindrawing,grunting,nasalflaring,bulgingfontanelle,pusdraining,lookumbilicus,skinpustules,axillarytemperature,lethargic_unconscious,movementinfant,Arethepalmsandsolesyellow}=await req.json();
        const member=await currentMember();
        if(!member){
            return new NextResponse("Unauthorized",{status:401});
        }
    
        const bacteria=await db.bacteria_Jaundice.create({
         data:{
            HasConvulsion,
            breathinoneminute,            
            chestindrawing,
            nasalflaring,
            bulgingfontanelle,
            pusdraining,
            lookumbilicus,
            grunting,
            skinpustules,
            axillarytemperature,
            lethargic_unconscious,
            movementinfant,
            Arethepalmsandsolesyellow,
            memberId:member.id

         }
        });
        return NextResponse.json(bacteria);

    }
    catch(error){
        console.log("[BACTERIA_POST]",error);
        return new NextResponse("Internal Error",{status:500});
    }
    
}
export async function GET(req:Request){

    try{
        const member=await currentMember();
        if(!member){
            return new NextResponse("Unauthorized",{status:401});
        }
        const bacteria=await db.bacteria_Jaundice.findMany({
            where:{
                memberId:member.id
            }
        });
        return NextResponse.json(bacteria);

    }
    catch(error){
        console.log("[BACTERIA_GET]",error);
        return new NextResponse("Internal Error",{status:500});
    }
    

}