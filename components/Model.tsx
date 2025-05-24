'use client'
import React, { use, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import gsap from 'gsap'
import ModelView from './ModelView'
import { yellowImg } from '@/utils'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger);

const Model = () => {
  const [size, setSize] = useState('small');
  const [model, setModel] = useState({
    title:'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81','#FFE7B9','#6F6C64'],
    img: yellowImg
  });
  //camera control for the model view
  const cameraControlSmall = useRef<HTMLElement | null>(null);
  const cameraControlLarge = useRef<HTMLElement | null>(null);

  //model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  //rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);
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
          <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
            <ModelView 
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelView 
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Model
