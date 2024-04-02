import { currentProfile } from "@/lib/current-profile";
import { db } from '@/lib/db';
import { NextResponse } from "next/server";
export async function POST(req: Request) {
    try {
        const { symptoms }: { symptoms: string[] } = await req.json();

        // Fetch diseases from the database where symptom names match the provided symptoms
        const topDiseases = await db.disease.findMany({
            where: {
                symptoms: {
                    some: {
                        name: {
                            in: symptoms
                        }
                    }
                }
            },
            // Sort the diseases by the number of matching symptoms in descending order
            orderBy: {
                symptoms: {
                    count: 'desc'
                }
            },
            // Limit the result to top 3 diseases
            take: 3
        });

        // Return the top diseases as JSON response
        return NextResponse.json(topDiseases);
    } catch (error) {
        console.error('[TOP_DISEASES_POST]', error);
        // Return an internal server error response
        return new NextResponse('Internal Error', { status: 500 });
    }
}
