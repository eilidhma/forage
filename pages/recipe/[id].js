import styled from 'styled-components'
import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import Background from '../../comps/Background'
import Recipe from '../../comps/Recipe'
import Card from '../../comps/Card'
import clientPromise from '../../lib/mongodb'
import { useRecipes } from '../../utils/provider'


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

  const [recipes, setRecipes] = useState({})
  useEffect(() => {
    async()=>{
      const result = await axios.get('/recipes');
      setRecipes(result.data)
      console.log(recipes)
    }
   const curRec = recipes.filter((x) => {return x.id === id})
   console.log(curRec[0].name)
   setRec(curRec);
   console.log(JSON.parse(curRec[0].ingredients.replace(/'/g, '"')))

   const CheckFavorite = () => {
     if(localStorage.getItem("recipe_id", id) === id) {
       setFill("#EF6345")
     }
   }
   CheckFavorite()
  }, [])

  const [rec, setRec] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [fill, setFill] = useState('none')

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
  
  const Fill = () => {
    if(fill === 'none'){
      setFill('#EF6345')
    } else {
      setFill('none')
    }
  }


  return <>      
    <Background/>
      <Wrapper>
          <Spacer/>
      {rec && rec.map((o) => (
        
        <Recipe
          key={o.id}
          recipe_name={o.name}
          recipe_desc={o.description}
          recipe_instructions={JSON.parse(o.steps.replace(/'/g, '"'))}
          recipe_ingredients={JSON.parse(o.ingredients.replace(/'/g, '"'))}
          //recipe_ingredients={JSON.parse(o.ingredients.replace(/'/g, '"'))}
          //onFavorite={setFavorite}
          onFavorite={(obj)=>HandleUpdateFavs(o.id, o, obj)}
          onClickFill={Fill}
          fill={fill}
        />
      ))}
    </Wrapper>
    
  </>
}

// export async function getServerSideProps(context) {
//   const client = await clientPromise;

//   const db = client.db("recipesDB");

//   let recipes = await db.collection("recipes").find({}).limit(110).toArray();
//   recipes = JSON.parse(JSON.stringify(recipes));

//   return {
//     props: { recipes },
//   };
// }
