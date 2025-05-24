'use client'
import React, {
    Dispatch,
    SetStateAction,
    MutableRefObject,
    FC,
  } from 'react';
  import * as THREE from 'three'


export interface ModelItem {
  title: string;
  color: string[];
  img: string;
}

type ModelViewProps={
  index:                number;
  groupRef:             MutableRefObject<THREE.Group>;
  gsapType:             string;
  controlRef:           MutableRefObject<HTMLElement | null>;
  setRotationState:     Dispatch<SetStateAction<number>>;
  item:                 ModelItem;
  size:                 string;
}
const ModelView = ({index,groupRef,gsapType,controlRef,setRotationState,item,size}:ModelViewProps) => {
  return (
    <div>
      
    </div>
  )
}

export default ModelView
