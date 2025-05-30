'use client'
import {OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import React, {
  Dispatch,
  SetStateAction,
  MutableRefObject,
  Suspense,
  useMemo
} from 'react'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import * as THREE from 'three'
import Lights from './Lights'
import { Model as IPhone } from './IPhone'
import Loader from './Loader'

export interface ModelItem {
  title: string
  color: string[]
  img: string
}

type ModelViewProps = {
  index: number
  groupRef: MutableRefObject<THREE.Group>
  gsapType: string
  controlRef: MutableRefObject<OrbitControlsImpl | null>
  setRotationState: Dispatch<SetStateAction<number>>
  item: ModelItem
  size: string
  track: React.RefObject<HTMLElement> 
}

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
  track
}: ModelViewProps) => {
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), [])
  console.log();
  return (
    <View
      index={index}
      id={gsapType}
      track={track} // ✅ required to enable interaction
      className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}
    >
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={target}
        onEnd={() => {
          if (controlRef.current) {
            setRotationState(controlRef.current.getAzimuthalAngle())
          }
        }}
      />
      <group ref={groupRef} name={index === 1 ? 'small' : 'large'}>
        <Suspense fallback={<Loader/>}>
          <IPhone scale={index === 1 ? [15, 15, 15] : [17, 17, 17]} item={item} />
        </Suspense>
      </group>
    </View>
  )
}

export default ModelView
