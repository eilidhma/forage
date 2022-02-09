import styled from "styled-components";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { themes, comp_themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { colors } from "../../utils/colors";

const AddIngsCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30vw;
    flex-direction: column;
`
const SearchBarCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`
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
        border: 1px ${colors.orange} solid;
    }
`
const AddButton = styled(motion.button)`
    width: 135px;
    height: 40px;
    background-color: ${colors.orange};
    border-radius: 10px;
    border: none;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

    font-family: "Poppins", sans-serif;
    font-size: 14px;
    color: white;

    :hover {
        cursor: pointer;
    }
`
const Ingredient = styled.div`
    display: flex;
    align-items: center;
    padding-left: 10px;
    border: ${colors.orange} 2px solid;
    border-radius: 10px;
    width: 100%;
    height: 30px;

    font-family: "Poppins", sans-serif;
    font-size: 14px;
    color: black;
`


export default function AddIngredients()
{
    const Ings = []

    useEffect(() => {
        
    }, [])
    
    const PushIngredient = () => {
        Ings.push(document.getElementById("SearchInput").value)
        console.log(Ings)
    }


    return <>
        <AddIngsCont>
            <SearchBarCont>
                <SearchBar id="SearchInput"/>
                <AddButton 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={()=>PushIngredient()}
                >
                    Add
                </AddButton>
            </SearchBarCont>
                {Ings.map((o, i) => 
                    <Ingredient key={i}>
                        {o}
                    </Ingredient>
                )}
        </AddIngsCont>
    </>
}