import styled from "styled-components";
import { useEffect, useState } from "react";
import { themes } from "../utils/variables";
import { useTheme } from "../utils/provider";
import { colors } from "../utils/colors";
import LoginUI from "../comps/LoginUI"
import Background from "../comps/Background";
import Link from "next/link";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items:center;
  justify-content: center;
`

const Text = styled.h1`
  color:${props=>props.color};
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size:1.7rem;
  margin: 5px;
  text-align: center;
`

export default function Login() {

    const {theme, setTheme} = useTheme();
    
    const [currentUser, setCurrentUser] = useState(null);
    
    useEffect(() => {
        setCurrentUser(getCookie("user_id"))
    }, [currentUser])
    
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

    return <>
        <Background/>
        <Wrapper>
            {
                currentUser === null ?
                <LoginUI/>
                :
                <Text color={themes[theme].text}>
                    Hello, you're signed in.<br/>Click <Link href="/"><a style={{color: `${colors.orange}`}}>here</a></Link> to go home.
                </Text>
            }
        </Wrapper>
    </>
}