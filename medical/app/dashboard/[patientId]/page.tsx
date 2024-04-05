"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface PatientItemPageProps {
    params: {
        patientId: string;
    }
}

const Page = ({ params }: PatientItemPageProps) => {
    const { patientId } = params;

    const [patient, setPatient] = useState<any>(null);
    const [selectedVisit, setSelectedVisit] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchPatient();
    }, []);

    const fetchPatient = async () => {
        try {
            const response = await axios.get(`/api/patient/${patientId}`);
            if (response.status === 200) {
                setPatient(response.data);
            } else {
                throw new Error('Failed to fetch patient');
            }
        } catch (error) {
            console.error('Error fetching patient:', error);
        } finally {
            setLoading(false);
        }
    };

    const showVisitRecords = (index: number) => {
        setSelectedVisit(index);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!patient) {
        return <div>Patient not found</div>;
    }

    return (
        <div className='w-full h-full'>
            <div className='my-5 w-[80%] mx-auto py-8 px-8 rounded-lg shadow-md shadow-slate-200'>
                <div className='py-4 px-3 border-b-2 border-slate-200'>
                    <p className='font-mono'> {patient.name} Dashboard</p>
                </div>
                <div className='my-4 px-3 flex gap-10 items-center justify-between'>

<div className='flex gap-5 my-4'>

    <div className='py-6 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-[#A956DD] flex flex-col gap-10 items-start justify-between rounded-xl'>
        <div className='flex flex-col gap-4 w-[250px] pr-10'>
            <p className='text-white font-bold text-[20px]'>Get Online Consultance!</p>
            <p className='text-wrap text-gray-200 text-[15px]'>Quick and convinient consultations with top specialists without leving home.</p>
        </div>

        <div className='flex items-center gap-4 justify-between py-3 px-4  bg-white rounded-3xl'>
            <p className='text-black font-bold text-[13px]'>Book an appointment</p>
            <button><Image src='/next.png' alt='next' width={20} height={20} className='w-5' /></button>
        </div>
    </div>
    <div className='py-6 px-4 bg-gradient-to-r from-[#C8CDF4] via-[#DCDEF6] to-[#E7E9F7] flex flex-col gap-10 items-start justify-between rounded-xl'>
        <div className='flex flex-col gap-4 w-[250px] pr-10'>
            <p className='text-black font-bold text-[20px]'>Get Doctor Home Visit!</p>
            <p className='text-wrap text-gray-500 text-[15px] font-semibold'>Do you feel bad? Can't get to the hospital? Invite a doctor to your home!</p>
        </div>

        <div className='flex items-center gap-4 justify-between py-3 px-4  bg-white rounded-3xl'>
            <p className='text-black font-bold text-[13px]'>Book an appointment</p>
            <button><Image src='/next.png' alt='next' width={20} height={20} className='w-5' /></button>
        </div>
    </div>
</div>

<div className='flex flex-col gap-2 items-center justify-center w-[20rem] my-4 border-l-2 border-slate-200'>
    <Image src={patient.imageUrl} alt='patient' width={200} height={200} className=' w-40 rounded-md' />
    <div className='flex flex-col items-center justify-center gap-8 my-2'>
        <div className=' leading-[1.5rem] text-center'>
            <h1 className='font-serif text-[2rem] text-gray-600'>{patient.name}</h1>
            <p className='font-bold text-[14px] text-gray-400'>20 years</p>
        </div>

        <div className='flex border-2 border-slate-200 rounded-3xl py-2 w-[200px] flex-wrap gap-1 items-center justify-center'>

            <p className='font-bold text-[14px] text-[#6964F1]'>Weight: {patient.weight} kg</p>
            <p className='font-bold text-[14px] text-[#A956DF]'>Height: {patient.height} cm</p>
            <p className='font-bold text-[14px] text-gray-400'>Gender: {patient.sex}</p>
            <p className='font-bold text-[14px] text-gray-400'>Blood Group: {patient.bloodgroup}</p>
        </div>

    </div>

</div>

</div>
                <div className='flex gap-8 items-center justify-start'>
                    <div className='w-[50%]'>
                        <div className='flex items-center justify-start gap-8 py-1 px-4'>
                            <p className='font-bold text-black'>See Patient's Medical Records</p>
                        </div>
                        <div className='px-4'>
                            {patient.records.map((record: any, index: number) => (
                                <div key={index} className='bg-green-400 rounded-lg my-2 py-2 px-3 w-72 flex items-center justify-between gap-5 cursor-pointer' onClick={() => showVisitRecords(index)}>
                                    <p className='font-bold text-white'>Visit {index + 1}</p>
                                    <Image src='/next.png' alt='next' width={20} height={20} className='w-15' />
                                </div>
                            ))}
                        </div>
                    </div>
                    {selectedVisit !== null && (
                        <div className='px-4 py-4 shadow-sm rounded-lg shadow-slate-400 flex flex-col gap-4'>
                            <div>
                                <p className='text-[25px] font-medium text-gray-600 pb-4 border-b-2 border-slate-200'>Symptoms</p>
                                <p className='font-bold mt-3 text-gray-600'>{patient.records[selectedVisit].symptomRecord}</p>
                            </div>
                            <div>
                                <p className='text-[25px] font-medium text-gray-600 pb-4 border-b-2 border-slate-200'>Disease</p>
                                <p className='font-bold text-red-400 mt-3'>{patient.records[selectedVisit].diseaseRecord}</p>
                            </div>
                            {/* Add more details for the selected visit here */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;