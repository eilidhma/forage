import styled from 'styled-components'
import Router, { useRouter } from 'next/router'
import { useState } from 'react'

import Background from '../comps/Background'
import Card from '../comps/Card'
import Close from '../comps/Close'
import Heart from '../comps/Heart'
import Button from '../comps/Button'
import Title from '../comps/Title'
import AddIngredients from '../comps/AddIngredients'
import clientPromise from '../lib/mongodb'


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
`

const ImgCont = styled.div`
  overflow: hidden;
`

const IntroCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Spacer = styled.div`
  display: flex;
  width: 100%;
  height: 20vh;
`

const SearchCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: 60vh;
`

const ResultsCont = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  justify-content: center;
  align-items: center;
  width: 90vw;
`


export default function Home({recipes}) {

  const r = useRouter();
  const [isToggled, setIsToggled] = useState(false);
  const introText = `Hungry?\n We can help.`

  const [ings, setIngs] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    
    const PushIngredient = () => {
        if(searchVal != "" && !ings.includes(searchVal))
        {
            // let temp = ings
            // temp.push(searchVal)
            // setIngs(temp)
            // setSearchVal("")
            // console.log(ings)

            setIngs([...ings, searchVal])
            setSearchVal("")
        }
    }

    const SpliceIngredient = (e) => {
        console.log(e.target.getAttribute('data-value'))
        const oldIngs = ings
        const index = ings.indexOf(e.target.dataset.value)
        ings.splice(index, 1)
        setIngs([...oldIngs])
    }


  return <>      
    <Background/>
      <Wrapper>

      <IntroCont>
        <Spacer/>
        <Title title="Hungry?"/>
        <Title title="We can help."/>
        <Button text='Start' onClick={()=>r.push("#search")}/>
        <ImgCont>
          <img width={1000} src='table.png'/>
        </ImgCont>
      </IntroCont>

      <SearchCont id="search">
        <AddIngredients 
        searchVal={searchVal}
        onClickAdd={()=>PushIngredient()}
        onClickDelete={(e)=>SpliceIngredient(e)}
        onChangeSearch={(e)=>setSearchVal(e.target.value)} 
        showRecipes={()=>r.push("#results")}/>
      </SearchCont>

      <Title title="Here's what you can make!"/>
      <ResultsCont id="results">
        {recipes.map((recipe, index) => {
          return (
            <Card 
            key={index} 
            recipe_name={recipe.name} 
            recipe_description={recipe.description}
            />
          );
        })}
      </ResultsCont>
    </Wrapper>
    
  </>
}

export async function getServerSideProps(context) {
  const client = await clientPromise;

  const db = client.db("recipesDB");

  let recipes = await db.collection("recipes").find({}).limit(6).toArray();
  recipes = JSON.parse(JSON.stringify(recipes));

  return {
    props: { recipes },
  };
}