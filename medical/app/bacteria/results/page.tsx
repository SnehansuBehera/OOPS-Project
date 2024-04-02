import React from 'react'

const page = () => {
    return (
        <div className='w-[50%] mx-auto'>
            <div className='w-full p-4 bg-red-600 text-white text-[1.2rem] text-center font-bold mt-4 rounded-md shadow-md shadow-slate-800'>
                <h1>Possible Serious Bacterial Infection</h1>
            </div>
            <div className='m-4 p-3 border-2 border-slate-600 rounded-md'>
                <h3 className='bg-green-500 rounded-md text-center p-3 font-bold text-white text-[1.2rem] mb-5'>Treatments</h3>
                <ul className='flex flex-col gap-2'>
                    <li className='font-bold text-black rounded-md bg-slate-400 p-4'>⛑️ Give First dose of intramuscular Ampicillin and Gentamycin</li>
                    <li className='font-bold text-black rounded-md bg-slate-400 p-4'>⛑️ Treat to prevent low blood sugar</li>
                    <li className='font-bold text-black rounded-md bg-slate-400 p-4'>⛑️ Warm the young infant by Skin to Skin contact if temparature less than 36.5 degree (or feels cold to touch) while arranging referral</li>
                    <li className='font-bold text-black rounded-md bg-slate-400 p-4'>⛑️ Advise mother how to keep the young infant warm on the way to the hospital</li>
                    <li className='font-bold text-black rounded-md bg-slate-400 p-4'>⛑️ Refer URGENTLY to the hospital</li>
                </ul>

            </div>
        </div>
    )
}

export default page