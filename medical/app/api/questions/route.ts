import { currentMember } from "@/lib/current-member";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req:Request) {
    try{
        const {name,subquestions,looklistens}=await req.json();
        const member=await currentMember();
        if(!member){
            return new NextResponse("Not A Patient Or Doctor ",{status:401});
        }
        const subquestionsArray: { name: string }[] = typeof subquestions === 'string' ? subquestions.split(',').map((subquestions: string) => ({ name: subquestions.trim() })) : [];
        const looklistensArray: { name: string }[] = typeof looklistens === 'string' ? looklistens.split(',').map((looklistens: string) => ({ name: looklistens.trim() })) : [];
        const question=await db.question.create({
         data:{
            name,
            subquestions: { create: subquestionsArray },
            looklistens: { create: looklistensArray.map(looklisten => ({ ...looklisten, answer: '' })) },            
         }
        });
        return NextResponse.json(question);

    }
    catch(error){
        console.log("[SYMPTOM_POST]",error);
        return new NextResponse("Internal Error",{status:500});
    }
    
}
export async function GET(req: Request) {
    try {
        const member = await currentMember();
        if (!member) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        // Fetch all questions
        const questions = await db.question.findMany({
            include: {
                subquestions: true,
                looklistens: true,
            },
        });


        return NextResponse.json(questions);
    } catch (error) {
        console.error("[QUESTION_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}