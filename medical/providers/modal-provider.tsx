"use client";

import { CreatePatientModal } from "@/components/modals/create-patient";
import { CreateSymptomModal } from "@/components/modals/create-symptom";
import { DeleteSymptomModal } from "@/components/modals/delete-symptom";
import { EditSymptomModal } from "@/components/modals/edit-symptom";
import {CreateDoctorModal} from "@/components/modals/create-doctor";
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
        <EditSymptomModal/>
        <DeleteSymptomModal/>
        <CreatePatientModal/>
        <CreateDoctorModal/>
        </>
    )
}