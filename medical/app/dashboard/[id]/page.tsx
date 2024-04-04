'use client'

import Image from 'next/image'
import React, { useState } from 'react'

const page = ({ params }: any) => {

    const [show, setShow] = useState(false);

    const showPatientHistory = () => {
        setShow(true);
    }

    return (
        <div className='w-full h-full'>
            <div className=' my-5 w-[80%] mx-auto py-8 px-8 rounded-lg shadow-md shadow-slate-200'>
                <div className='py-4 px-3 border-b-2 border-slate-200'>
                    <p className=' font-mono'>Hello, {params.id}! Welcome to your Dashboard</p>
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
                        <Image src='/insta.jpg' alt='patient' width={200} height={200} className=' w-40 rounded-md' />
                        <div className='flex flex-col items-center justify-center gap-8 my-2'>
                            <div className=' leading-[1.5rem] text-center'>
                                <h1 className='font-serif text-[2rem] text-gray-600'>{params.id}</h1>
                                <p className='font-bold text-[14px] text-gray-400'>20 years</p>
                            </div>

                            <div className='flex border-2 border-slate-200 rounded-3xl py-2 w-[200px] flex-wrap gap-1 items-center justify-center'>

                                <p className='font-bold text-[14px] text-[#6964F1]'>Weight: 56 kg</p>
                                <p className='font-bold text-[14px] text-[#A956DF]'>Height: 156 cm</p>
                                <p className='font-bold text-[14px] text-gray-400'>Gender: Male</p>
                                <p className='font-bold text-[14px] text-gray-400'>Blood Group: A+</p>
                            </div>

                        </div>

                    </div>

                </div>
                <div className='flex items-center justify-start gap-8 py-1 px-4'>
                    <p className='font-bold text-black'>See Patient's Medical Records</p>
                    <button onClick={showPatientHistory}><Image src='/next.png' alt='next' width={20} height={20} className='w-15' /></button>
                </div>
                {
                    show && (
                        <div>hello</div>
                    )
                }
            </div>

        </div>
    )
}

export default page
