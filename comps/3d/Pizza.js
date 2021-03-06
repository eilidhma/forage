import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/pizza.gltf')

  useFrame(() => {
    const a = window.pageYOffset;
    const rx = a * 0.0002;
    group.current.rotation.x = rx;

    group.current.position.y = a * -0.0014;

    const ry = a * -0.0001;
    group.current.rotation.y = ry;
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[0.2, 0.4, -0.6]} position={[-4.8, 0.2, 0]} scale={0.4}>
        <mesh geometry={nodes.pizza_1.geometry} material={materials['default']} />
        <mesh geometry={nodes.pizza_2.geometry} material={materials['Material.001']} />
        <mesh geometry={nodes.pizza_3.geometry} material={materials['Material.002']} />
        <mesh geometry={nodes.pizza_4.geometry} material={materials['Material.003']} />
        <mesh geometry={nodes.pizza_5.geometry} material={materials['Material.004']} />
        <mesh geometry={nodes.pizza_6.geometry} material={materials['Material.005']} />
      </group>
    </group>
  )
}

useGLTF.preload('/pizza.gltf')
