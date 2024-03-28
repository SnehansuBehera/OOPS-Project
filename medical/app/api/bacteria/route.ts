import { currentMember } from "@/lib/current-member";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req:Request) {
    try{
        const {Convulsion,FastBreathing,SevereChestIndrawing,NasalFlaring,TenOrMorePustules,LethargicOrUnconcious,LessThanNormalMovements,UmbilicusRedOrDraining,PusDischargeFromEar,PalmsAndSolesYellow,AgeLessThan24HrsOrMore,Age14DaysOrMore,PalmsAndSolesNotYellow,TemperatureBetween35and36Degree}=await req.json();
        const member=await currentMember();
        if(!member){
            return new NextResponse("Unauthorized",{status:401});
        }
    
        const bacteria=await db.bacteria_Jaundice.create({
         data:{
            Convulsion,
            FastBreathing,            
            SevereChestIndrawing,
            NasalFlaring,
            TenOrMorePustules,
            LethargicOrUnconcious,
            LessThanNormalMovements,
            UmbilicusRedOrDraining,
            PusDischargeFromEar,
            PalmsAndSolesYellow,
            AgeLessThan24HrsOrMore,
            Age14DaysOrMore,
            PalmsAndSolesNotYellow,
            TemperatureBetween35and36Degree,
            memberId:member.id

         }
        });
        if (Convulsion || FastBreathing) {
            
            const classify=await db.classify.create({
                data: {
                    name: "Possible Serious Bacterial Infection",
                    memberId: member.id,
                    bacteriaId: bacteria.id,
                            
                },
            });
            const treatmentNames = ["Treatment 1", "Treatment 2", "Treatment 3"]; // Example array of treatment names

            const treatments = await Promise.all(treatmentNames.map(async (name) => {
                return await db.treatment.create({
                    data: {
                        name,
                        classifyId: classify.id
                    }
                });
            }));
        }
        

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