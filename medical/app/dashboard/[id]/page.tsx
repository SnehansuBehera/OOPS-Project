'use client'

import Image from 'next/image'
import React from 'react'

const page = ({ params }: any) => {
    return (
        <div className='w-full h-full'>
            <div className=' my-5 w-[80%] mx-auto py-8 px-8 rounded-lg shadow-md shadow-slate-200'>
                <div className='py-4 px-3 border-b-2 border-slate-200'>
                    <p className=' font-mono'>Hello, {params.id}! Welcome to your Dashboard</p>
                </div>
                <div className='my-4 flex gap-10 items-center justify-start'>
                    <Image src='/insta.jpg' alt='patient' width={200} height={200} className='w-20 rounded-full' />
                    <h1 className='font-serif text-[3rem] text-gray-600'>{params.id}</h1>
                </div>

            </div>
            {/* <h1>{params.id}</h1> */}
        </div>
    )
}

export default page
