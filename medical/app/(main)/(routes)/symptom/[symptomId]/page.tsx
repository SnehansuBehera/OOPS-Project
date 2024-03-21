import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";
interface SymptomItemPageProps{
    params:{
        symptomId:string;
    }
}
const Symptom=async({params}:SymptomItemPageProps)=>{ 
    const profile=await currentProfile();
    if(!profile){
        return redirectToSignIn();
    }
    const symptom=await db.symptom.findUnique({
        where:{
            id:params.symptomId
        },
        include:{
            remedies:true,
            diseases:true,

        }

    });
    if(!symptom){
        return redirect("/");
    }
    return(
        <div>
             <div className="text-emerald-600 font-semibold ">
            {symptom.name}
            </div>
            {symptom.diseases.map((disease)=>(
                <div className="text-rose-600 font-semibold " key={disease.id}>
                    {disease.name}
                 </div>

            ))}
          {symptom.remedies.map((remedy)=>(
                <div className="text-purple-600 font-semibold " key={remedy.id}>
                    {remedy.name}
                 </div>

            ))}
              <Image
           src={symptom.imageUrl}
           width={50}
           height={50}
           alt="Image Item"
           className="object-cover"
           />
        </div>
 
     
    );
}
export default Symptom