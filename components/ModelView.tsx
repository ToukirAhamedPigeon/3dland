'use client'
import { Html, OrbitControls, PerspectiveCamera, View } from '@react-three/drei';
import React, {
  Dispatch,
  SetStateAction,
  MutableRefObject,
  FC,
  Suspense,
  useMemo,
} from 'react';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import * as THREE from 'three'
import Lights from './Lights';
import {Model as IPhone} from './IPhone'


export interface ModelItem {
  title: string;
  color: string[];
  img: string;
}

type ModelViewProps={
  index:                number;
  groupRef:             MutableRefObject<THREE.Group>;
  gsapType:             string;
  controlRef:           MutableRefObject<OrbitControlsImpl | null>;
  setRotationState:     Dispatch<SetStateAction<number>>;
  item:                 ModelItem;
  size:                 string;
}
const ModelView = ({index,groupRef,gsapType,controlRef,setRotationState,item,size}:ModelViewProps) => {
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  return (
    <View
      index={index}
      id={gsapType}
      className={`border-2 border-red-500 w-full h-full ${index===2 ? 'right-[-100%]':'' }`}
    >
      {/* Ambient Light*/}
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0,0,4]}/>
      <Lights/>
      <OrbitControls 
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={target}
        onEnd={() => setRotationState(controlRef.current!.getAzimuthalAngle())}
      />
      <group ref={groupRef} name={`${index === 1 ? 'small':'large'}`}>
        <Suspense fallback={<Html><div>Loading</div></Html>}>
          <IPhone 
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
          />
        </Suspense>
      </group>
    </View>
  )
}

export default ModelView
