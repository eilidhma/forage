import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/plate.gltf')

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
      <group rotation={[-4.8, 2.7, 0]} position={[-4.8, -0.3, -0.7]} scale={0.6}>
        <mesh geometry={nodes.plate.geometry} material={materials['Material.001']} rotation={[0, 3, 0]} />
      </group>
    </group>
  )
}

useGLTF.preload('/plate.gltf')
