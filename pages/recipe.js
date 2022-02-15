import styled from 'styled-components'
import Router, { useRouter } from 'next/router'
import { useState } from 'react'

import Background from '../comps/Background'
import Recipe from '../comps/Recipe'


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
`
const Spacer = styled.div`
    width: 100%;
    height: 20vh;
`

export default function Home() {

  const r = useRouter();
  const [isToggled, setIsToggled] = useState(false);
  const introText = `Hungry?\n We can help.`


  return <>      
    <Background/>
      <Wrapper>
          <Spacer/>
        <Recipe/>

    </Wrapper>
    
  </>
}

