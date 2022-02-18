import styled from 'styled-components'
import Router, { useRouter } from 'next/router'
import { useState } from 'react'

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

  const r = useRouter();
  const [isToggled, setIsToggled] = useState(false);
  const introText = `Hungry?\n We can help.`

 // console.log(r.query)

  //const { recipe } = r.query

  // var meal = null;
  // if(r.params && r.params.meal){
  //   meal = r.params.meal;
  // }

  return <>      
    <Background/>
      <Wrapper>
          <Spacer/>
        <Recipe/>

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
