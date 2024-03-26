import { redirect } from "next/navigation";
import { db } from "./db"
import { currentProfile } from "@/lib/current-profile";
export const currentMember = async() => {
    const profile=await currentProfile();
    const member=await db.member.findFirst({
        where:{
            profileId:profile?.id,
        }
    });
    if(!member){
        return redirect("/doctor")
    }
    return member;
}

