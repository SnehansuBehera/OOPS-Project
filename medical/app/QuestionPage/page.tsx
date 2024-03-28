"use client"

import React, { useState } from 'react';

const Page = () => {
    const [isYes, setIsYes] = useState(false);
    const [isNo, setIsNo] = useState(false);

    const [checked, setChecked] = useState(false);
    const itemChecked = () => {

        setChecked(true);
        console.log(checked);
    }


    const handleYesClick = () => {
        setIsYes(true);
        setIsNo(false); // Ensure only one option is selected
    };

    const handleNoClick = () => {
        setIsYes(false); // Ensure only one option is selected
        setIsNo(true);
    };

    return (
        <div className='px-4'>
            <h1 className='w-[20rem] px-6 text-[.7rem] md:text-[1rem] py-4 text-white rounded-lg  font-bold bg-black mb-3'>
                Q: Does the baby have diarrhoea
            </h1>
            <div className='flex gap-4'>
                <button className={`px-6 py-3 rounded-lg text-white font-bold ${isYes ? 'bg-emerald-400' : 'bg-emerald-500'}`} onClick={handleYesClick}>Yes</button>
                <button className={`px-6 py-3 rounded-lg text-white font-bold ${isNo ? 'bg-red-400' : 'bg-red-500'}`} onClick={handleNoClick}>
                    No
                </button>
            </div >

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

            {
                isYes && (
                    <div className='px-1 mt-4 flex flex-col gap-2'>
                        <div className='flex justify-between bg-gray-200 px-4 py-2 rounded-lg'>
                            <p>Count of breaths in one minute</p>
                            <div className={`rounded-2xl border-2 px-2 border-black bg-transparent ${checked ? 'bg-green-400' : 'bg-transparent'}`} onClick={itemChecked}></div>
                        </div>
                        <div className='flex justify-between bg-gray-200 px-4 py-2 rounded-lg'>
                            <p>Severe chest indrawing</p>
                            <div className={`rounded-2xl border-2 px-2 border-black bg-transparent ${checked ? 'bg-green-400' : 'bg-transparent'}`} onClick={itemChecked}></div>
                        </div>
                        <div className='flex justify-between bg-gray-200 px-4 py-2 rounded-lg'>
                            <p> Nasal Flaring</p>
                            <div className={`rounded-2xl border-2 px-2 border-black bg-transparent ${checked ? 'bg-green-400' : 'bg-transparent'}`} onClick={itemChecked}></div>
                        </div>
                        <div className='flex justify-between bg-gray-200 px-4 py-2 rounded-lg'>
                            <p> Grunting </p>
                            <div className={`rounded-2xl border-2 px-2 border-black bg-transparent ${checked ? 'bg-green-400' : 'bg-transparent'}`} onClick={itemChecked}></div>
                        </div>
                        <div className='flex justify-between bg-gray-200 px-4 py-2 rounded-lg'>
                            <p>Bulging Fontanelle</p>
                            <div className={`rounded-2xl border-2 px-2 border-black bg-transparent ${checked ? 'bg-green-400' : 'bg-transparent'}`} onClick={itemChecked}></div>
                        </div>
                        <div className='flex justify-between bg-gray-200 px-4 py-2 rounded-lg'>
                            <p>Pus Draining from ear</p>
                            <div className={`rounded-2xl border-2 px-2 border-black bg-transparent ${checked ? 'bg-green-400' : 'bg-transparent'}`} onClick={itemChecked}></div>
                        </div>
                        <div className='flex justify-between bg-gray-200 px-4 py-2 rounded-lg'>
                            <p>Umbilicus are RED or Pus Draining</p>
                            <div className={`rounded-2xl border-2 px-2 border-black bg-transparent ${checked ? 'bg-green-400' : 'bg-transparent'}`} onClick={itemChecked}></div>
                        </div>
                        <div className='flex justify-between bg-gray-200 px-4 py-2 rounded-lg'>
                            <p>Are there 10 or more skin pustucles or a big boil</p>
                            <div className={`rounded-2xl border-2 px-2 border-black bg-transparent ${checked ? 'bg-green-400' : 'bg-transparent'}`} onClick={itemChecked}></div>
                        </div>
                        <div className='flex justify-between bg-gray-200 px-4 py-2 rounded-lg'>
                            <p>High Temperature</p>
                            <div className={`rounded-2xl border-2 px-2 border-black bg-transparent ${checked ? 'bg-green-400' : 'bg-transparent'}`} onClick={itemChecked}></div>
                        </div>
                        <div className='flex justify-between bg-gray-200 px-4 py-2 rounded-lg'>
                            <p>Is the infant lathargic or unconscious</p>
                            <div className={`rounded-2xl border-2 px-2 border-black bg-transparent ${checked ? 'bg-green-400' : 'bg-transparent'}`} onClick={itemChecked}></div>
                        </div>
                        <div className='flex justify-between bg-gray-200 px-4 py-2 rounded-lg'>
                            <p>Are the palms or soles yellow ?</p>
                            <div className={`rounded-2xl border-2 px-2 border-black bg-transparent ${checked ? 'bg-green-400' : 'bg-transparent'}`} onClick={itemChecked}></div>
                        </div>
                        <div className='flex justify-between bg-gray-200 px-4 py-2 rounded-lg'>
                            <p>if the movement less than normal</p>
                            <div className={`rounded-2xl border-2 px-2 border-black bg-transparent ${checked ? 'bg-green-400' : 'bg-transparent'}`} onClick={itemChecked}></div>
                        </div>

                    </div>
                )
            }
        </div >
    );
};

export default Page;
