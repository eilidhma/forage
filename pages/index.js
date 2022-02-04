import styled from 'styled-components'
import Background from '../comps/Background'
import NavBar from '../comps/NavBar'
import LoginUI from '../comps/LoginUI'

import { useState } from 'react'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export default function Home() {

  const [isVisible, setIsVisible] = useState(true);

  return <>
      <NavBar 
        onLoginClick={()=>setIsVisible(true)}
      />

      <Background/>
    <Wrapper>
      <LoginUI 
        visibility={isVisible === true ? "visible" : "hidden"} 
        onCancelClick={()=>{setIsVisible(false)}}
      />
    </Wrapper>
    
  </>
}
