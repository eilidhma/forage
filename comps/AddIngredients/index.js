import styled from "styled-components";
import { motion } from "framer-motion";

import Title from "../Title";

import { themes, comp_themes, view_themes, } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { colors } from "../../utils/colors";

export default function AddIngredients({
    justify="flex-start",
    radius="5px",
    onClickScroll = () => {},
    showRecipes = () => {},
    onChangeSearch = () => {},
    onClickAdd = () => {},
    onClickDelete = () => {},
    searchVal,
    ings
})
{   
    const {theme, setTheme} = useTheme();

    const onDoneClick = () => {
        showRecipes()
        onClickScroll()
    }

    

    return <>
        <AddIngsCont>
            <Title title="Let's start by adding ingredients you currently have!" />

            <SearchBarCont>
                <SearchBar placeholder="Enter a minimum of 3 ingredients" value={searchVal} onChange={onChangeSearch}/>
                <Button radius="0 10px 10px 0"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClickAdd}
                >
                    Add
                </Button>
            </SearchBarCont>
                {ings && ings.map((o, i) => 
                    <Ingredient
                        textColor={themes[theme].text_hover}
                        bgColor={themes[theme].ingredient_hover}
                        color={themes[theme].text}
                        borderColor={comp_themes[theme].ingredient_border_color}
                        key={i}>
                        <IngCont>
                            {o}
                        </IngCont>
                        <DelCont justify="center"> 
                            <DeleteButton
                                whileHover={{ scale: 1.4}}
                                whileTap={{ scale: 0.9 }}
                                delColor={themes[theme].delete_color}
                                data-value={o}
                                onClick={onClickDelete}
                                
                            >
                                X
                            </DeleteButton>
                        </DelCont>
                    </Ingredient>
                )}

                <Button radius="10px"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={()=>onDoneClick()}
                >
                    Done
                </Button>
        </AddIngsCont>
    </>
}


const AddIngsCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40vw;
    min-height: 90vh;
    flex-direction: column;
    margin-top: 300px;
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
    position: relative;
    margin: 40px 0 20px 0;
    border-radius: 10px 0 0 10px;
    border: none;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.25);
    
    :focus {
        outline: none !important;
        border: 1px ${colors.orange} solid;
    }
`
const Button = styled(motion.button)`
    width: 135px;
    height: 40px;
    z-index: 9;
    margin: 40px 0 20px 0;
    background-color: ${colors.orange};
    border-radius: ${props=>props.radius};
    border: none;
    box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.25);
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
    margin: 10px 0 10px 0;
    font-family: "Poppins", sans-serif;
    font-size: 14px;
    color: ${props=>props.color};

    :hover{
        color: ${props=>props.textColor};
        background-color: ${props=>props.bgColor};
    };
`
const IngCont = styled.div`
    display: flex;
    width: 100%;
    margin-left: 5%;
    justify-content: center;
`
const DelCont = styled.div`
    display: flex;
    width: 2.5%;
    align-items: center;
    margin-right: 5px;
    justify-content: ${props=>props.justify};
    
`
const DeleteButton = styled(motion.button)`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    background: none;
    border: none;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    color: ${props=>props.delColor};
    
    :hover{
        cursor: pointer;
    };
`

