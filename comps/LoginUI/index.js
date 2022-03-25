import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { comp_themes, themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { colors } from "../../utils/colors";
import FormButton from "../FormButton";

const Cont = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 450px;
    height: 350px;

    border-radius: 30px;
    background-color:none;
    opacity:0.8;
    z-index: 10000;
`

const HeadingCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    margin-bottom: 5px;
`
const HeadingText = styled.h2`
    font-family: "Poppins", sans-serif;
    font-size: 36px;
    font-weight: 500;
    color: #EF6345;
`
const ParaText = styled.p`
    font-family: "Poppins", sans-serif;
    font-size: 18px;
    font-weight: 300;
    color: ${props=>props.paraColor};
    margin-bottom: 50px;
`

const InputCont = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    flex: 2;
`
const Input = styled.input`
    width: 100%;
    height: 40px;
    padding: 10px;
    margin: 0px 0 10px 0;
    border-radius: 10px;
    border: none;
    box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.25);
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    :focus {
        outline: none !important;
        border: 1px white solid;
    }
`

const ButtonCont = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 30px;
`

const SignUp = styled.p`
    padding: 0;
    margin-top: 30px;
    color: ${props=>props.textColor};
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 16px;
    text-decoration: underline;

    :hover {
        cursor: pointer;
    }
`

export default function LoginUI({
    onCancelClick=()=>{}
}) 

{
    const r = useRouter();
    const [isCreate, setIsCreate] = useState(false);
    const {theme, setTheme} = useTheme();
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    if(isCreate === false)
    {
        return <>
            <Cont>
                <HeadingCont>
                    <HeadingText>
                        Sign In
                    </HeadingText>
                </HeadingCont>

                <InputCont>
                    <Input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
                    <Input onChange={(e)=>setPw(e.target.value)} value={pw} type="password" placeholder="Password" />

                    <ButtonCont>
                        <FormButton textColor={"#EF6345"} color={"#EF6345"} buttonText="Cancel" onClick={onCancelClick}/>
                        <FormButton backgroundColor={"#EF6345"} textColor={"white"} color={"white"} onClick={async() => {
                            try {
                                const result = await axios.post('https://forage-backend-final.herokuapp.com/login', {
                                    email:email,
                                    password:pw
                                });
                                
                                if(result.status === 200){
                                    alert('Sign in Successful!')
                                    localStorage.setItem("user_id", result.data.user._id)
                                    document.cookie = `user_id=${result.data.user._id}`
                                    // setCurrentUser

                                    setTimeout(() => {
                                        r.reload()
                                    }, 500)
                                } 
                                console.log(result)
                            } catch (error) {
                                alert('Incorrect email or password, please try again')

                                console.log(error)
                            }
                        }} buttonText="Confirm"/>
                    </ButtonCont>
                </InputCont>

                <HeadingCont>
                    <SignUp textColor={themes[theme].sign_color} onClick={()=>setIsCreate(true)}>
                        Sign Up
                    </SignUp>
                </HeadingCont>
            </Cont>
        </>
    }

    if(isCreate === true)
    {
        return <>
            <Cont>
                <HeadingCont>
                    <HeadingText>
                        Sign Up
                    </HeadingText>
                </HeadingCont>
                <ParaText
                    paraColor={themes[theme].para_color}
                >
                    Enter your info below to get started!
                </ParaText>
                <InputCont>
                    <Input type="text" placeholder="Name" />
                    <Input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
                    <Input onChange={(e)=>setPw(e.target.value)} value={pw} type="password" placeholder="Password" />
                    {/* <Input onChange={(e)=>setPw(e.target.value)} type="text" placeholder="Confirm Password" /> */}

                    <ButtonCont>
                        <FormButton textColor={"#EF6345"} color={"#EF6345"} buttonText="Cancel" onClick={onCancelClick}/>
                        <FormButton backgroundColor={"#EF6345"} textColor={"white"} color={"white"} onClick={async() => {
                            const result = await axios.post('https://forage-backend-final.herokuapp.com/signup', {
                                email:email,
                                password:pw
                            });

                            console.log(result)
                        }} buttonText="Confirm"/>
                    </ButtonCont>
                </InputCont>

                <HeadingCont>
                    <SignUp textColor={themes[theme].sign_color} onClick={()=>setIsCreate(false)}>
                        Sign In
                    </SignUp>
                </HeadingCont>
            </Cont>
        </>
    }
}