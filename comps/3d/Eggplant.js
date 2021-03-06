import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/eggplant.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-1.49, -1.05, 0]} rotation={[0, 0, 0.64]} scale={0.25}>
        <mesh geometry={nodes.Cylinder001.geometry} material={materials['eggplant green']} />
        <mesh geometry={nodes.Cylinder001_1.geometry} material={materials.eggplant} />
      </group>
    </group>
  )
}

useGLTF.preload('/eggplant.gltf')
