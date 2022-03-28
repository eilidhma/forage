import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/bowl.gltf')

  useFrame(() => {
    const a = window.pageYOffset;
    const rx = a * 0.0025;
    group.current.rotation.x = rx;

    group.current.position.x = a * 0.003;

    group.current.position.y = a * -0.0002;

    const ry = a * -0.0008;
    group.current.rotation.y = ry;
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.bowl.geometry} material={materials['Default OBJ']} 
      position={[-1.8, -2.2, -4.5]} 
      rotation={[1.95, -0.25, 0]} 
      scale={0.8}/>
    </group>
  )
}

useGLTF.preload('/bowl.gltf')
