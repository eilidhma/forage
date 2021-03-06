import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/coffeecup.gltf')

  useFrame(() => {
    const a = window.pageYOffset;
    const rx = a * 0.003;
    group.current.rotation.x = rx;

    group.current.position.x = a * -0.001;

    group.current.position.y = a * 0.0008;

    const ry = a * 0.0007;
    group.current.rotation.y = ry;
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[0.25, 0, -0.2]} position={[-2.5, -0.5, -1.5]} scale={[0.4, 0.7, 0.4]}>
        <mesh geometry={nodes.Cube025.geometry} material={materials['glow white']} />
        <mesh geometry={nodes.Cube025_1.geometry} material={materials['tutup gelas']} />
        <mesh geometry={nodes.Cube025_2.geometry} material={materials.meat} />
      </group>
    </group>
  )
}

useGLTF.preload('/coffeecup.gltf')
