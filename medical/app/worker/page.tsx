"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Page = () => {
    const [workers, setWorkers] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchApprovedWorkers();
        checkRole();
    }, []);

    const fetchApprovedWorkers = async () => {
        try {
            const response = await axios.get('/api/approved-workers');
            setWorkers(response.data);
        } catch (error) {
            console.error('Error fetching approved workers:', error);
        }
    };

    const checkRole = async () => {
        try {
            const response = await axios.get('/api/profile');
            const profile = response.data;
           if (!profile || (profile.role !== "APPROVED" && profile.role !== "ADMIN")) {
                router.push(`/request`); 
            }
        } catch (error) {
            console.error('Error fetching current profile:', error);
        }
    };

    const clickable = () => {
        router.push(`/test2`);
    };

    return (
        <div className='w-full'>
            <div className='w-[80%] mx-auto my-4'>
                <div className='mb-5'>
                    {workers.map((worker, index) => (
                        <div key={index} className='px-5 py-4 rounded-lg shadow-md shadow-slate-200 flex gap-5 items-center justify-between'>
                            <div className='flex gap-5 justify-start items-center'>
                                <h1 className='font-mono text-[1.5rem] text-black'>{worker.name}</h1>
                                <Image src={worker.imageUrl} alt={`worker-${index}`} width={200} height={200} className='w-10 rounded-full' />
                                <div className='bg-green-400 text-white py-2 px-3 font-bold rounded-lg'>Approved</div>
                            </div>
                            <button onClick={clickable} className='py-2 px-3 rounded-md border-2 border-black'>
                                <p className='font-bold'>Add patient</p>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
