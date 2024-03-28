"use client"
import React, { useEffect, useState } from 'react';
import Checkbox from '@/components/check-box';
import axios from 'axios';
import { z } from 'zod';
import { redirect, useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { currentMember } from '@/lib/current-member';

const CreateDiarrhoea = () => {
    const [isYes, setIsYes] = useState(false);
    const [isNo, setIsNo] = useState(false);
    const [formValues, setFormValues] = useState({
        LethargicorUnconsious: false,
        RestlessIrritable: false,
        sunkenEyes: false,
        pinchSkinAbdomen: false,
    });
  
    

    const handleYesClick = () => {
        setIsYes(true);
        setIsNo(false); // Ensure only one option is selected
    };

    const handleNoClick = () => {
        setIsYes(false); // Ensure only one option is selected
        setIsNo(true);
    };

    const handleCheckboxChange = (name: string, value: boolean) => {
        setFormValues({ ...formValues, [name]: value }); // Set value when checkbox is clicked
    };

    const formSchema = z.object({
        LethargicorUnconsious: z.boolean(),
        RestlessIrritable: z.boolean(),
        sunkenEyes: z.boolean(),
        pinchSkinAbdomen: z.boolean(),
    });

    const handleSubmit = async () => {
        try {
            formSchema.parse(formValues);
            await axios.post('/api/diarrhoea', formValues);
            setFormValues({ // Reset form after submission
                LethargicorUnconsious: false,
                RestlessIrritable: false,
                sunkenEyes: false,
                pinchSkinAbdomen: false,
            });
             redirect ("/diarrhoea/classify");
            
        } catch (error) {
            console.error('Form validation failed:', error);
        }
    };

    return (
        <div className='px-4'>
            <h1 className='w-[20rem] px-6 text-[.7rem] md:text-[1rem] py-4 text-white rounded-lg  font-bold bg-black mb-3'>
                Q: Does the baby have diarrhoea
            </h1>
            <div className='flex gap-4'>
                <button className={`px-6 py-3 rounded-lg text-white font-bold ${isYes ? 'bg-emerald-400' : 'bg-emerald-500'}`} onClick={handleYesClick}>Yes</button>
                <button className={`px-6 py-3 rounded-lg text-white font-bold ${isNo ? 'bg-red-400' : 'bg-red-500'}`} onClick={handleNoClick}>No</button>
            </div>

            {isNo && (
                <div className='px-1 mt-4'>
                    <h1 className='w-[20rem] px-6 text-[.7rem] md:text-[1rem] py-4 pt-3 text-black rounded-lg  font-bold bg-transparent shadow-sm shadow-gray-400 mb-3'>
                        Q: If stool is liquid
                    </h1>
                    <div className='flex gap-4'>
                        <button className='px-6 py-3 rounded-lg text-white font-bold bg-emerald-400'>Yes</button>
                        <button className='px-6 py-3 rounded-lg text-white font-bold bg-red-400'>No</button>
                    </div>
                </div>
            )}

            {isYes && (
                <div className='px-1 mt-4 flex flex-col gap-2'>
                    {Object.entries(formValues).map(([key, value]) => (
                        <div key={key} className='flex justify-between bg-gray-200 px-4 py-2 rounded-lg'>
                            <p>{key}</p>
                            <Checkbox
                                label={key}
                                checked={value}
                                onChange={(newValue) => handleCheckboxChange(key, newValue)}
                            />
                        </div>
                    ))}
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            )}
        </div>
    );
};

export default CreateDiarrhoea;
