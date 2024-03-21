import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SymptomSearch } from "./symptom-search";
import { currentProfile } from "@/lib/current-profile";



export const SymptomSearchbar=async() => {
    const profile=await currentProfile();
    const symptoms = await db.symptom.findMany({
                include: {
                    diseases: true,
                    remedies: true,
                },
            })

    if (!profile) {
        return redirect("/");
    }

    return (
        <ScrollArea className="flex-1 px-3">
            <div className="mt-2">
                <SymptomSearch
                    data={[
                        {
                            label: "Symptom",
                            data: symptoms.map((symptom) => ({
                                id: symptom.id,
                                name: symptom.name,
                            })),
                        },
                    ]}
                />
            </div>
        </ScrollArea>
    );
};
