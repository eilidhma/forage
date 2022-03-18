import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const SearchBar = styled.input`
    width: 100%;
    height: 40px;
    padding: 10px;
    margin: 5px 0 5px 0;
    border-radius: 10px;
    border: none;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.25);
    :focus {
        outline: none !important;
        border: 1px black solid;
    }
`

const Test = () => {

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");


    return(
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100vw', height:'100vh'}}>

            <SearchBar onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <SearchBar onChange={(e)=>setPw(e.target.value)} value={pw}/>
            <button style={{color:'white'}} onClick={
                async() => {
                const result = await axios.post('https://forage-backend-final.herokuapp.com/signup', {
                    email:email,
                    password:pw
                });

                console.log(result)
            }}>
                Sign Up
            </button>
            <button style={{color:'white'}} onClick={
                async() => {
                    const result = await axios.post('https://forage-backend-final.herokuapp.com/login', {
                          email:email,
                          password:pw
                      });
                      console.log(result)
                  } 
            }>Login</button>
        </div>

    )
}

export default Test