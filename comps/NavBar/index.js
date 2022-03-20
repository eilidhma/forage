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
`
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
`

const LinksCont = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    width: 50%;
    padding: 15px;
`

const NavLink = styled.a`
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 18px;
    color: ${props=>props.color};
    margin: 50px;
    :hover {
        cursor: pointer;
    }
`

const SiteHeader = styled.img`
    :hover {
        cursor: pointer;
    }
`

export default function NavBar({
    onLoginClick=()=>{}
})
{
    const r = useRouter();
    const {theme, setTheme} = useTheme();
    const [navbar, setNavbar] = useState(false);

    useEffect(() => {
        
        const changeNavBarOpacity = () => {
            if(window.scrollY >= 100){
                setNavbar(true)
            } else {
                setNavbar(false)
            }
        }
        window.addEventListener("scroll", changeNavBarOpacity)
    }, [])



    return <>
        <Cont bgcolor={navbar ? comp_themes[theme].nav_bg_color : 'transparent'}>
            <LogoCont>
                <SiteHeader src="/Forage.png" width={150} onClick={()=>r.push(`/`)}/>
            </LogoCont>

            <LinksCont>
                <NavLink
                    color={comp_themes[theme].text_color}
                    onClick={()=>{r.push('/favourites')}}>Favourites</NavLink>
                <NavLink 
                    color={comp_themes[theme].text_color}
                    onClick={()=>{r.push('/settings')}}>Settings</NavLink>
                <NavLink 
                    color={colors.orange}
                    onClick={onLoginClick}>Login</NavLink>
            </LinksCont>
        </Cont>
    </>
}
