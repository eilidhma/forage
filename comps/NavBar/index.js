import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { comp_themes, themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { colors } from "../../utils/colors";
import { v4 as uuidv4 } from "uuid";

export default function NavBar()
{
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

            <LinksCont>
            {
                currentUser === null ? 
                <></>
                :
                <NavLink
                    color={comp_themes[theme].text_color}
                    onClick={() => {r.push(`/grocery_list/${uuidv4()}`)}}>
                    Grocery List
                </NavLink>
            }
                <NavLink
                    color={comp_themes[theme].text_color}
                    onClick={()=>{r.push('/favourites')}}>
                        Favourites
                        </NavLink>
                <NavLink 
                    color={comp_themes[theme].text_color}
                    onClick={()=>{r.push('/settings')}}>
                        Settings
                </NavLink>
                {
                    currentUser === null ? 
                <NavLink 
                        color={colors.orange}
                        onClick={()=>{r.push('/login')}}>
                            Sign In
                </NavLink> 
                    : 
                <NavLink 
                     color={colors.orange}
                     onClick={()=>signOut("user_id")}>
                        Sign Out
                </NavLink> 
                }
            </LinksCont>
        </Cont>
    </>
}

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

    @media (max-width: 800px) {
        display: none;
    }

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
    margin: 30px;
    :hover {
        cursor: pointer;
    }
    white-space: nowrap;
`

const SiteHeader = styled.img`
    :hover {
        cursor: pointer;
    }
`