"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Page = () => {
    const router = useRouter();
    const [patients, setPatients] = useState<any[]>([]);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await axios.get('/api/patient'); // Assuming there's an API endpoint to fetch patients
            if (response.status === 200) {
                setPatients(response.data);
            } else {
                throw new Error('Failed to fetch patients');
            }
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const goToPatientDashboard = (patientId: string) => {
        router.push(`/dashboard/${patientId}`);
    }

    return (
        <div className='w-full'>
            <div className='w-[80%] mx-auto'>
                {patients.map((patient: any) => (
                    <div key={patient.id} className='mb-5'>
                        <div className='px-5 py-4 rounded-lg shadow-md shadow-slate-200 flex gap-5 items-center justify-between'>
                            <div className='flex gap-5 justify-start items-center'>
                                <h1 className='font-mono text-[1.5rem] text-black'>{patient.name}</h1>
                                <Image src={patient.imageUrl} alt='patient' width={200} height={200} className='w-10 rounded-full' />
                            </div>
                            <button onClick={() => goToPatientDashboard(patient.id)} className='p-2 rounded-full bg-transparent border-2 border-black'>
                                <Image src='/next.png' alt='arrow' width={50} height={50} className=' w-6' />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page
