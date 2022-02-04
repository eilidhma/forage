import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Background from '../comps/Background'
import NavBar from '../comps/NavBar'

export default function Home() {
  return (
    <div>
      <NavBar/>
      <Background/>
      
    </div>
    
  )
}
