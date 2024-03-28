import { currentMember } from "@/lib/current-member";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request,{ params }: { params: { questionId: string }}) {
    const { questionId } = params;
    try {
        const member = await currentMember();
        if (!member) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        // Fetch all symptoms
        const subquestions = await db.subQuestion.findMany({
            where:{
                questionId:questionId
            }
        });


        return NextResponse.json(subquestions);
    } catch (error) {
        console.error("[SUBQUESTIONS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


