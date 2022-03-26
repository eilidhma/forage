import styled from 'styled-components'
import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Background from '../comps/Background'
import Card from '../comps/Card'
import Close from '../comps/Close'
import Heart from '../comps/Heart'
import Button from '../comps/Button'
import Title from '../comps/Title'
import AddIngredients from '../comps/AddIngredients'
import { filterProps } from 'framer-motion'
import axios from 'axios'
import { useRecipesData } from '../utils/provider'


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
`

const TitleCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  margin-top: 100px;
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
  height: 80vh;
`

const ResultsCont = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  justify-content: center;
  align-items: center;
  width: 90vw;
`


export default function Home({}) {

  const {recipes, setRecipes} = useRecipesData();  

  
  useEffect(() => {
    const getData = async() => {
      const result = await axios.get('https://forage-backend-final.herokuapp.com/recipes');
      setRecipes(result.data)
    } 
    getData()
  },) 


  const r = useRouter();
  const [isToggled, setIsToggled] = useState(false);
  const [filteredArr, setFilteredArr] = useState([])
  const [ings, setIngs] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const PushIngredient = () => {
      if(searchVal != "" && !ings.includes(searchVal))
      {
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


  const ResultsFunc = (filters) => {
  //console.log("called")
    let result = []
    recipes.forEach(r=>{
      let count = 0;
      var fail = false
      //console.log(r)

      const ingredients = r.ingredients.split(",")
     // const ingredients = r.ingredients.replace(/'/g, '"').split(",")

      //console.log(ingredients)

      //const myArray = text.split("");

      
      filters.forEach(element => {
        if(r.ingredients.includes(element)){
          count++
        } else {
          fail = true;
        }


      });

      if(count >= 3){
        result.push(r)
        //console.log(result)
      }
      
      return result
    })
    setFilteredArr(result)
  }

    if(recipes === null){
      return <>
      </>
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
        ings={ings}
        searchVal={searchVal}
        onClickAdd={()=>PushIngredient()}
        onClickDelete={(e)=>SpliceIngredient(e)}
        onChangeSearch={(e)=>setSearchVal(e.target.value)}
        onClickScroll={(e)=>r.push("#results")} 
        showRecipes={()=>ResultsFunc(ings)}
        />
      </SearchCont>

      <div id="results" style={{height: "10vh"}}/>
        
      
      <TitleCont>
        <Title margin={"5px 0px 50px 0px"}title="Here's what you can make!"/>

      <ResultsCont id="results">

        {filteredArr.map((recipe, index) => {
          return (
            <Card
            key={index} 
            recipe_name={recipe.name} 
            recipe_description={recipe.ingredients.replace(/['["]+/g, '')}
            onCardClick={()=>r.push('/recipe/'+recipe._id)}
           //src={"/meat-gif.gif"}
            src={ImgFilter(recipe.ingredients)}
            />
            );
          })}
      </ResultsCont>
          </TitleCont>
    </Wrapper>
    
  </>
}
