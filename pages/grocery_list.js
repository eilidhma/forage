import styled from 'styled-components'
import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useTheme } from '../utils/provider'
import { themes, comp_themes } from '../utils/variables'
import GroceryListUI from '../comps/GroceryListUI'
import Background from '../comps/Background'
import Button from '../comps/Button'
import { colors } from '../utils/colors'

import { io } from "socket.io-client"

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

export default function GroceryList() {

    const {theme, setTheme} = useTheme();

    const [soc, setSoc] = useState();
    const [blocks, setBlocks] = useState([]);

    const [text, setText] = useState("");

    const [otherMouse, setOtherMouse] = useState({
        left: 0,
        top: 0
    })

    const [users, setUsers] = useState({})

    useEffect(() => {
        const socket = io("http://localhost:8888")

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

        socket.on("change_mouse", (x, y, id) => {
            setUsers((prev) => ({
                ...prev,
                [id]: {
                    left: x,
                    top: y
                }
            }))
        })
        setSoc(socket)
    }, [])

    // const AlertPpl = async() => {
    //     soc.emit("alert_all", text);
    // }

    const DetectMouseMove = async(x, y) => {
        // console.log(x,y)
        // soc.emit("mouse_moved", x, y)
    }


    const [items, setItems] = useState([]);
    const [searchVal, setSearchVal] = useState("");


    const AddItem = async() => {
        // if(text != "" && !items.includes(text))
        // {
        //     setItems([...items, text])
        //     setText("")
        // }
        soc.emit("add_item", text);
        console.log("items", items)
    }
          
    const DeleteItem = async(e) => {
        console.log(e.target.getAttribute('data-value'))
        // const oldItems = items
        const index = items.indexOf(e.target.dataset.value)
        items.splice(index, 1)
        // setItems([...oldItems])

        soc.emit("delete_item", items);
        console.log("items", items)
    }
  
  


    const colors = ["green", "blue", "red", "yellow", "teal"]

    return <> 
        <div onMouseMove={(e) => DetectMouseMove(e.clientX, e.clientY)} style={{
            width: "100vw",
            height: "100vh"
        }}>
        {/* {Object.values(users).map((o, i) => <div style={{
            background: colors[i % 5],
            position: 'fixed',
            left: o.left,
            top: o.top,
            width: 10,
            height: 10
        }}>

      </div>)} */}

        <Background/>
        <Spacer/>

        <Wrapper>
            <GroceryListUI value={text} onChange={(e) => setText(e.target.value)} onAddClick={AddItem} />


            <ListCont>
            {items && items.map((o,i) => 
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
                            onClick={DeleteItem}
                            color={themes[theme].text}
                        >
                            X
                        </DeleteButton>
                    </ItemCont>
                </Item>
            )}
            </ListCont>
            
                {/* <input type="text" onChange={(e) => setText(e.target.value)} /> */}

                {/* <Button onClick={AlertPpl} text="Alert?" /> */}
                <div>{Object.keys(users)}</div>

                {/* {blocks.map((o, i) => <div style={{ background: 'red', padding: 10 }}>
                    {o}
                </div>)} */}
        </Wrapper>

        </div>
    </>

}