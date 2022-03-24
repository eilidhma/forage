import styled from 'styled-components'
import Background from '../comps/Background'
import NavBar from '../comps/NavBar'
import LoginUI from '../comps/LoginUI'
import Switch from '../comps/Switch'
import Slider from '../comps/Slider'
import { useState, useEffect } from 'react'
import Title from '../comps/Title'
import { themes } from "../utils/variables";
import { useTheme } from "../utils/provider";
import { useItemsView } from '../utils/provider';
import FormButton from '../comps/FormButton';
import axios from 'axios'

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
  const [currentUser, setCurrentUser] = useState();
  const [settings, setSettings] = useState({});


  const {theme, setTheme} = useTheme();
  const {items_view, setItemsView} = useItemsView();

  function getCookie(name) {
    var cookieArr = document.cookie.split(";");

    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

useEffect(() => {

  setCurrentUser(getCookie("user_id"))
  console.log(currentUser)

}, [currentUser])

  const HandleSave = async() => {
    try {
      console.log(currentUser)
      const result = await axios.get('https://forage-backend-final.herokuapp.com/getsettingsbyuser?user_id='+currentUser);
      if (result.data.settings.length === 0){
        await axios.post('https://forage-backend-final.herokuapp.com/addsetting', {
          user_id:currentUser,
          mode:theme,
          view:items_view
        })
        document.cookie = `mode=${theme}`
        document.cookie = `view=${items_view}`
        console.log('posted')
      } else {
        await axios.patch('https://forage-backend-final.herokuapp.com/updatesetting', {
          user_id:currentUser,
          mode:theme,
          view:items_view
        })
        document.cookie = `mode=${theme}`
        document.cookie = `view=${items_view}`
        console.log('patched')
      }

      setSettings(result.data)
    } catch (error) {
      console.log('error ah')
    }
  }


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
        <FormButton onClick={HandleSave} buttonText="Save"/>
      </SettingsCont>
    </Wrapper>
    
  </>
}
