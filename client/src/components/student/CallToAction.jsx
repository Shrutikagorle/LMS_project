import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className='text-xl md:text-4xl text-gray-800 font-semibold'>Learn anything, anytime, anywhere</h1>
      <p className='text-gray-500 sm:text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem voluptatibus nostrum minima nisi, ea delectus! Excepturi explicabo at  <br />exercitationem accusamus dolore, eveniet nisi quisquam, accusantium illo, consequuntur voluptatibus facilis unde.</p>
      <div className='flex items-center font-medium gap-6 mt-4'>
        <button  className='px-10 py-3 rounded-full text-white bg-blue-600 cursor-pointer shadow-[0px_4px_15px_0px] shadow-black/30'>Get Started</button>
        <button className='flex items-center gap-2  px-7 py-3 rounded-full bg-green-300 cursor-pointer shadow-[0px_4px_15px_0px] shadow-black/20'>Learn More <img src={assets.arrow_icon} alt="arrow_icon" /> </button>
      </div>
    </div>
  )
}

export default CallToAction
