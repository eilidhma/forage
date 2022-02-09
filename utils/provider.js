import {useContext, createContext, useState} from 'react';
import { themes } from './variables';

//the variables you want to provide to all the pages/components wrapped around this provider
const initialStates = {
    theme:"default",
    setTheme:()=>{},
    items_view:"default",
    setItemsView:()=>{},
    items_number:"default",
    setItemsNumber:()=>{},
}

const MyContext = createContext(initialStates);

export default function AppProvider({children}){
    //children all the pages/components insider this provider

    const [theme, setTheme] = useState(initialStates.theme)
    const [items_view, setItemsView] = useState(initialStates.items_view)
    const [items_number, setItemsNumber] = useState(initialStates.items_number)

    //put in the variables you want to share
    return <MyContext.Provider value={{
        theme,
        setTheme,
        items_view,
        setItemsView,
        items_number,
        setItemsNumber
    }}>
        <style jsx global>
            {`
            body {
                margin:0;
            }
            button {
                width:200px;
                color:${themes[theme].body};
                border-radius:20px;
                margin:5px;
                font-size:16px;
                background-color:${themes[theme].text};
            }
            `}
        </style>
        {children}
    </MyContext.Provider>
}

export function useTheme(){
    const {theme, setTheme} = useContext(MyContext);
    return {theme, setTheme};
}

export function useItemsView(){
    const {items_view, setItemsView} = useContext(MyContext);
    return {items_view, setItemsView};
}

export function useItemsNumber(){
    const {items_number, setItemsNumber} = useContext(MyContext);
    return {items_number, setItemsNumber};
}


//use the Context to create Hooks like useTheme