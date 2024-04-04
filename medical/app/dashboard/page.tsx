'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    const route = useRouter();
    const goToPatientDahboard = () => {
        route.push('/dashboard/Snehansu');
    }

    return (
        <div className='w-full'>
            <div className='w-[80%] mx-auto px-5 py-4 rounded-lg shadow-md shadow-slate-200 flex gap-5 items-center justify-between my-5'>
                <div className='flex gap-5 justify-start items-center'>
                    <h1 className='font-mono text-[1.5rem] text-black'>Snehansu Behera</h1>
                    <Image src='/insta.jpg' alt='patient' width={200} height={200} className='w-10 rounded-full' />
                </div>
                <button onClick={goToPatientDahboard} className='p-2 rounded-full bg-transparent border-2 border-black'><Image src='/next.png' alt='arrow' width={50} height={50} className=' w-6' /></button>

            </div>

        </div>
    )
}

export default page
