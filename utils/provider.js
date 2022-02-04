import {useContext, createContext, useState} from 'react';
import { themes } from './variables';

//the variables you want to provide to all the pages/components wrapped around this provider
const initialStates = {
    theme:"default",
    setTheme:()=>{},
    items_view:"list",
    setItemsView:()=>{},
    sortBy:"bookID",
    setSortBy:()=>{},
    searchBy:"title",
    setSearchBy:()=>{}
}

const MyContext = createContext(initialStates);

export default function AppProvider({children}){
    //children all the pages/components insider this provider

    const [theme, setTheme] = useState(initialStates.theme)
    const [items_view, setItemsView] = useState(initialStates.items_view)
    const [sortBy, setSortBy] = useState(initialStates.sortBy)
    const [searchBy, setSearchBy] = useState(initialStates.searchBy)

    //put in the variables you want to share
    return <MyContext.Provider value={{
        theme,
        setTheme,
        items_view,
        setItemsView,
        sortBy,
        setSortBy,
        searchBy,
        setSearchBy
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

export function useSorting(){
    const {sortBy, setSortBy} = useContext(MyContext);
    return {sortBy, setSortBy};
}

export function useSearching(){
    const {searchBy, setSearchBy} = useContext(MyContext);
    return {searchBy, setSearchBy};
}

//use the Context to create Hooks like useTheme