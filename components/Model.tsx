'use client'
import React from 'react'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger);

const Model = () => {
  useGSAP(() => {
    gsap.to('#heading', {
      scrollTrigger:{
        trigger:'#heading'
      }, 
      y: 0,
      opacity: 1
    });
  });

  return (
    <section>
      <div className="screen-max-width mt-30">
        <h1 id="heading" className="section-heading text-gray-100 lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium">
          Take a closer look.
        </h1>
        <div className="flex flex-col items-center mt-5">
          {/* Add content here */}
        </div>
      </div>
    </section>
  )
}

export default Model
