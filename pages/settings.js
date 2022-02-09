import styled from 'styled-components'
import Background from '../comps/Background'
import NavBar from '../comps/NavBar'
import LoginUI from '../comps/LoginUI'
import Switch from '../comps/Switch'
import Slider from '../comps/Slider'
import { useState } from 'react'
import Title from '../comps/Title'
import { themes } from "../utils/variables";
import { useTheme } from "../utils/provider";
import { useItemsView } from '../utils/provider';

const Wrapper = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const SettingsCont = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding-top:30px;
`

const Setting = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
`

const Left = styled.div`
  display:flex;
  width:300px;
  align-items:center;
  justify-content:flex-end;
  padding:5px 30px 5px 0px;
`

const Right = styled.div`
  display:flex;
  width:300px;
  justify-content:flex-start;
  align-items:center;
  padding:5px 0px 5px 30px;
`

const Text = styled.p`
  color:${props=>props.color};
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size:1rem;
`

export default function Settings() {

  const [isVisible, setIsVisible] = useState(true);
  const [isDarkToggled, setIsDarkToggled] = useState(false);
  const [isModeToggled, setIsModeToggled] = useState(false);

  const {theme, setTheme} = useTheme();
  const {items_view, setItemsView} = useItemsView();

  return <>
      <NavBar 
        onLoginClick={()=>setIsVisible(true)}
      />

      <Background/>
    <Wrapper>
      <Title title='Settings'/>
      <SettingsCont>
        <Setting>
          <Left>
          <Switch
            id="dark-mode-switch"
            //toggled={isDarkToggled}
            toggled={theme === 'dark' ? true : false}
            onChange={e => setIsDarkToggled(e.target.checked)}
            onClick={()=>{setTheme(theme === 'dark' ? 'default' : 'dark')}}
          />
          </Left>
          <Right>
            <Text color={themes[theme].text}>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</Text>
          </Right>
        </Setting>
        <Setting>
          <Left>
          <Switch
            id="grid-switch"
            toggled={items_view === 'list' ? true : false}
            onChange={e => setIsModeToggled(e.target.checked)}
            onClick={()=>{setItemsView(items_view === 'list' ? 'default' : 'list')}}
          />
          </Left>
          <Right>
            <Text color={themes[theme].text}>{items_view === 'default' ? 'List View' : 'Grid View'}</Text>
          </Right>
        </Setting>
        <Setting>
          <Left>
            <Slider />
          </Left>
          <Right>
            <Text color={themes[theme].text}>Number of recipe suggestions</Text>
          </Right>
        </Setting>
      </SettingsCont>
      {/* <Slider bgcolor='#1B2B47'/> */}

      {/* <Switch
      id="test-switch"
      toggled={isToggled}
      onChange={e => setIsToggled(e.target.checked)}
      /> */}

    </Wrapper>
    
  </>
}
