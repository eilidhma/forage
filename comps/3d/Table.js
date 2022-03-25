/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/table.gltf')

  useFrame(() => {
    const a = window.pageYOffset;
    const rx = a * 0.0015;
    group.current.rotation.x = rx;

    group.current.position.y = a * 0.008;

    const ry = a * 0.0008;
    group.current.rotation.y = ry;
  })

  return (
    <group ref={group} {...props} dispose={null} scale={1}>
      <mesh
        geometry={nodes.table.geometry}
        material={materials['Material.001']}
        position={[0, -1.75, 0]}
        rotation={[1.9, -0.2, 0]}
        scale={[1.75, 1, 1]}
      />
    </group>
  )
}

useGLTF.preload('/table.gltf')
