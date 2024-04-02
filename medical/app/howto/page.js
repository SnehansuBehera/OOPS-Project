'use client'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div className='flex justify-content-center'>
      <div>
      <h1><b>How to Use</b></h1>

      <ul>
        <item>Step 1: Login using your approved credentials</item><br/>
        <item>Step 2: Go to our Tools Section</item><br/>
        <item>Step 3: Select the Predictor</item><br/>
        <item>Step 4: Add your initial Symptoms</item><br/>
        <item>Step 5: Check the diseases given by our Predictor</item><br/>
        <item>Step 6: Check the boxes under the displayed disease to refine the output</item><br/>
        <item>After Step 6 you will get your final output</item><br/>
      </ul>
      <Link href=''>Tools</Link><Link href='/'>Home</Link><Link href=''>Sign In</Link>

      </div>
        
        
    </div>
  )
}

export default page