import { getDictionary } from '@/lib/getDictionary';
import Image from 'next/image'
import React from 'react'

const CtaCard = async ({locale }: { locale: string}) => {
  const dictionary = await getDictionary(locale);
  return (
    <div className='rounded-md bg-slate-100 py-10 px-6 relative overflow-hidden'>
        {/* Overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-white/95 via-white/70 to -white/3- z-10' />
        <Image src="https://images.unsplash.com/photo-1629973741067-0c1f4e2291cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
        fill alt="jog falls" className='object-center object-cover'/>
        <div className='relative z-20'>
            <div className='text-lg font-medium'>#explorewtheworld</div>
            <h3 className='text-4xl font-semibold mt-3'>{dictionary.ctaCard.title}</h3>
            <p className='mt-2 text-lg max-w-lg'>
            {dictionary.ctaCard.description}
            </p>
            <form className='mt-6 flex items-center gap-2 w-full'>
                <input placeholder={dictionary.ctaCard.placeholder} className='w-full md:w-auto bg-white text-base rounded-md py-2 px-4 outline-none focus:ring-2 ring-neutral-600'/>
                <button className='whitespace-nowrap bg-neutral-900 rounded-md px-3 py-2 text-neutral-200'>{dictionary.ctaCard.button}</button>
            </form>
        </div>
        
    </div>
  )
}

export default CtaCard