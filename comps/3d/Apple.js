import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/apple.gltf')

  useFrame(() => {
    const a = window.pageYOffset;
    const rx = a * 0.002;
    group.current.rotation.x = rx;
    
    group.current.position.x = a * 0.0022;

    group.current.position.y = a * -0.0051;

    const ry = a * 0.0003;
    group.current.rotation.y = ry;
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[1.85, -0.2, 0]} position={[3.5, -5, 0]} scale={0.7}>
        <mesh geometry={nodes.apple_1.geometry} material={materials['Default OBJ']} />
        <mesh geometry={nodes.apple_2.geometry} material={materials['Material.001']} />
        <mesh geometry={nodes.apple_3.geometry} material={materials['Material.002']} />
      </group>
    </group>
  )
}

useGLTF.preload('/apple.gltf')