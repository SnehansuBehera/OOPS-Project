"use client";
import { Symptom } from "@prisma/client";
import { SymptomItem } from "./symptom-item";
interface SymptomContentProps{
    symptoms:Symptom[];
}
export const SymptomContent=async({symptoms}:SymptomContentProps)=>{
   if(symptoms.length===0){
        return(
            <div className="flex flex-col gap-y-4 w-full px-6 text-neutral-400 ">
                No Symptoms Found.
            </div>
        )

   } 
   return (
   <div className="flex flex-col gap-y-2 w-full px-6">
        {symptoms.map((symptom)=>(
            <div key={symptom.id} className="flex items-center gap-x-4 w-full">
                    <div className="flex-1">
                        <SymptomItem data={symptom}/>
                    </div>
                </div>
        ))}
   </div>)

}