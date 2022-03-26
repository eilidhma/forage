import styled from 'styled-components'
import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd'
import Background from '../comps/Background'
import Recipe from '../comps/Recipe'
import Card from '../comps/Card'
import DragCard from '../comps/DragCard'
import Dropzone from '../comps/Dropzone'
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useRecipes } from '../utils/provider'
import CalendarMeal from '../comps/CalendarMeal'
import axios from 'axios'
import { useRecipesData } from '../utils/provider'
import SmallCard from '../comps/SmallCard'
import { comp_themes, themes, view_themes } from "../utils/variables";
import { useTheme } from "../utils/provider";
import { useItemsView } from "../utils/provider";
import FormButton from '../comps/FormButton'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  width: 100vw;
  height: 100%;
`

const Favs = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100vw;
`

const Spacer = styled.div`
    width: 100%;
    height: 10vh;
`

const DropCont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background:${({bg})=> bg || 'none'};
  width: 100%;
  height: 30vh;
`

const Title = styled.h2`
    display: flex;
    width: 100vw;
    text-align: left;
    color: ${props=>props.color};
    padding: 20px;
`

const ButCont = styled.div`
    padding: 20px;
`

const CalendarCont = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: center;
    width: 100vw;
    height: 100%;
`

const FavsCont = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 80vw;
    flex-wrap: wrap;
`

const MenuCont = styled.div`
    display: flex;
    width: 100vw;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`


export default function Favourites({}){



    const {theme, setTheme} = useTheme();
    const {items_view, setItemsView} = useItemsView();

    //const [storage, setStorage] = useState()

    const [rs, setRs] = useState({})
    const [favs, setFavs] = useState(null);
    const [currentUser, setCurrentUser] = useState();

    const [curRecipe, setCurRecipe] = useState({})

    const [sun, setSun] = useState({})

    const [mon, setMon] = useState({})
    const [tues, setTues] = useState({})
    const [wed, setWed] = useState({})
    const [thurs, setThurs] = useState({})
    const [fri, setFri] = useState({})
    const [sat, setSat] = useState({})

    const {favRecipes, setFavRecipes} = useRecipes();
    const {recipes, setRecipes} = useRecipesData();

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

    const toTitleCase = (phrase) => {
        return phrase
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    useEffect(() => {

        setCurrentUser(getCookie("user_id"))
        
        const getFavs = async() => {
            try {
                const result = await axios.get('https://forage-backend-final.herokuapp.com/getfavsbyuser?user_id='+currentUser);
                setFavs(result.data.favs)
            } catch (error) {
                console.log("loading")
            }
        }
        getFavs()

    }, [currentUser])


    const DeleteSun = (id) => {
        delete sun[id]
        setSun({
        ...sun
        })
    }

    const DeleteMon = (id) => {
        delete mon[id]
        setMon({
            ...mon
        })
    }

    const DeleteTues = (id) => {
        delete tues[id]
        setTues({
            ...tues
        })
    }

    const DeleteWed = (id) => {
        delete wed[id]
        setWed({
            ...wed
        })
    }

    const DeleteThurs = (id) => {
        delete thurs[id]
        setThurs({
            ...thurs
        })
    }

    const DeleteFri = (id) => {
        delete fri[id]
        setFri({
            ...fri
        })
    }

    const DeleteSat = (id) => {
        delete sat[id]
        setSat({
        ...sat
        })
    }

    const DeleteAll = () => {
        setSun({})
        setMon({})
        setTues({})
        setWed({})
        setThurs({})
        setFri({})
        setSat({})
    }

    const ImgFilter = (array) => {
        try {
            if(array.includes('meat' || 'chicken' || 'fish' || 'beef' || 'pork')){
              return '/meat-gif.gif'
            }
            if(array.includes('cheese' || 'cheddar' || 'brie' || 'swiss' || 'mozzarella' || 'gouda' || 'gruyere' || 'monteray jack')){
              return '/cheese-gif.gif'
            }
            if(array.includes('carrot' || 'lettuce' || 'salad' || 'tomato' || 'onion' || 'eggplant')){
              return '/carrot-gif.gif'
            }
            if(array.includes('eggs' || 'bacon')){
              return '/eggsbacon-gif.gif'
            }
            if(array.includes('bread' || 'bread crumbs' || 'pretzel' || 'flour' || 'toast')){
              return '/pretzel-gif.gif'
            }
            if(array.includes('fruit' || 'apple' || 'peach' || 'banana' || 'berry')){
              return '/apple-gif.gif'
            }
            else{
              return '/apple-gif.gif'
            }
            
        } catch (error) {
            console.log(error)
        }
      }
    
    const [rec, setRec] = useState([]);
    const r = useRouter();
    const { id } = r.query

    return <>      
        <DndProvider backend={TouchBackend} options={{
            enableTouchEvents:false,
            enableMouseEvents:true
        }}>
        <Background/>
            <Wrapper>
            <Spacer/>
            <FavsCont>
            {favs !== null && favs.map((o, i)=><DragCard 
            onCardClick={()=>r.push('/recipe/'+o.recipe_id)}
                    src={ImgFilter(o.recipe_ingredients)}
                    type="recipes" 
                    id={o.recipe_id}
                    key={i}
                    recipe_name={o.recipe_name}
                    recipe_description={o.recipe_description}
                    recipepos={o.pos}
                    />
                    )}
            </FavsCont>
            <MenuCont>
                <Title color={themes[theme].text}>Click and drag to plan your meals for the week!</Title>
                <ButCont>
                    <FormButton buttonText='Clear Calendar' onClick={DeleteAll} />
                </ButCont>
            </MenuCont>
    
            <DropCont>
                <CalendarCont>
                    <Dropzone title={'Sun'} width={100} acceptType={'recipes'} onDropItem={(item)=>{
                        const r_id = uuidv4();
                        console.log("I'm item", item)
                        setSun((prev)=>({
                            ...prev,
                            [r_id]:{
                                id:r_id,
                                recipe_id:item.recipe_id,
                                recipe_name:item.recipe_name,
                                recipe_description:item.recipe_description
                            }
                    
                        }))
                        console.log("sundayy",sun)                    
                    }}>
                        {Object.values(sun).map((o,i)=><SmallCard 
                            type="boardrecipes" 
                            id={o.recipe_id}
                            key={i}
                            recipe_name={o.recipe_name}
                            recipe_description={o.recipe_description}
                            recipepos={o.pos}
                            onClose={()=>DeleteSun(o.id)}
                            />
                        )}
                    </Dropzone >
                    <Dropzone title={'Mon'} width={100} acceptType={'recipes'} onDropItem={(item)=>{
                        const r_id = uuidv4();
                        console.log("I'm item", item)
                        setMon((prev)=>({
                            ...prev,
                            [r_id]:{
                                id:r_id,
                                recipe_id:item.recipe_id,
                                recipe_name:item.recipe_name,
                                recipe_description:item.recipe_description
                            }
                    
                        }))
                        console.log("mondayyyy",mon)                    
                    }}>
                        {Object.values(mon).map(o=><SmallCard
                            type="boardrecipes" 
                            recipe_id={o.recipe_id}
                            key={o.recipe_id}
                            recipe_name={o.recipe_name}
                            recipe_description={o.recipe_description}
                            recipepos={o.pos}
                            onClose={()=>DeleteMon(o.id)}
                            //onDrag={()=>HandleAddToBoard(o.recipe_id, obj)}
                            />
                        )}
                    </Dropzone >
                    <Dropzone title={'Tues'} width={100} acceptType={'recipes'} onDropItem={(item)=>{
                        const r_id = uuidv4();
                        console.log("I'm item", item)
                        setTues((prev)=>({
                            ...prev,
                            [r_id]:{
                                id:r_id,
                                recipe_id:item.recipe_id,
                                recipe_name:item.recipe_name,
                                recipe_description:item.recipe_description
                            }
                    
                        }))
                        console.log("tuesdayyy",tues)                    
                    }}>
                        {Object.values(tues).map(o=><SmallCard 
                            type="boardrecipes" 
                            recipe_id={o.recipe_id}
                            key={o.recipe_id}
                            recipe_name={o.recipe_name}
                            recipe_description={o.recipe_description}
                            recipepos={o.pos}
                            onClose={()=>DeleteTues(o.id)}
                            //onDrag={()=>HandleAddToBoard(o.recipe_id, obj)}
                            />
                            )}
                    </Dropzone >
                    <Dropzone title={'Wed'} width={100} acceptType={'recipes'} onDropItem={(item)=>{
                        const r_id = uuidv4();
                        console.log("I'm item", item)
                        setWed((prev)=>({
                            ...prev,
                            [r_id]:{
                                id:r_id,
                                recipe_id:item.recipe_id,
                                recipe_name:item.recipe_name,
                                recipe_description:item.recipe_description
                            }
                            
                        }))                 
                        console.log("wednesdayyy",wed)  
                    }}>
                        {Object.values(wed).map(o=><SmallCard 
                            type="boardrecipes" 
                            recipe_id={o.recipe_id}
                            key={o.recipe_id}
                            recipe_name={o.recipe_name}
                            recipe_description={o.recipe_description}
                            recipepos={o.pos}
                            onClose={()=>DeleteWed(o.id)}
                            //onDrag={()=>HandleAddToBoard(o.recipe_id, obj)}
                            />
                        )}
                    </Dropzone >
                    <Dropzone title={'Thurs'} width={100} acceptType={'recipes'} onDropItem={(item)=>{
                        const r_id = uuidv4();
                        console.log("I'm item", item)
                        setThurs((prev)=>({
                            ...prev,
                            [r_id]:{
                                id:r_id,
                                recipe_id:item.recipe_id,
                                recipe_name:item.recipe_name,
                                recipe_description:item.recipe_description
                            }
                            
                        }))                 
                        console.log("thursdayyy",thurs)  
                    }}>
                        {Object.values(thurs).map(o=><SmallCard 
                            type="boardrecipes" 
                            recipe_id={o.recipe_id}
                            key={o.recipe_id}
                            recipe_name={o.recipe_name}
                            recipe_description={o.recipe_description}
                            recipepos={o.pos}
                            onClose={()=>DeleteThurs(o.id)}
                            //onDrag={()=>HandleAddToBoard(o.recipe_id, obj)}
                            />
                        )}
                    </Dropzone >
                    <Dropzone title={'Fri'} width={100} acceptType={'recipes'} onDropItem={(item)=>{
                        const r_id = uuidv4();
                        console.log("I'm item", item)
                        setFri((prev)=>({
                            ...prev,
                            [r_id]:{
                                id:r_id,
                                recipe_id:item.recipe_id,
                                recipe_name:item.recipe_name,
                                recipe_description:item.recipe_description
                            }
                            
                        }))                 
                        console.log("fridayy",fri)  
                    }}>
                        {Object.values(fri).map(o=><SmallCard
                            type="boardrecipes" 
                            recipe_id={o.recipe_id}
                            key={o.recipe_id}
                            recipe_name={o.recipe_name}
                            recipe_description={o.recipe_description}
                            recipepos={o.pos}
                            onClose={()=>DeleteFri(o.id)}
                            //onDrag={()=>HandleAddToBoard(o.recipe_id, obj)}
                            />
                        )}
                    </Dropzone >
                    <Dropzone title={'Sat'} width={100} acceptType={'recipes'} onDropItem={(item)=>{
                        const r_id = uuidv4();
                        console.log("I'm item", item)
                        setSat((prev)=>({
                            ...prev,
                            [r_id]:{
                                id:r_id,
                                recipe_id:item.recipe_id,
                                recipe_name:item.recipe_name,
                                recipe_description:item.recipe_description
                            }
                        }))                 
                        console.log("saturdayyy",sat)  
                    }}>
                        {Object.values(sat).map(o=><SmallCard
                            type="boardrecipes" 
                            recipe_id={o.recipe_id}
                            key={o.recipe_id}
                            recipe_name={o.recipe_name}
                            recipe_description={o.recipe_description}
                            recipepos={o.pos}
                            onClose={()=>DeleteSat(o.id)}
                            />
                        )}
                    </Dropzone >
                </CalendarCont>
            </DropCont>
            </Wrapper>
        </DndProvider>
    </>
}