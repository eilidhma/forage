import styled from 'styled-components'
import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useTheme } from '../utils/provider'
import { themes, comp_themes } from '../utils/variables'
import GroceryListUI from '../comps/GroceryListUI'
import Background from '../comps/Background'

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

export default function GroceryList() {
    const {theme, setTheme} = useTheme();

    return <>
        <Background/>
        
        <Spacer/>

        <Wrapper>
            <GroceryListUI />
        </Wrapper>
    </>

}