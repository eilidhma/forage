import styled from 'styled-components'
import Background from '../comps/Background'
import NavBar from '../comps/NavBar'
import LoginUI from '../comps/LoginUI'
import Switch from '../comps/Switch'
import Slider from '../comps/Slider'
import Card from '../comps/Card'
import Close from '../comps/Close'
import Heart from '../comps/Heart'
import { useState } from 'react'
import Button from '../comps/Button'
import Title from '../comps/Title'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const ImgCont = styled.div`
  position: absolute;
  overflow: hidden;
  top: 250px;
`

const Intro = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export default function Home() {

  const [isVisible, setIsVisible] = useState(true);
  const [isToggled, setIsToggled] = useState(false);
  const introText = `Hungry?\n We can help.`


  return <>
      <NavBar 
        onLoginClick={()=>setIsVisible(true)}
      />

      <Background/>
    <Wrapper>
      {/* ------------ PLACEHOLDER ------------ */}
      <ImgCont>
        <img width={1000} src='table.png'/>
      </ImgCont>
      {/* ------------ PLACEHOLDER ------------ */}

      <Intro>
        <Title title="Hungry?"/>
        <Title title="We can help."/>
        <Button text='Start'/>
      </Intro>
      {/* <Slider bgcolor='#1B2B47'/> */}

      {/* <Switch
      id="test-switch"
      toggled={isToggled}
      onChange={e => setIsToggled(e.target.checked)}
      /> */}

      {/* <LoginUI 
        visibility={isVisible === true ? "visible" : "hidden"} 
        onCancelClick={()=>{setIsVisible(false)}}
      /> */}

    {/* ------------ Eilidh's comps ------------ */}

      {/* <Card/> */}
      {/* <Heart/> */}
      {/* <Close/> */}
    </Wrapper>
    
  </>
}
