
import { useContext, createContext, useState, useEffect } from 'react'
import { themes } from './variables';

//the variables you want to provide to all the pages/components wrapped around this provider
const initialStates = {
    theme:"default",
    setTheme:()=>{},
    items_view:"default",
    setItemsView:()=>{},
    items_number:"default",
    setItemsNumber:()=>{},
    favRecipes:{},
    setFavRecipes:()=>{},
    recipes: null,
    setRecipes: ()=>{},
    currentUser: null,
    setCurrentUser: ()=>{}
}

const MyContext = createContext(initialStates);

export default function AppProvider({children}){
    //children all the pages/components insider this provider

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

    useEffect(()=>{
        setTheme(getCookie("mode"))        
        setItemsView(getCookie("view"))        
    },[])

    const [theme, setTheme] = useState(initialStates.theme)
    const [items_view, setItemsView] = useState(initialStates.items_view)
    const [items_number, setItemsNumber] = useState(initialStates.items_number)
    const [favRecipes, setFavRecipes] = useState(initialStates.favRecipes)
    const [recipes, setRecipes] = useState(initialStates.recipes)
    const [currentUser, setCurrentUser] = useState(initialStates.currentUser)

    //put in the variables you want to share
    return <MyContext.Provider value={{
        theme,
        setTheme,
        items_view,
        setItemsView,
        items_number,
        setItemsNumber,
        favRecipes,
        setFavRecipes,
        recipes,
        setRecipes,
        currentUser,
        setCurrentUser
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

export function useRecipes(){
    const {favRecipes, setFavRecipes} = useContext(MyContext);
    return {favRecipes, setFavRecipes}
}

export function useRecipesData(){
    const {recipes, setRecipes} = useContext(MyContext)
    return {recipes, setRecipes}
}

export function useCurrentUser() {
    const {currentUser, setCurrentUser} = useContext(MyContext)
    return {currentUser, setCurrentUser}
}
