"use client"
import { Symptom } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface SymptomItemProps{
    data:Symptom;
}
export const SymptomItem=async({data}:SymptomItemProps)=>{
    const router=useRouter();
    const handleClick=()=>{
        return router.push(`/symptom/${data.id}`)
        }
    
    return(
        <div onClick={handleClick} className="flex items-center gap-x-3 cursor-pointer
        hover:bg-neutral-800/50 w-full p-2 rounded-md">
            <div className="relative  rounded-md min-h-[48px]
            min-w-[48px] overflow-hidden">
           <Image
           fill 
           src={data.imageUrl}
           alt="Media Item"
           className="object-cover"
           />
           </div>
           <div className="flex flex-col gap-y-1 overflow-hidden">
            <p className="text-white truncate">
                {data.name}
            </p>
        </div>
    </div>
    )
}