import styled from "styled-components";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Title from "../Title";

import { themes, comp_themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { colors } from "../../utils/colors";
import { AiFillDelete } from 'react-icons/ai';

const AddIngsCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40vw;
    min-height: 20vh;
    flex-direction: column;
`
const SearchBarCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
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
const Button = styled(motion.button)`
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
    border: ${props=>props.borderColor} 2px solid;
    border-radius: 10px;
    width: 80%;
    height: 30px;
    margin: 5px 0 5px 0;
    font-family: "Poppins", sans-serif;
    font-size: 14px;
    color: ${props=>props.color};
`
const IngCont = styled.div`
    display: flex;
    flex: 1;
    padding: 10px;
    justify-content: ${props=>props.justify};
`
const DeleteButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5%;
    height: 100%;
    background: none;
    border: none;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    color: ${props=>props.color};
    
    :hover{
        cursor: pointer;
    };
`


export default function AddIngredients({
    justify="flex-start",
    showRecipes = () => {},
    onChangeSearch = () => {},
    onClickAdd = () => {},
    onClickDelete = () => {},
    searchVal,
    ings
})
{   
    const {theme, setTheme} = useTheme();


    return <>
        <AddIngsCont>
            <Title title="Let's start by adding in ingredients you have available right now!" />

            <SearchBarCont>
                <SearchBar value={searchVal} onChange={onChangeSearch}/>
                <Button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClickAdd}
                >
                    Add
                </Button>
            </SearchBarCont>
                {ings && ings.map((o, i) => 
                    <Ingredient
                        color={themes[theme].text}
                        borderColor={comp_themes[theme].ingredient_border_color}
                        key={i}>
                        <IngCont justify>
                            {o}
                        </IngCont>
                        <IngCont justify="flex-end"> 
                            <DeleteButton
                                data-value={o}
                                onClick={onClickDelete}
                                color={themes[theme].text}
                            >
                                X
                            </DeleteButton>
                        </IngCont> 
                    </Ingredient>
                )}

                <Button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={showRecipes}
                >
                    Done
                </Button>
        </AddIngsCont>
    </>
}