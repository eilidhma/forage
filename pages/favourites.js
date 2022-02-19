import styled from 'styled-components'
import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import Background from '../comps/Background'
import Recipe from '../comps/Recipe'
import Card from '../comps/Card'
import clientPromise from '../lib/mongodb'


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

export default function Favourites({recipes}){

    const [storage, setStorage] = useState()

    useEffect(() => {
        const curRec = recipes
        console.log(curRec)
        setRec(curRec);
    
        setStorage(localStorage.getItem("recipe_id", id))
    }, [])
    
    const [rec, setRec] = useState([]);
    const r = useRouter();
    const { id } = r.query

    return <>      
        <Background/>
            <Wrapper>
                <Spacer/>
                {rec && rec.filter( x => x.id === storage).map( x => (
                    <Card
                        key={x.id}
                        recipe_name={x.name}
                        recipe_description={x.description}
                        onCardClick={()=>r.push('/recipe/'+x.id)}
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
  