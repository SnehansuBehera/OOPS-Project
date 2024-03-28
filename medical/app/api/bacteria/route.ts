import { NextResponse } from "next/server";
import { currentMember } from "@/lib/current-member";
import { db } from "@/lib/db";
import { Request } from "express";

export async function POST(req: Request) {
    try {
        const {
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
            TemperatureBetween35and36Degree
        } = await req.json();

        const member = await currentMember();

        if (!member) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const bacteria = await db.bacteria_Jaundice.create({
            data: {
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
                memberId: member.id
            }
        });

        let classifyName = "";
        let treatmentNames = [];

        if (Convulsion || FastBreathing) {
            classifyName = "Possible Serious Bacterial Infection";
            treatmentNames = ["First dose of intramuscular ampicilin", "Prevent low blood sugar", "Refer infant to warm conditions."];
        }
        else if (UmbilicusRedOrDraining || PusDischargeFromEar) {
            classifyName = "Local Bacterial Infection";
            treatmentNames = ["Oral amoxycillin for 5 days.", "Get medicine for Hecibactor pylorri"];
        }
        else if (Age14DaysOrMore || PalmsAndSolesYellow || TemperatureBetween35and36Degree) {
            classifyName = "Possible Severe Jaundice.";
            treatmentNames = ["Prevent low blood sugar.", "keep in warm conditions.", "Refer to hospital."];
        }
        else if (TemperatureBetween35and36Degree && !PalmsAndSolesNotYellow) {
            classifyName = "Possible Acute Jaundice.";
            treatmentNames = ["keep in warm conditions."];
        }
        else {
            return new NextResponse("Invalid parameters", { status: 400 });
        }

        const classify = await db.classify.create({
            data: {
                name: classifyName,
                memberId: member.id,
                bacteriaId: bacteria.id
            },
        });

        const treatments = await Promise.all(treatmentNames.map(async (name) => {
            return await db.treatment.create({
                data: {
                    name,
                    classifyId: classify.id
                }
            });
        }));

        return NextResponse.json(bacteria);
    }
    catch (error) {
        console.log("[BACTERIA_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const member = await currentMember();
        if (!member) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const bacteria = await db.bacteria_Jaundice.findMany({
            where: {
                memberId: member.id
            }
        });
        return NextResponse.json(bacteria);
    }
    catch (error) {
        console.log("[BACTERIA_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
