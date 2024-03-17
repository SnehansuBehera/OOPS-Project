"use client";

import { CreateSymptomModal } from "@/components/modals/create-symptom";
import { useEffect, useState } from "react";
export const ModalProvider=()=>{
    const [isMounted,setIsMounted]=useState(false);
    useEffect(()=>{
        setIsMounted(true);

    },[]);
    if(!isMounted){
        return null;
    }
    return(
        <>
        <CreateSymptomModal/>
        
        </>
    )
}