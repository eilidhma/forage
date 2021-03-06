import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/carrot.gltf')

  useFrame(({clock}) => {
    const a = clock.getElapsedTime();
    group.current.rotation.y = a * 0.75;

    group.current.position.x = a * -0.001;

    group.current.position.y = a * -0.0001;
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, 0]} rotation={[2.59, -1, 3.02]} scale={0.25}>
        <mesh geometry={nodes.Cube041.geometry} material={materials.pickle} />
        <mesh geometry={nodes.Cube041_1.geometry} material={materials.carrot} />
      </group>
    </group>
  )
}

useGLTF.preload('/carrot.gltf')
