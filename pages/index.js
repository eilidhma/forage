import styled from 'styled-components'
import Background from '../comps/Background'
import NavBar from '../comps/NavBar'
import LoginUI from '../comps/LoginUI'
import Switch from '../comps/Switch'

import { useState } from 'react'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export default function Home() {

  const [isVisible, setIsVisible] = useState(true);
  const [isToggled, setIsToggled] = useState(false);

  return <>
      <NavBar 
        onLoginClick={()=>setIsVisible(true)}
      />

      <Background/>
    <Wrapper>
      {/* <Switch
      id="test-switch"
      toggled={isToggled}
      borderColor='#1B2B47'
      bgcolor='#1B2B47'
      onChange={e => setIsToggled(e.target.checked)}
      /> */}
      
      {/* <LoginUI 
        visibility={isVisible === true ? "visible" : "hidden"} 
        onCancelClick={()=>{setIsVisible(false)}}
      /> */}
    </Wrapper>
    
  </>
}
