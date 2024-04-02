'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div className='w-full h-full'>
      <div className='flex flex-col items-center justify-center gap-[10rem] h-full mx-auto'>
        <h1 className='font-bold text-[3rem] text-black'>How To Proceed</h1>
        <div className='flex flex-row flex-wrap items-center justify-center gap-5 mx-auto w-[50px]'>
          <div className='rounded-lg bg-transparent shadow-lg shadow-slate-800 flex flex-col items-center justify-center gap-4'>
            <Image src='/user.png' alt='user' width={200} height={200} className=' w-20 mt-4' />
            <div className='flex flex-col items-center justify-center'>
              <p className='font-semibold text-gray-400 text-[20px]'>Step 1</p>
              <p className='font-normal text-gray-800 text-[15px]'>Login using your approved credentials</p>
            </div>
            <button className='p-2 bg-slate-700 text-black font-bold mb-5'>Read More</button>

          </div>
          <div className='rounded-lg bg-transparent shadow-lg shadow-slate-800 flex flex-col items-center justify-center gap-4 px-10'>
            <Image src='/user.png' alt='user' width={200} height={200} className=' w-20 mt-4 ' />
            <div className='flex flex-col items-center justify-center'>
              <p className='font-semibold text-gray-400 text-[20px]'>Step 2</p>
              <p className='font-normal text-gray-800 text-[15px]'>Add Symptoms for Disease prediction</p>
            </div>
            <button className='p-2 bg-slate-700 text-black font-bold mb-5'>Read More</button>

          </div>
          <div className='rounded-lg bg-transparent shadow-lg shadow-slate-800 flex flex-col items-center justify-center gap-4 px-10'>
            <Image src='/user.png' alt='user' width={200} height={200} className=' w-20 mt-4 ' />
            <div className='flex flex-col items-center justify-center'>
              <p className='font-semibold text-gray-400 text-[20px]'>Step 3</p>
              <p className='font-normal text-gray-800 text-[15px]'>Login using your approved credentials</p>
            </div>
            <button className='p-2 bg-slate-700 text-black font-bold mb-5'>Read More</button>

          </div>
          <div className='rounded-lg bg-transparent shadow-lg shadow-slate-800 flex flex-col items-center justify-center gap-4 px-10'>
            <Image src='/user.png' alt='user' width={200} height={200} className=' w-20 mt-4 ' />
            <div className='flex flex-col items-center justify-center'>
              <p className='font-semibold text-gray-400 text-[20px]'>Step 4</p>
              <p className='font-normal text-gray-800 text-[15px] text-wrap w-6'>Check the boxes under the displayed disease to refine the output</p>
            </div>
            <button className='p-2 bg-slate-700 text-black font-bold mb-5'>Read More</button>

          </div>
          <div className='rounded-lg bg-transparent shadow-lg shadow-slate-800 flex flex-col items-center justify-center gap-4 px-10'>
            <Image src='/user.png' alt='user' width={200} height={200} className=' w-20 mt-4 ' />
            <div className='flex flex-col items-center justify-center'>
              <p className='font-semibold text-gray-400 text-[20px]'>Step 5</p>
              <p className='font-normal text-gray-800 text-[15px]'>Final Output</p>
            </div>
            <button className='p-2 bg-slate-700 text-black font-bold mb-5'>Read More</button>

          </div>



        </div>
      </div>
    </div>
  )
}

export default page


