import styled from 'styled-components'
import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useTheme } from '../utils/provider'
import { themes, comp_themes } from '../utils/variables'
import GroceryListUI from '../comps/GroceryListUI'
import Background from '../comps/Background'

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
            setBlocks((prev) => [
                ...prev,
                `${id} says ${text}.`
            ])
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

    const AlertPpl = async() => {
        soc.emit("alert_all", text);
    }

    const DetectMouseMove = async(x, y) => {
        console.log(x,y)
        soc.emit("mouse_moved", x, y)
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
            <GroceryListUI />

            
                <input type="text" onChange={(e) => setText(e.target.value)} />

                <button onClick={AlertPpl}>
                    Alert Everyone
                </button>

                <div>{Object.keys(users)}</div>

                {blocks.map((o, i) => <div style={{ background: 'red', padding: 10 }}>
                    {o}
                </div>)}
        </Wrapper>

        </div>
    </>

}