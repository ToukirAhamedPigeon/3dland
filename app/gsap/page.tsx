import AccrodionItemCustom from '@/components/AccrodionItemCustom'
import GsapFrom from '@/components/GsapFrom'
import GsapTo from '@/components/GsapTo'
import GsapFromTo from '@/components/GsapFromTo'
import {Accordion} from "@/components/ui/accordion"
import React from 'react'
import GsapTimeline from '@/components/GsapTimeline'
import GsapStagger from '@/components/GsapStagger'
import GsapScrollTrigger from '@/components/GsapScrollTrigger'
import GsapText from '@/components/GsapText'


const gsapPage = () => {
  return (
    <div className='flex flex-col justify-center px-10 py-10'>
        <Accordion type="single" collapsible>
            <AccrodionItemCustom title='GsapFrom' Component={GsapFrom} value='gsap-from' />
            <AccrodionItemCustom title='GsapTo' Component={GsapTo} value='gsap-to' />
            <AccrodionItemCustom title='GsapFromTo' Component={GsapFromTo} value='gsap-from-to' />
            <AccrodionItemCustom title='GsapTimeline' Component={GsapTimeline} value='gsap-timeline' />
            <AccrodionItemCustom title='GsapStagger' Component={GsapStagger} value='gsap-stagger' />
            <AccrodionItemCustom title='GsapScrollTrigger' Component={GsapScrollTrigger} value='gsap-scroll-trigger' contentClass='h-[2000px]' />
            <AccrodionItemCustom title='GsapText' Component={GsapText} value='gsap-text' />
        </Accordion>
    </div>
  )
}

export default gsapPage
