'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'
import * as THREE from 'three'
import ModelView from './ModelView'
import { models, sizes } from '@/constants'
import { cn } from '@/lib/utils'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { yellowImg } from '@/utils'
import { animateWithGsapTimeline } from '@/utils/animations'

gsap.registerPlugin(ScrollTrigger)

const Model = () => {
  const [size, setSize] = useState('small')
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg
  })

  // Refs for orbit controls and group objects
  const cameraControlSmall = useRef<OrbitControlsImpl | null>(null)
  const cameraControlLarge = useRef<OrbitControlsImpl | null>(null)
  const small = useRef(new THREE.Group())
  const large = useRef(new THREE.Group())

  // Rotation states
  const [smallRotation, setSmallRotation] = useState(0)
  const [largeRotation, setLargeRotation] = useState(0)

  // Viewport tracking refs
  const wrapperRef = useRef<HTMLElement>(null);   // div that wraps everything
  const smallTrack  = useRef<HTMLDivElement>(null)   // track for View #1
  const largeTrack  = useRef<HTMLDivElement>(null)   // track for View #2

  // GSAP animation

  const tl = gsap.timeline();
  useEffect(()=>{
    if(size==='large'){
      animateWithGsapTimeline(tl,small,smallRotation, '#view1', '#view2', {
        transform: 'translateX(-100%)',
        duration: 2
      })
    }
    else{
      animateWithGsapTimeline(tl,large,largeRotation, '#view2', '#view1', {
        transform: 'translateX(0)',
        duration: 2
      })
    }
  },[size])
  useGSAP(() => {
    gsap.to('#heading', {
      scrollTrigger: {
        trigger: '#heading'
      },
      y: 0,
      opacity: 1
    })
  })

  return (
    <section className='px-4 py-10'>
      <div className="screen-max-width mt-10">
        <h1 id="heading" className="section-heading text-gray-100 lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium">
          Take a closer look.
        </h1>
        <div className="flex flex-col items-center mt-5">
          {/* Scene wrapper and tracking divs */}
          <div ref={wrapperRef as React.Ref<HTMLDivElement>} className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>

            <div ref={smallTrack} className="absolute inset-0" />
            <div ref={largeTrack} className="absolute inset-0 right-[-100%]" />

            <ModelView
              index={1}
              groupRef={small}
              controlRef={cameraControlSmall}
              gsapType="view1"
              setRotationState={setSmallRotation}
              item={model}
              size={size}
              track={smallTrack  as React.RefObject<HTMLElement>}
            />
            <ModelView
              index={2}
              groupRef={large}
              controlRef={cameraControlLarge}
              gsapType="view2"
              setRotationState={setLargeRotation}
              item={model}
              size={size}
              track={largeTrack  as React.RefObject<HTMLElement>}
            />

            <Canvas
              className="w-full h-full pointer-events-none"
              style={{
                position: 'fixed',
                inset: 0,
                overflow: 'hidden'
              }}
              eventSource={wrapperRef as React.RefObject<HTMLElement>}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>
              <div className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <button
                    key={label}
                    onClick={() => setSize(value)}
                    className={cn(
                      'size-btn cursor-pointer px-4 py-2 rounded-full',
                      size === value ? 'bg-white text-black' : 'bg-transparent text-white'
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Model
