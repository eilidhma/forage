import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/pizzaslice.gltf')

  useFrame(() => {
    const a = window.pageYOffset;
    const rx = a * 0.0003;
    group.current.rotation.x = rx;

    group.current.position.y = a * -0.002;

    const ry = a * -0.0001;
    group.current.rotation.y = ry;
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-0.25, 2.8, 0.6]} position={[-4.9, -0.2, -0.7]} scale={[0.55, 0.08, 0.57]}>
        <mesh geometry={nodes.Cube036.geometry} material={materials['bun.001']} />
        <mesh geometry={nodes.Cube036_1.geometry} material={materials.cheese} />
        <mesh geometry={nodes.Cube036_2.geometry} material={materials['tomato skin']} />
        <mesh geometry={nodes.Cube036_3.geometry} material={nodes.Cube036_3.material} />
        <mesh geometry={nodes.Cube036_4.geometry} material={nodes.Cube036_4.material} />
      </group>
    </group>
  )
}

useGLTF.preload('/pizzaslice.gltf')
