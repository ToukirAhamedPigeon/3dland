import AccrodionItemCustom from '@/components/AccrodionItemCustom'
import GsapFrom from '@/components/GsapFrom'
import GsapTo from '@/components/GsapTo'
import GsapFromTo from '@/components/GsapFromTo'
import {Accordion} from "@/components/ui/accordion"
import React from 'react'


const gsapPage = () => {
  return (
    <div className='flex flex-col justify-center px-10 py-10'>
        <Accordion type="single" collapsible>
            <AccrodionItemCustom title='GsapFrom' Component={GsapFrom} value='gsap-from' />
            <AccrodionItemCustom title='GsapTo' Component={GsapTo} value='gsap-to' />
            <AccrodionItemCustom title='GsapFromTo' Component={GsapFromTo} value='gsap-from-to' />
        </Accordion>
    </div>
  )
}

export default gsapPage
