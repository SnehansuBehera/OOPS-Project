'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center justify-center h-full'>
        <div className='flex flex-wrap justify-center items-center w-[60%] gap-5 mt-10'>
          <div className='rounded-lg bg-transparent shadow-lg shadow-slate-700 flex flex-col items-center justify-center gap-4 px-8 py-4'>
            <Image src='/user.png' alt='user' width={200} height={200} className=' w-20' />
            <div className='flex flex-col items-center justify-center'>
              <p className='font-semibold text-gray-400 text-[20px]'>Step 1</p>
              <p className='font-normal text-gray-800 text-[15px]'>Login using your approved credentials</p>
            </div>
            <button className='p-2  text-black font-bold'>Read More</button>

          </div>
          <div className='rounded-lg bg-transparent shadow-lg shadow-slate-700 flex flex-col items-center justify-center gap-4 px-8 py-4'>
            <Image src='/running-nose.png' alt='running-nose' width={200} height={200} className=' w-20 ' />
            <div className='flex flex-col items-center justify-center'>
              <p className='font-semibold text-gray-400 text-[20px]'>Step 2</p>
              <p className='font-normal text-gray-800 text-[15px]'>Request for approval</p>
            </div>
            <button className='p-2 bg-slate-700 text-black font-bold'>Read More</button>

          </div>
          <div className='rounded-lg bg-transparent shadow-lg shadow-slate-700 flex flex-col items-center justify-center gap-4 px-8 py-4'>
            <Image src='/user.png' alt='user' width={200} height={200} className=' w-20' />
            <div className='flex flex-col items-center justify-center'>
              <p className='font-semibold text-gray-400 text-[20px]'>Step 3</p>
              <p className='font-normal text-gray-800 text-[15px]'>Add a patient with his/her medical info</p>
            </div>
            <button className='p-2 bg-slate-700 text-black font-bold'>Read More</button>

          </div>
          <div className='rounded-lg bg-transparent shadow-lg shadow-slate-700 flex flex-col items-center justify-center gap-4 px-8 py-4'>
            <Image src='/prescription.png' alt='prescription' width={200} height={200} className=' w-20' />
            <div className='flex flex-col items-center justify-center'>
              <p className='font-semibold text-gray-400 text-[20px]'>Step 4</p>
              <p className='font-normal text-gray-800 text-[15px] text-wrap w-6'>Add initial symptoms</p>
            </div>
            <button className='p-2 bg-slate-700 text-black font-bold'>Read More</button>

          </div>
          <div className='rounded-lg bg-transparent shadow-lg shadow-slate-700 flex flex-col items-center justify-center gap-4 px-8 py-4'>
            <Image src='/heart-disease.png' alt='heart-disease' width={200} height={200} className=' w-20' />
            <div className='flex flex-col items-center justify-center'>
              <p className='font-semibold text-gray-400 text-[20px]'>Step 5</p>
              <p className='font-normal text-gray-800 text-[15px]'>Check for additional symptoms</p>
            </div>
            <button className='p-2 bg-slate-700 text-black font-bold'>Read More</button>

          </div>
          <div className='rounded-lg bg-transparent shadow-lg shadow-slate-700 flex flex-col items-center justify-center gap-4 px-8 py-4'>
            <Image src='/heart-disease.png' alt='heart-disease' width={200} height={200} className=' w-20' />
            <div className='flex flex-col items-center justify-center'>
              <p className='font-semibold text-gray-400 text-[20px]'>Step 6</p>
              <p className='font-normal text-gray-800 text-[15px]'>Predicted Disease</p>
            </div>
            <button className='p-2 bg-slate-700 text-black font-bold'>Read More</button>

          </div>



        </div>
      </div>
    </div>
  )
}

export default page


