import styled from 'styled-components'
import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useTheme } from '../../utils/provider'
import { themes, comp_themes } from '../../utils/variables'
import GroceryListUI from '../../comps/GroceryListUI'
import Background from '../../comps/Background'
import Button from '../../comps/Button'
import { colors } from '../../utils/colors'
import axios from 'axios'

import { io } from "socket.io-client"
import FormButton from '../../comps/FormButton'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
`
const Spacer = styled.div`
    width: 100%;
    height: 20vh;
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

const ListCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50vw;
    min-height: 20vh;
    flex-direction: column;
    `
const UserIndicator = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50px;
    background-color: ${({dotColor}) => dotColor};
    border: 1px solid white;
    align-self: center;
    `
export default function GroceryList() {
    
    const r = useRouter();
    const { uuid } = r.query
    const {theme, setTheme} = useTheme();
    
    
    const [items, setItems] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    const [soc, setSoc] = useState();
    const [blocks, setBlocks] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const [text, setText] = useState("");
    const [users, setUsers] = useState({})


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

    useEffect(() => {
        setCurrentUser(getCookie("user_id"))

        const GetLists = async() => {
            const result = await axios.get('https://forage-backend-final.herokuapp.com/getgroceries')
        }

        GetLists();
        const socket = io("https://forage-sockets.herokuapp.com/")

        socket.on("change", (id, text) => {
            if(text != "" && !items.includes(text))
            {
                setItems((prev) => [
                    ...prev,
                    text
                ])
                setText("")
            }
        })

        socket.on("delete", (id, items) => {
            setItems([...items])
        })
        setSoc(socket)
    }, [])



    const AddItem = async() => {
        soc.emit("add_item", text);
    }
          
    const DeleteItem = async(e) => {
        const index = items.indexOf(e.target.dataset.value)
        items.splice(index, 1)

        soc.emit("delete_item", items);
    }

    const PostList = async() => {
        const result = axios.post('https://forage-backend-final.herokuapp.com/addlist', {
            uuid,
            user_id: currentUser,
            list: items
        })
    }
  
    return <>
        <div onMouseMove={(e) => DetectMouseMove(e.clientX, e.clientY)} style={{
            width: "100vw",
            height: "100vh"
        }}>

            <Background />
            <Spacer />

            <Wrapper>
                <GroceryListUI value={text} onChange={(e) => setText(e.target.value)} onAddClick={AddItem} />

                <ListCont>
                    {items && items.map((o, i) =>
                        <Item
                            color={themes[theme].text}
                            borderColor={comp_themes[theme].ingredient_border_color}
                            key={i}
                        >
                            <ItemCont justify>
                                <CheckboxInput type="checkbox" />
                                {o}
                            </ItemCont>
                            <ItemCont justify="flex-end">
                                <DeleteButton
                                    data-value={o}
                                    onClick={DeleteItem}
                                    color={themes[theme].text}
                                >
                                    X
                                </DeleteButton>
                            </ItemCont>
                        </Item>
                    )}
                </ListCont>
                <FormButton onClick={PostList} buttonText="Save Changes" />
                <div>{Object.keys(users)}</div>
            </Wrapper>

        </div>
    </>
}