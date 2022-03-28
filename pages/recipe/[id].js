import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Background from '../../comps/Background'
import Recipe from '../../comps/Recipe'
import axios from 'axios'
import { useRecipes } from '../../utils/provider'

export default function Home({}) {
  
  const r = useRouter();
  const { id } = r.query
  
  const {favRecipes, setFavRecipes} = useRecipes();
  
  const [fav_id, setFavId] = useState()
  const [fill, setFill] = useState('none')
  const [recipes, setRecipes] = useState([])
  const [currentUser, setCurrentUser] = useState();
  
  useEffect(() => {

    setCurrentUser(getCookie("user_id"))

    const getData = async() => {
      const result = await axios.get('https://forage-backend-final.herokuapp.com/recipes');
      setRecipes(result.data.filter((x) => {return x._id === id}))
    }

    getData()

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

  const addFav = async() => {

    if(fill === 'none' && currentUser){
      const result = await axios.post('https://forage-backend-final.herokuapp.com/addfav', {
          user_id: currentUser,
          recipe_id: recipes[0]._id,
          recipe_name: recipes[0].name,
          recipe_description: recipes[0].description,
          recipe_ingredients: recipes[0].ingredients
        })
        setFavId(result.data.savedFav._id)
    } else {
      alert('Please Sign up or Sign in to add favourites!')
    }
  }

  const HandleUpdateFavs = (id, favRecipesData) => {
    favRecipes[id] = {
      ...favRecipes[id],
      ...favRecipesData
    }

    setFavRecipes({
      ...favRecipes
    })
  }
  
  const Fill = async() => {

    if (fill === 'none' && currentUser) {
      setFill('#EF6345')
    } else {
        setFill('none')
        const result = axios.patch('https://forage-backend-final.herokuapp.com/removefav', {
        _id: fav_id
      })
    }
  }

  return <>      
    <Background/>
      <Wrapper>
      <Spacer/>
      {
        recipes && recipes.map((o) => (

          <Recipe
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

        ))
      }
    </Wrapper>
  </>
}

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