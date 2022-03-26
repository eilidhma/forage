import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, useEffect } from "react"
import { themes, comp_themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { colors } from "../../utils/colors";
import { useRouter } from "next/router";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80vw;
    max-width: 1000px;
    height: fit-content;
`

const HeadingCont = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: fit-content;
    justify-content: center;
    align-items: center;
    padding: 10px;

    /* background-color: green; */
`
const BackCont = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    color: ${props=>props.color};
    :hover {
    cursor: pointer;
    }
`
const Arrow = styled.div`
  width: 0; 
  height: 0;
  border-radius: 50px;
  margin-right: 5px;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent; 
  border-right: 7px solid #EF6345; 
`

const Heading = styled.h3`
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    color: ${({color})=>color};
`

const ListCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50vw;
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

const AddButton = styled(motion.button)`
    width: 135px;
    height: 40px;
    z-index: 9;
    margin: 40px 0 20px 0;
    background-color: ${colors.orange};
    border-radius: 0 10px 10px 0;
    border: none;
    box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.25);
    font-family: "Poppins", sans-serif;
    font-size: 14px;
    color: white;
    :hover {
        cursor: pointer;
    }
`
const Item = styled.div`
    display: flex;
    align-items: center;
    /* border: ${props=>props.borderColor} 2px solid; */
    border-radius: 10px;
    width: 80%;
    height: 50px;
    margin: 5px 0 5px 0;
    font-family: "Poppins", sans-serif;
    font-weight: 300;
    font-style: italic;
    font-size: 14px;
    color: ${props=>props.color};

    box-shadow: 0px 0px 7px #1B2B47;
`
const ItemCont = styled.div`
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
        color: ${colors.orange}
    };
`
const CheckboxInput = styled.input`
    width: 1.25em;
    height: 1.25em;
`


export default function GroceryListUI({
    justify="flex-start",
    onChange=()=>{},
    onAddClick=()=>{},
    onDeleteClick=()=>{},
    value,
    items
}) {

    const {theme, setTheme} = useTheme();
    const r = useRouter();
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        setCurrentUser(getCookie("user_id"));
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

    // const [items, setItems] = useState([]);
    // const [searchVal, setSearchVal] = useState("");


    // const AddItem = () => {
    //     if(searchVal != "" && !items.includes(searchVal))
    //     {
    //         setItems([...items, searchVal])
    //         setSearchVal("")
    //     }
    //     console.log("items", items)
    // }
          
    // const DeleteItem = (e) => {
    //   console.log(e.target.getAttribute('data-value'))
    //   const oldItems = items
    //   const index = items.indexOf(e.target.dataset.value)
    //   items.splice(index, 1)
    //   setItems([...oldItems])
    // }
  
  

    return <>
        <Wrapper>
            <HeadingCont>
            <BackCont
                color={themes[theme].back_color}     
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }} 
                onClick={()=>r.push(`/`)}
                >
                    <Arrow/>
                    Back
                </BackCont>

                <Heading color={comp_themes[theme].text_color}>
                   Grocery List
                </Heading>
            </HeadingCont>

            <ListCont>
                <SearchBarCont>
                    <SearchBar
                        value={value}
                        // onChange={(e)=>setSearchVal(e.target.value)}
                        onChange={onChange}
                    />
                    <AddButton 
                        onClick={onAddClick}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Add
                    </AddButton>
                </SearchBarCont>

            {/* {items && items.map((o,i) => 
                <Item 
                    color={themes[theme].text}
                    borderColor={comp_themes[theme].ingredient_border_color}
                    key={i}
                >
                    <ItemCont justify>
                        <CheckboxInput type="checkbox"/>
                        {o}
                    </ItemCont>
                    <ItemCont justify="flex-end">
                        <DeleteButton 
                            data-value={o}
                            onClick={onDeleteClick}
                            color={themes[theme].text}
                        >
                            X
                        </DeleteButton>
                    </ItemCont>
                </Item>
            )} */}
            </ListCont>
        </Wrapper>
    </>
}