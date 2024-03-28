"use client"
import React, { useEffect, useState } from 'react';
import Checkbox from '@/components/check-box';
import axios from 'axios';
import { z } from 'zod';
import { redirect, useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { currentMember } from '@/lib/current-member';
import Link from 'next/link';

const CreateBacteria = () => {
    const [isYes, setIsYes] = useState(false);
    const [isNo, setIsNo] = useState(false);
    const [formValues, setFormValues] = useState({
        Convulsion: false,
        FastBreathing: false,
        SevereChestIndrawing: false,
        NasalFlaring: false,
        TenOrMorePustules: false,
        LethargicOrUnconcious: false,
        LessThanNormalMovements: false,
        UmbilicusRedOrDraining: false,
        PusDischargeFromEar: false,
        PalmsAndSolesYellow: false,
        AgeLessThan24HrsOrMore: false,
        Age14DaysOrMore: false,
        PalmsAndSolesNotYellow: false,
        TemperatureBetween35and36Degree: false,
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
        Convulsion: z.boolean(),
        FastBreathing: z.boolean(),
        SevereChestIndrawing: z.boolean(),
        NasalFlaring: z.boolean(),
        TenOrMorePustules: z.boolean(),
        LethargicOrUnconcious: z.boolean(),
        LessThanNormalMovements: z.boolean(),
        UmbilicusRedOrDraining: z.boolean(),
        PusDischargeFromEar: z.boolean(),
        PalmsAndSolesYellow: z.boolean(),
        AgeLessThan24HrsOrMore: z.boolean(),
        Age14DaysOrMore: z.boolean(),
        PalmsAndSolesNotYellow: z.boolean(),
        TemperatureBetween35and36Degree: z.boolean(),
    });

    const handleSubmit = async () => {
        try {
            formSchema.parse(formValues);
            await axios.post('/api/bacteria', formValues);
            setFormValues({ // Reset form after submission
                Convulsion: false,
                FastBreathing: false,
                SevereChestIndrawing: false,
                NasalFlaring: false,
                TenOrMorePustules: false,
                LethargicOrUnconcious: false,
                LessThanNormalMovements: false,
                UmbilicusRedOrDraining: false,
                PusDischargeFromEar: false,
                PalmsAndSolesYellow: false,
                AgeLessThan24HrsOrMore: false,
                Age14DaysOrMore: false,
                PalmsAndSolesNotYellow: false,
                TemperatureBetween35and36Degree: false,
            });

        } catch (error) {
            console.error('Form validation failed:', error);
        }
    };

    return (
        <div className='px-4'>
            <h1 className='w-[20rem] px-6 text-[.7rem] md:text-[1rem] py-4 text-white rounded-lg  font-bold bg-black mb-3'>
                Q: Does the baby have jaundice
            </h1>
            <div className='flex gap-4'>
                <button className={`px-6 py-3 rounded-lg text-white font-bold ${isYes ? 'bg-emerald-400' : 'bg-emerald-500'}`} onClick={handleYesClick}>Yes</button>
                <button className={`px-6 py-3 rounded-lg text-white font-bold ${isNo ? 'bg-red-400' : 'bg-red-500'}`} onClick={handleNoClick}>No</button>
            </div>

            

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
                    <Link className='bg-green-500 py-2 rounded-md font-bold text-slate-100 text-center' href='/bacteria/results'><button onClick={handleSubmit}>Submit</button></Link>
                </div>
            )}
        </div>
    );
};

export default CreateBacteria;
