import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <>
    <div className='flex flex-col items-center mx-56 gap-9 '
    >
  <h1 className='font-extrabold text-[40px] text-center mt-16'
  ><span className='text-[#f14e0e]'>Discover your adventure with ai:</span> Personalized itenaries at Your Fingertips</h1>
    
    <p className='text-xl text-gray-500 text-center mt-9'
    >Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget</p>

    <Link to={'/create-trip'}>
     <button className='items-center text-amber-900' onCli>Get Started, its free</button>    
    </Link>

    <img src="/landing.png" className='rounded-lg mt-1' alt="" />
    </div>
   
    </>
  )
}

export default Hero