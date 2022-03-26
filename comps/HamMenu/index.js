import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { comp_themes, themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { colors } from "../../utils/colors";

const Cont = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    justify-content: space-between;
    height: 80px;
    width: 100vw;
    background-color: ${props=>props.bgcolor};
    transition: 0.5s;
    z-index: 1000;

    @media (min-width: 800px) {
        display: none;
    }
`;
const LogoCont = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    min-width: fit-content;
    padding: 15px;
    margin-left: 50px;
    font-size: 24px;
    font-weight: 700;
`;
const HamCont = styled.div`
    justify-content:center;
    height: 80px;
    width: 6rem;
    cursor: pointer;
    z-index: 1000;
    text-align: center;
    margin-right: 50px;
`;
const NavBackground = styled.div`
    position: fixed;
    background-color: #EF6345,
    height: 100%;
    width: 100%;
`;
const Navigation = styled.nav`
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 600;
    width: ${(props) => (props.clicked ? "100%" : "0")};
    opacity: ${(props) => (props.clicked ? "1" : "0")};
    transition: width 0.8s, opacity 0.8s;
    background-color: white;
`;
const List = styled.div`
    position: absolute;
    list-style: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: none;
`;

const ItemLink = styled.div`
    display: inline-block;
    font-size: 24px;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    text-decoration: none;
    color: #EF6345;
    padding: 1rem 2rem;
    background-color: none;
`;

const Ham = styled.span`
    position: relative;
    background-color: ${(props) => (props.clicked ? "transparent" : "#EF6345")};
    border-radius: 50px;
    width: 35px;
    height: 3px;
    display: inline-block;
    margin-top:35%;
    padding:1px;
    transition: all 0.3s;
    &::before,
    &::after {
        content: "";
        background-color: #EF6345;
        border-radius: 50px;
        width: 35px;
        height: 3px;
        display: inline-block;
        position: absolute;
        left: 0;
        transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
  ${HamCont}:hover &::before {
    top: ${(props) => (props.clicked ? "0" : "-1rem")};
  }
  ${HamCont}:hover &::after {
    top: ${(props) => (props.clicked ? "0" : "1rem")};
  }
`;

const SiteHeader = styled.img`
    :hover {
        cursor: pointer;
    }
`

export default function HamMenu()
{
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const r = useRouter();
    const {theme, setTheme} = useTheme();
    const [navbar, setNavbar] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {

        setCurrentUser(getCookie("user_id"))
        
        const changeNavBarOpacity = () => {
            if(window.scrollY >= 100){
                setNavbar(true)
            } else {
                setNavbar(false)
            }
        }
        window.addEventListener("scroll", changeNavBarOpacity)
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

    function signOut(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        r.reload()
    }


    return <>
        <Cont bgcolor={navbar ? comp_themes[theme].nav_bg_color : 'transparent'}>
            <LogoCont>
                <SiteHeader src="/Forage.png" width={150} onClick={()=>r.push(`/`)}/>
            </LogoCont>
            <HamCont htmlFor="navi-toggle" onClick={handleClick}>
                <Ham clicked={click}>&nbsp;</Ham>
            </HamCont>
            </Cont>

            <NavBackground clicked={click}>&nbsp;
            <Navigation clicked={click}>
            <List>
                <li>
                <ItemLink onClick={()=>{r.push('/grocery_list')}}>
                    Grocery List
                </ItemLink>
                </li>
                <li>
                <ItemLink onClick={()=>{r.push('/favourites')}}>
                    Favourites
                </ItemLink>
                </li>
                <li>
                <ItemLink onClick={()=>{r.push('/settings')}}>
                    Settings
                </ItemLink>
                </li>
                <li>
                <ItemLink onClick={()=>{r.push('/login')}}>
                    Sign In
                </ItemLink>
                </li>
            </List>
            </Navigation>
            </NavBackground>
      
    </>
}