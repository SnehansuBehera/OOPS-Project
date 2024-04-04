'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
const page = () => {
    const route = useRouter()
    const clickable = () => {

        route.push('/test2')
    }
    return (
        <div className='w-full'>
            <div className='w-[80%] mx-auto my-4'>

                <div className='mb-5'>
                    <div className='px-5 py-4 rounded-lg shadow-md shadow-slate-200 flex gap-5 items-center justify-between'>
                        <div className='flex gap-5 justify-start items-center'>
                            <h1 className='font-mono text-[1.5rem] text-black'>Snehansu Behera</h1>
                            <Image src='/insta.jpg' alt='patient' width={200} height={200} className='w-10 rounded-full' />
                            <div className='bg-green-400 text-white py-2 px-3 font-bold rounded-lg'>Approved</div>
                        </div>
                        <button onClick={clickable} className='py-2 px-3 rounded-md border-2 border-black'>
                            <p className='font-bold'>Add patient</p>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default page
