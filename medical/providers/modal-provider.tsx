"use client";

import { CreatePatientModal } from "@/components/models/create-patient";
import { CreateSymptomModal } from "@/components/models/create-symptom";
import { DeleteSymptomModal } from "@/components/models/delete-symptom";
import { EditSymptomModal } from "@/components/models/edit-symptom";
import {CreateDoctorModal} from "@/components/models/create-doctor";
import { useEffect, useState } from "react";
import { CreateQuestionModal } from "@/components/models/create-question";
export const ModalProvider=()=>{
    const [isMounted,setIsMounted]=useState(false);
    useEffect(()=>{
        setIsMounted(true);

    }, []);
    if (!isMounted) {
        return null;
    }
    return (
        <>
            <CreateSymptomModal />
            <EditSymptomModal />
            <DeleteSymptomModal />
            <CreatePatientModal />
            <CreateDoctorModal />
            <CreateQuestionModal />
        </>
    )
}