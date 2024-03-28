"use client"
import React, { useEffect, useState } from 'react';
import Checkbox from '@/components/check-box';
import axios from 'axios';
import { z } from 'zod';
import { redirect, useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { currentMember } from '@/lib/current-member';

const CreateBacteria = () => {
    const [isYes, setIsYes] = useState(false);
    const [isNo, setIsNo] = useState(false);
    const [formValues, setFormValues] = useState({
        HasConvulsion: false,
        breathinoneminute: false,
        chestindrawing: false,
        nasalflaring: false,
        grunting: false,
        bulgingfontanelle: false,
        pusdraining: false,
        lookumbilicus: false,
        skinpustules: false,
        axillarytemperature: false,
        lethargic_unconscious: false,
        movementinfant: false,
        Arethepalmsandsolesyellow: false,
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
        HasConvulsion: z.boolean(),
        breathinoneminute: z.boolean(),
        chestindrawing: z.boolean(),
        nasalflaring: z.boolean(),
        grunting: z.boolean(),
        bulgingfontanelle: z.boolean(),
        pusdraining: z.boolean(),
        lookumbilicus: z.boolean(),
        skinpustules: z.boolean(),
        axillarytemperature: z.boolean(),
        lethargic_unconscious: z.boolean(),
        movementinfant: z.boolean(),
        Arethepalmsandsolesyellow: z.boolean(),
    });

    const handleSubmit = async () => {
        try {
            formSchema.parse(formValues);
            await axios.post('/api/bacteria', formValues);
            setFormValues({ // Reset form after submission
                HasConvulsion: false,
                breathinoneminute: false,
                chestindrawing: false,
                nasalflaring: false,
                grunting: false,
                bulgingfontanelle: false,
                pusdraining: false,
                lookumbilicus: false,
                skinpustules: false,
                axillarytemperature: false,
                lethargic_unconscious: false,
                movementinfant: false,
                Arethepalmsandsolesyellow: false,
            });
             redirect ("/bacteria/classify");
            
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

export default CreateBacteria;
