import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/banana.gltf')

  useFrame(() => {
    const a = window.pageYOffset;
    const rx = a * 0.0002;
    group.current.rotation.x = rx;

    group.current.position.y = a * -0.002;

    const ry = a * -0.0001;
    group.current.rotation.y = ry;
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[4, 1.2, 0]} rotation={[-1.8, -3, -0.2]} scale={0.3}>
        <mesh geometry={nodes.banana_1.geometry} material={materials['Material.001']} />
        <mesh geometry={nodes.banana_2.geometry} material={materials['Material.002']} />
      </group>
    </group>
  )
}

useGLTF.preload('/banana.gltf')
