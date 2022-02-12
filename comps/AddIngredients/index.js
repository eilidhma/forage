import styled from "styled-components";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { themes, comp_themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { colors } from "../../utils/colors";
import { AiFillDelete } from 'react-icons/ai';

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
    border: ${props=>props.borderColor} 2px solid;
    border-radius: 10px;
    width: 100%;
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



export default function AddIngredients({
    justify="flex-start"
})
{   
    const {theme, setTheme} = useTheme();

    const [ings, setIngs] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    
    const PushIngredient = () => {
        if(searchVal != "" && !ings.includes(searchVal))
        {
            // let temp = ings
            // temp.push(searchVal)
            // setIngs(temp)
            // setSearchVal("")
            // console.log(ings)

            setIngs([...ings, searchVal])
        }
    }

    const SpliceIngredient = (e) => {
        console.log(e.target.getAttribute('data-value'))
        const oldIngs = ings
        const index = ings.indexOf(e.target.dataset.value)
        // console.log(e.target.dataset.value)
        ings.splice(index, 1)
        setIngs([...oldIngs])
        // console.log(e)
    }


    return <>
        <AddIngsCont>
            <SearchBarCont>
                <SearchBar value={searchVal} onChange={(e)=>{
                setSearchVal(e.target.value)
            }}/>
                <AddButton 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={()=>PushIngredient()}
                >
                    Add
                </AddButton>
            </SearchBarCont>
                {ings.map((o, i) => 
                    <Ingredient
                        color={themes[theme].text}
                        borderColor={comp_themes[theme].ingredient_border_color}
                        key={i}>
                        <IngCont justify>
                            {o}
                        </IngCont>
                        <IngCont justify="flex-end"> 
                            <button
                            data-value={o}
                            onClick={(e)=>SpliceIngredient(e)}
                            >
                                <AiFillDelete
                                />
                            </button>
                        </IngCont> 
                    </Ingredient>
                )}
        </AddIngsCont>
    </>
}