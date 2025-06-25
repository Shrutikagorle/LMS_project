import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
  return (
    <div className='pt-16'>
      <p className='text-base text-gray-500'> Trusted by learners from :</p>
      <div className='flex items-center justify-center gap-6 md:gap-18 md:mt-10 mt-5'>
        <img src={assets.microsoft_logo} alt="Microsoft" className='w-20 md:max-w-8/12' />
        <img src={assets.walmart_logo} alt="Walmart" className='w-20 md:max-w-8/12' />
        <img src={assets.accenture_logo} alt="Accenture" className='w-20 md:max-w-8/12' />
        <img src={assets.adobe_logo} alt="Adobe" className='w-20 md:max-w-8/12' />
        <img src={assets.paypal_logo} alt="Paypal" className='w-20 md:max-w-8/12' />
      </div>
    </div>
  )
}

export default Companies
