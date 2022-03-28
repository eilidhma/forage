import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/meat.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0.38, -0.99, 0]} rotation={[0.57, 0.16, 0.66]} scale={3.01}>
        <mesh geometry={nodes.Cube043.geometry} material={materials.chocolate} />
        <mesh geometry={nodes.Cube043_1.geometry} material={materials['glow white']} />
        <mesh geometry={nodes.Cube043_2.geometry} material={materials['tomato skin']} />
        <mesh geometry={nodes.Cube043_3.geometry} material={materials.daging} />
      </group>
    </group>
  )
}

useGLTF.preload('/meat.gltf')
