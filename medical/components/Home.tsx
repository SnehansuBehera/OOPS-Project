import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import '../app/globals.css'
import QuestionPage from './QuestionPage'

const HomePage = () => {


    return (
        <div className='flex gap-2  flex-wrap md:px-6 md:justify-around my-[8vw]  md:my-[3vw]'>


            {/* left bar of the home page */}
            <div className='flex flex-col items-start gap-6 px-4 pt-2 pb-4 md:items-start md:w-[34rem] md:pr-4'>

                <h1 className=' font-serif text-[3rem] md:text-[5rem] md:leading-[4.6rem] font-semibold text-cyan-950 leading-[3rem] '>Stay healthy. Stay blessed.</h1>
                <p className='text-[.7rem] md:text-[1rem] md:leading-6 flex justify-start w-30 md:w-[30rem] text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi magni cumque fugiat maxime eligendi, laudantium voluptatum, enim, ipsum libero voluptate ipsam numquam?</p>
                <div className='flex items-center justify-start gap-4 md:gap-8'>
                    {/*<Link href={''}><button className=' text-[.7rem] md:text-[1rem] px-[.8rem] py-3 rounded-lg text-white font-bold bg-emerald-400 shadow-md shadow-gray-400'>Book appointment</button></Link>*/}
                    <Link href='/search2'><button className='text-[.7rem] md:text-[1rem] px-[.8rem] py-3 rounded-lg text-cyan-950 font-bold bg-transparent shadow-md shadow-gray-400'>Predictor</button></Link>

                </div>

            </div>



            {/*Right part of the home page*/}
            <div className='hidden sm:z-10 container-snap sm:flex sm:overflow-x-scroll sm:gap-6 sm:px-4 sm:py-20 sm:w-[30rem] whitespace-wrap snap-x snap-mandatory'>
                <div className='flex flex-col gap-5 w-[24rem] snap-center snap-always'>

                    <Image className='rounded-2xl' src='/bpl.jpg' alt='bpl' width={500} height={500} />
                    <p className=' text-[.8rem] md:text-[1rem] md:leading-6 flex justify-start w-30 md:w-[25rem] text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className='flex flex-col gap-5 w-[24rem] snap-center snap-always'>

                    <Image className='rounded-2xl' src='/bpl.jpg' alt='bpl' width={500} height={500} />
                    <p className=' text-[.8rem] md:text-[1rem] md:leading-6 flex justify-start w-30 md:w-[25rem] text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className='flex flex-col gap-5 w-[24rem] snap-center snap-always'>

                    <Image className='rounded-2xl' src='/bpl.jpg' alt='bpl' width={500} height={500} />
                    <p className=' text-[.8rem] md:text-[1rem] md:leading-6 flex justify-start w-30 md:w-[25rem] text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </div>
        </div>
    )
}

export default HomePage
