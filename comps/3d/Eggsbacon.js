import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/eggsbacon.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-1.23, -1.59, 1.66]} rotation={[-2.99, 0.8, -2.6]} scale={0.91}>
        <mesh geometry={nodes.Cylinder003.geometry} material={materials['glow white']} />
        <mesh geometry={nodes.Cylinder003_1.geometry} material={materials.yolk} />
      </group>
      <group position={[3.34, 2.29, -3.3]} rotation={[1.24, 0.09, -0.32]} scale={[1.16, 1.16, 4.79]}>
        <mesh geometry={nodes.Plane003.geometry} material={nodes.Plane003.material} />
        <mesh geometry={nodes.Plane003_1.geometry} material={nodes.Plane003_1.material} />
      </group>
      <group position={[1.17, 1.9, -3.73]} rotation={[1.22, 0.33, -0.25]} scale={[1.16, 1.16, 4.79]}>
        <mesh geometry={nodes.Plane001_1.geometry} material={nodes.Plane001_1.material} />
        <mesh geometry={nodes.Plane001_2.geometry} material={nodes.Plane001_2.material} />
      </group>
    </group>
  )
}

useGLTF.preload('/eggsbacon.gltf')
