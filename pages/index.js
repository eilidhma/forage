import styled from 'styled-components'
import Router, { useRouter } from 'next/router'
import { useState } from 'react'

import Background from '../comps/Background'
import Card from '../comps/Card'
import Close from '../comps/Close'
import Heart from '../comps/Heart'
import Button from '../comps/Button'
import Title from '../comps/Title'
import AddIngredients from '../comps/AddIngredients'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
`

const ImgCont = styled.div`
  overflow: hidden;
`

const IntroCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Spacer = styled.div`
  display: flex;
  width: 100%;
  height: 10vh;
`

const SearchCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: 60vh;
`

export default function Home() {

  const r = useRouter();
  const [isToggled, setIsToggled] = useState(false);
  const introText = `Hungry?\n We can help.`


  return <>      
    <Background/>
      <Wrapper>

      <IntroCont>
        <Spacer/>
        <Spacer/>
        <Title title="Hungry?"/>
        <Title title="We can help."/>
        <Button text='Start' onClick={()=>r.push("#search")}/>
        <ImgCont>
          <img width={1000} src='table.png'/>
        </ImgCont>
      </IntroCont>

      <SearchCont id="search">
        <Title title="Let's start by adding in ingredients you have available right now!" />
        <AddIngredients/>
      </SearchCont>
    </Wrapper>
    
  </>
}
