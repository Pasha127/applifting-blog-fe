import React, { Suspense, useMemo, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from "three";
import { DDSLoader } from "three-stdlib";
import "./shibaCanvas.css"
import shibaModel from "../../lib/assets/Shiba2.glb";
import { useGLTF } from '@react-three/drei';


const pi = Math.PI;

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());



//gltf asset
function GLTFAsset(props) {
    const {nodes, materials} = useGLTF(shibaModel)
    console.log("node:",materials)
    const ref= useRef()
    useFrame(({ mouse, viewport }) => {
        const x = (mouse.x * viewport.width) / 2.5
        const y = (mouse.y * viewport.height) / 2.5
        ref.current.lookAt(x, y, 1)
      })

      
  return (
    <Suspense fallback={null}>
        <group
        ref={ref}
      {...props}
      dispose={null}
    >
      <mesh
        geometry={nodes.Shiba.children[0].geometry}
        material={materials.fur}
      />
      <mesh
        geometry={nodes.Shiba.children[1].geometry}
        material={materials.fur}
      />
    </group>
    </Suspense>
  )
}
useGLTF.preload(shibaModel)


function ShibaCanvas(props) {

  return (
    <div className="canvas-container">
      <Canvas>
        <ambientLight intensity={1}/>
        <Suspense >
        <GLTFAsset scale={[1, 1, 1]} position={[4,1,-2]}/>
        <GLTFAsset scale={[1, 1, 1]} position={[-4,2,-3]}/>
        <GLTFAsset scale={[1, 1, 1]} position={[-6,-2,-5]}/>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ShibaCanvas;