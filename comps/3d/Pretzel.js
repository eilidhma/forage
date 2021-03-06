import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/pretzel.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, 0]} rotation={[-0.54, 0.52, -0.03]} scale={[0.4, 0.1, 0.1]}>
        <mesh geometry={nodes.Cube052.geometry} material={nodes.Cube052.material} />
        <mesh geometry={nodes.Cube052_1.geometry} material={nodes.Cube052_1.material} />
        <mesh geometry={nodes.Cube052_2.geometry} material={nodes.Cube052_2.material} />
      </group>
      <group position={[1.52, 2.4, -0.64]} rotation={[-0.49, 1.1, -0.17]} scale={[0.4, 0.1, 0.1]}>
        <mesh geometry={nodes.Cube008.geometry} material={nodes.Cube008.material} />
        <mesh geometry={nodes.Cube008_1.geometry} material={nodes.Cube008_1.material} />
        <mesh geometry={nodes.Cube008_2.geometry} material={nodes.Cube008_2.material} />
      </group>
    </group>
  )
}

useGLTF.preload('/pretzel.gltf')
