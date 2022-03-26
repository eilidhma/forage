import styled from 'styled-components'
import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import Background from '../../comps/Background'
import Recipe from '../../comps/Recipe'
import Card from '../../comps/Card'
import axios from 'axios'
// import clientPromise from '../../lib/mongodb'
import { useCurrentUser, useRecipes } from '../../utils/provider'


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

export default function Home({}) {

  const [recipes, setRecipes] = useState([])
  const [currentUser, setCurrentUser] = useState();

  // console.log(recipes, "recipes")

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

  const ImgFilter = (array) => {
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
  }
  
  useEffect(() => {

    setCurrentUser(getCookie("user_id"))
    console.log(currentUser, "da user")
    const getData = async() => {
      const result = await axios.get('https://forage-backend-final.herokuapp.com/recipes');
      setRecipes(result.data.filter((x) => {return x._id === id}))
      // console.log(result.data, "data")
      // return result.data
    }
      // setRecipes(result.data)
    getData()
    // getSpecificRecipe()
    
    // const getSpecificRecipe = async() => {
    //   const curRec = recipes.filter((x) => {return x._id === id})
    //   setRec(curRec);
    //   console.log(curRec[0], "current recipe")
    // }
    
    
    //  console.log(JSON.parse(curRec[0].ingredients.replace(/'/g, '"')))
    
    //  const CheckFavorite = () => {
      //    if(localStorage.getItem("recipe_id", id) === id) {
        //      setFill("#EF6345")
        //    }
        //  }
        //  CheckFavorite()
      }, [currentUser])
      
  const [rec, setRec] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [fill, setFill] = useState('none')
  const [fav_id, setFavId] = useState()

  const r = useRouter();
  const [isToggled, setIsToggled] = useState(false);
  const introText = `Hungry?\n We can help.`

  const { id } = r.query

  const setFavorite = () => {
    setIsFav(!isFav)
    AddFavorite()
  }
  
  const AddFavorite = () => {
    
    if(localStorage.getItem("recipe_id", id) !== id) {
      localStorage.setItem("recipe_id", id)
    } else if(localStorage.getItem("recipe_id", id) === id) {
      localStorage.removeItem("recipe_id", id)
      console.log("running")
    }
  }

  const addFav = async() => {

    if(fill === 'none'){
      const result = await axios.post('https://forage-backend-final.herokuapp.com/addfav', {
          user_id: currentUser,
          recipe_id: recipes[0]._id,
          recipe_name: recipes[0].name,
          recipe_description: recipes[0].description,
          recipe_ingredients: recipes[0].ingredients
        })
        console.log(result.data.savedFav._id)
        setFavId(result.data.savedFav._id)
    }
  
  }

  const {favRecipes, setFavRecipes} = useRecipes();

  const HandleUpdateFavs = (id, favRecipesData) => {
    favRecipes[id] = {
      ...favRecipes[id],
      ...favRecipesData
    }

    setFavRecipes({
      ...favRecipes
    })
    console.log(favRecipes)
  }
  
  const Fill = async() => {
    if(fill === 'none'){
      setFill('#EF6345')
    } else {
      setFill('none')
      const result = axios.patch('https://forage-backend-final.herokuapp.com/removefav',{
        _id:fav_id
      })
    }
  }


  return <>      
    <Background/>
      <Wrapper>
          <Spacer/>
      {recipes && recipes.map((o) => (
        
        <Recipe
        onClick={()=>{
          console.log(JSON.parse(o.ingredients.replace(/'/g, '"')))
          console.log(o.ingredients)
        }}
          key={o.id}
          recipe_name={o.name}
          recipe_desc={o.description}
          recipe_instructions={JSON.parse(o.steps.replace(/'/g, '"')).map(list=> {return <li>{list}</li>})}
          recipe_ingredients={JSON.parse(o.ingredients.replace(/'/g, '"')).map(list=> {return <li>{list}</li>})}
          onFavorite={() => addFav()}
          onClickFill={Fill}
          fill={fill}
          src={ImgFilter(o.ingredients)}
        />
      ))}
    </Wrapper>
    
  </>
}
