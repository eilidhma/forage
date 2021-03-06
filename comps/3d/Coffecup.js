import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/coffeecup.gltf')

  useFrame(() => {
    const a = window.pageYOffset;
    const rx = a * -0.001;
    group.current.rotation.x = rx;

    group.current.position.y = a * -0.0001;

    const ry = a * 0.001;
    group.current.rotation.y = ry;
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[3, 0, 0]} position={[-3.2, -0.5, -0.5]} scale={0.5}>
        <mesh geometry={nodes.coffeecup_1.geometry} material={materials['Default OBJ']} />
        <mesh geometry={nodes.coffeecup_2.geometry} material={materials['Material.001']} />
        <mesh geometry={nodes.coffeecup_3.geometry} material={materials['Material.003']} />
        <mesh geometry={nodes.coffeecup_4.geometry} material={materials['Material.004']} />
      </group>
    </group>
  )
}

useGLTF.preload('/coffeecup.gltf')
