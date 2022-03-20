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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  width: 100vw;
`

const Favs = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: center;
  flex-wrap: wrap;
  border: 1px solid black;
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
  background:${({bg})=> bg || '#DDD'};
  width:100%;
  height: 35vh;
`

const Menu = styled.div`
    display: flex;
    flex-direction:column;
    width: 25vw;
    border: 1px solid red;
    height: 100%;
    overflow-y: scroll;
`

const CalendarCont = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: space-evenly;
    width: 75vw;
    border: 1px solid blue;
    height: 100%;
`

const FavsCont = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 80vw;
    flex-wrap: wrap;
`


export default function Favourites({}){


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

    useEffect(() => {
        
        const getFavs = async() => {
            const result = await axios.get('https://forage-backend-final.herokuapp.com/getfavs')
            setFavs(result.data.favorites)
            // return result.data.favorites
            // console.log(result.data.favorites.length)
        }
        // setFavs(result.data.favorites);
        getFavs()
        // getFavs(setFavs(result.data.favorites))
        console.log(favs, 'da favs')
        setCurrentUser(getCookie("user_id"))

        console.log(currentUser, "da cookie")
        
        // setRs(favRecipes)
        // setCurRecipe(favRecipes)
    }, [currentUser])



    // const DeleteRecipe = (id) => {
    //     if(curRecipe[id]){
    //       delete curRecipe[id]
    //       setCurRecipe({
    //         ...curRecipe
    //       })
    //     }
    //   }

       const DeleteRecipe = (id) => {
        if(sun[id]){
          delete sun[id]
          setSun({
            ...sun
          })
        }
      }

    // const HandleUpdateRecipe = (id, recipedata) => {
    //     curRecipe[id] = {
    //         ...curRecipe[id],
    //         ...recipedata
    //     }

    //     setCurRecipe({
    //         ...curRecipe
    //     })
    // }

    const HandleUpdateRecipe = (id, recipedata) => {
        console.log("SUNDAY",sun)
        sun[id] = {
            ...sun[id],
            ...recipedata
        }

        setSun({
            ...sun
        })
    }

    const HandleAddToBoard = (id, recipedata) => {
        curRecipe[id] = {
            ...curRecipe[id],
            ...recipedata
        }
        
        setCurRecipe({
            ...curRecipe
        })
        console.log('cur recipe', curRecipe)
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
                {
                  favs !== null && favs[0].user_id === currentUser && recipes.filter((x) => {return x._id === favs[0].recipe_id}).map((o, i) => {
                        return (
                            <Card 
                            key={i} 
                            recipe_name={o.name} 
                            recipe_description={o.ingredients.replace(/['["]+/g, '')}
                            // onCardClick={()=>r.push('/recipe/'+recipe._id)}
                            />
                        );
                        
                    })
                }
            </FavsCont>
            <Spacer/>
            <Favs>
                {Object.values(rs).map(o=><Card 
                    //onCardClick={(obj)=>HandleAddToBoard(o.id, obj)}
                    onCardClick={()=>r.push('/recipe/'+o.id)}
                    type="recipes" 
                    id={o.id}
                    key={o.id}
                    recipe_name={o.name}
                    recipe_description={o.description}
                    recipepos={o.pos}
                    recipecontent={o.content}
                    onUpdateRecipes={(obj)=>HandleUpdateRecipe(o.id, obj)}
                    />)}
            </Favs>
            <h2>Recipe Calendar</h2>
            <DropCont>
                <Menu>
                    {Object.values(curRecipe).map(o=><CalendarMeal 
                    type="recipes" 
                    id={o.id}
                    key={o.id}
                    recipe_name={o.name}
                    recipe_description={o.recipe_description}
                    recipepos={o.pos}
                    onClose={()=>DeleteRecipe(o.id)}
                    //onUpdateRecipes={(obj)=>HandleUpdateRecipe(o.id, obj)}
                    />
                    )}
                </Menu>
                <CalendarCont>
                    <Dropzone title={'Sunday'} width={100} acceptType={'recipes'} onDropItem={(item)=>{
                        const r_id = uuidv4();
                        console.log("I'm item", item)
                        setSun(item)
                    }}>
                        {Object.values(sun).map(o=><CalendarMeal 
                        type="boardrecipes" 
                        id={o.id}
                        key={o.id}
                        recipe_name={o.recipe_name}
                        recipe_description={o.recipe_description}
                        recipepos={o.pos}
                        onClose={()=>DeleteRecipe(o.id)}
                        onUpdateRecipes={(obj)=>HandleUpdateRecipe(o.id, obj)}
                    />
                    )}
                    </Dropzone >
                    <Dropzone title={'Monday'} width={100} acceptType={'recipes'} onDropItem={(item)=>{
                        const r_id = uuidv4();
                        setMon((prev)=>({
                            ...prev,
                            ...item,
                            [r_id]:{id:r_id}
                        }))
                    }}>
                        {Object.values(mon).map(o=><CalendarMeal 
                        type="boardrecipes" 
                        id={o.id}
                        key={o.id}
                        recipe_name={o.name}
                        recipe_description={o.recipe_description}
                        recipepos={o.pos}
                        onClose={()=>DeleteRecipe(o.id)}
                        onUpdateRecipes={(obj)=>HandleUpdateRecipe(o.id, obj)}
                    />
                    )}
                    </Dropzone >
                    <Dropzone title={'Tuesday'} width={100} acceptType={'recipes'} onDropItem={(item)=>{
                        const r_id = uuidv4();
                        setTues((prev)=>({
                            ...prev,
                            ...item,
                            [r_id]:{id:r_id}
                        }))
                    }}>
                        {Object.values(tues).map(o=><CalendarMeal 
                        type="boardrecipes" 
                        id={o.id}
                        key={o.id}
                        recipe_name={o.name}
                        recipe_description={o.recipe_description}
                        recipepos={o.pos}
                        onClose={()=>DeleteRecipe(o.id)}
                        onUpdateRecipes={(obj)=>HandleUpdateRecipe(o.id, obj)}
                    />
                    )}
                    </Dropzone >
                    <Dropzone title={'Wednesday'} width={100} acceptType={'recipes'} onDropItem={(item)=>{
                        const r_id = uuidv4();
                        setWed((prev)=>({
                            ...prev,
                            ...item,
                            [r_id]:{id:r_id}
                        }))
                    }}>
                        {Object.values(wed).map(o=><CalendarMeal 
                        type="boardrecipes" 
                        id={o.id}
                        key={o.id}
                        recipe_name={o.name}
                        recipe_description={o.recipe_description}
                        recipepos={o.pos}
                        onClose={()=>DeleteRecipe(o.id)}
                        onUpdateRecipes={(obj)=>HandleUpdateRecipe(o.id, obj)}
                    />
                    )}
                    </Dropzone >
                    <Dropzone title={'Thursday'} width={100} acceptType={'recipes'} onDropItem={(item)=>{
                        const r_id = uuidv4();
                        setThurs((prev)=>({
                            ...prev,
                            ...item,
                            [r_id]:{id:r_id}
                        }))
                    }}>
                        {Object.values(thurs).map(o=><CalendarMeal 
                        type="boardrecipes" 
                        id={o.id}
                        key={o.id}
                        recipe_name={o.name}
                        recipe_description={o.recipe_description}
                        recipepos={o.pos}
                        onClose={()=>DeleteRecipe(o.id)}
                        onUpdateRecipes={(obj)=>HandleUpdateRecipe(o.id, obj)}
                    />
                    )}
                    </Dropzone >
                    <Dropzone title={'Friday'} width={100} acceptType={'recipes'} onDropItem={(item)=>{
                        const r_id = uuidv4();
                        setFri((prev)=>({
                            ...prev,
                            ...item,
                            [r_id]:{id:r_id}
                        }))
                    }}>
                        {Object.values(fri).map(o=><CalendarMeal 
                        type="boardrecipes" 
                        id={o.id}
                        key={o.id}
                        recipe_name={o.name}
                        recipe_description={o.recipe_description}
                        recipepos={o.pos}
                        onClose={()=>DeleteRecipe(o.id)}
                        onUpdateRecipes={(obj)=>HandleUpdateRecipe(o.id, obj)}
                    />
                    )}
                    </Dropzone >
                    <Dropzone title={'Saturday'} width={100} acceptType={'recipes'} onDropItem={(item)=>{
                        const r_id = uuidv4();
                        setSat((prev)=>({
                            ...prev,
                            ...item,
                            [r_id]:{id:r_id}
                        }))
                    }}>
                        {Object.values(sat).map(o=><CalendarMeal 
                        type="boardrecipes" 
                        id={o.id}
                        key={o.id}
                        recipe_name={o.name}
                        recipe_description={o.recipe_description}
                        recipepos={o.pos}
                        onClose={()=>DeleteRecipe(o.id)}
                        onUpdateRecipes={(obj)=>HandleUpdateRecipe(o.id, obj)}
                    />
                    )}
                    </Dropzone >
                </CalendarCont>
                </DropCont>
            </Wrapper>
        </DndProvider>

    </>
}


// export async function getServerSideProps(context) {
//     const client = await clientPromise;
  
//     const db = client.db("recipesDB");
  
//     let recipes = await db.collection("recipes").find({}).limit(1000).toArray();
//     recipes = JSON.parse(JSON.stringify(recipes));
  
//     return {
//       props: { recipes },
//     };
//   }
  