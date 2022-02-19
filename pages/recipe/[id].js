import styled from 'styled-components'
import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import Background from '../../comps/Background'
import Recipe from '../../comps/Recipe'
import Card from '../../comps/Card'
import clientPromise from '../../lib/mongodb'


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

export default function Home({recipes}) {

  useEffect(() => {
   const curRec = recipes.filter((x) => {return x.id === id})
   console.log(curRec[0].name)
   setRec(curRec);

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

 // console.log(r.query)

  const { id } = r.query
  // console.log(id)
  //const recipe =

  // var meal = null;
  // if(r.params && r.params.meal){
  //   meal = r.params.meal;
  // }

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
          recipe_ingredients={o.ingredients}
          onFavorite={setFavorite}
          onClickFill={Fill}
          fill={fill}
        />
      ))}
    </Wrapper>
    
  </>
}

export async function getServerSideProps(context) {
  const client = await clientPromise;

  const db = client.db("recipesDB");

  let recipes = await db.collection("recipes").find({}).limit(110).toArray();
  recipes = JSON.parse(JSON.stringify(recipes));

  return {
    props: { recipes },
  };
}
