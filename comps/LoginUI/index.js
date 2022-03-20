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
    width: 350px;
    height: 450px;
    border: solid 1px white;
    border-radius: 30px;
    visibility: ${props=>props.visibility};
    background-color: #D2D2D2;
    position: absolute;
    right: 25px;
    top: 30px;
    z-index: 10000;
`

const HeadingCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`
const HeadingText = styled.h2`
    font-family: "Poppins", sans-serif;
    font-size: 36px;
    font-weight: 500;
    color: ${colors.orange};
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
    margin: 5px 0 5px 0;
    border-radius: 10px;
    border: none;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    :focus {
        outline: none !important;
        border: 1px ${colors.orange} solid;
    }
`

const ButtonCont = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`

const SignUp = styled.p`
    padding: 0;
    margin: 0;
    color: ${colors.orange};
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 16px;

    :hover {
        cursor: pointer;
    }
`

export default function LoginUI({
    visibility,
    onCancelClick=()=>{}
}) 

{
    const [isCreate, setIsCreate] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const {theme, setTheme} = useTheme();
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    const SignUp = async() => {
        const result = await axios.post('https://forage-backend-final.herokuapp.com/signup', {
            email:email,
            password:pw
        });

        //console.log(result)
    }

    const Login = async() => {
        const result = await axios.post('https://forage-backend-final.herokuapp.com/login', {
              email:email,
              password:pw
          });
          //console.log(result)
      }

    if(isCreate === false)
    {
        return <>
            <Cont visibility={visibility}>
                <HeadingCont>
                    <HeadingText>
                        Sign In
                    </HeadingText>
                </HeadingCont>

                <InputCont>
                    <Input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
                    <Input onChange={(e)=>setPw(e.target.value)} value={pw} type="text" placeholder="Password" />

                    <ButtonCont>
                        <FormButton buttonText="Cancel" onClick={onCancelClick}/>
                        <FormButton onClick={async() => {
                            try {
                                const result = await axios.post('https://forage-backend-final.herokuapp.com/login', {
                                    email:email,
                                    password:pw
                                });
                                
                                if(result.status === 200){
                                    alert('Sign in successful')
                                    localStorage.setItem("user_id", result.data.user._id)
                                    document.cookie = `user_id=${result.data.user._id}`
                                    // setCurrentUser
                                } 
                                console.log(result)
                            } catch (error) {
                                alert('Incorrect email or password, please try again')

                                console.log(error)
                            }
                        }} buttonText="Sign In"/>
                    </ButtonCont>
                </InputCont>

                <HeadingCont>
                    <SignUp onClick={()=>setIsCreate(true)}>
                        Sign Up
                    </SignUp>
                </HeadingCont>
            </Cont>
        </>
    }

    if(isCreate === true)
    {
        return <>
            <Cont visibility={visibility}>
                <HeadingCont>
                    <HeadingText>
                        Sign Up
                    </HeadingText>
                </HeadingCont>

                <InputCont>
                    <Input type="text" placeholder="Name" />
                    <Input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
                    <Input onChange={(e)=>setPw(e.target.value)} value={pw} type="text" placeholder="Password" />
                    {/* <Input onChange={(e)=>setPw(e.target.value)} type="text" placeholder="Confirm Password" /> */}

                    <ButtonCont>
                        <FormButton buttonText="Cancel" onClick={onCancelClick}/>
                        <FormButton onClick={async() => {
                            const result = await axios.post('https://forage-backend-final.herokuapp.com/signup', {
                                email:email,
                                password:pw
                            });

                            console.log(result)
                        }} buttonText="Sign Up"/>
                    </ButtonCont>
                </InputCont>

                <HeadingCont>
                    <SignUp onClick={()=>setIsCreate(false)}>
                        Sign In
                    </SignUp>
                </HeadingCont>
            </Cont>
        </>
    }
}