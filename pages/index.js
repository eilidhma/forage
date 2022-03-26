import styled from 'styled-components'
import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber';
import Background from '../comps/Background'
import Card from '../comps/Card'
import Close from '../comps/Close'
import Heart from '../comps/Heart'
import Button from '../comps/Button'
import Title from '../comps/Title'
import HamMenu from '../comps/HamMenu'
import AddIngredients from '../comps/AddIngredients'
import { filterProps } from 'framer-motion'
import axios from 'axios'
import { useRecipesData } from '../utils/provider'
import Apple from '../comps/3d/Apple'
import Table from '../comps/3d/Table'
import Coffeecup from '../comps/3d/Coffeecup'
import Pizza from '../comps/3d/Pizza'
import Pizzaslice from '../comps/3d/Pizzaslice'
import Plate from '../comps/3d/Plate'
import Bowl from '../comps/3d/Bowl'
import Pretzel from '../comps/3d/Pretzel'
import Carrot from '../comps/3d/Carrot'
import Eggplant from '../comps/3d/Eggplant'
import Banana from '../comps/3d/Banana'


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
  height:75vh;
  width:100vw;
  top:0;
  left:0;
  z-index:10;
`
const TableCont = styled.div`
  height:100vh;
  width:100vw;
  position:fixed;
  top:0;
  left:0;
  z-index:7;
`
const AppleCont = styled.div`
  height:100vh;
  width:100vw;
  position:fixed;
  top:0;
  left:0;
  z-index:8;
`
const CoffeeCont = styled.div`
  height:100vh;
  width:100vw;
  position:fixed;
  top:0;
  left:0;
  z-index:8;
`

const Spacer = styled.div`
  display: flex;
  width: 100%;
  height: 20vh;
`
const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`
const SearchCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index:10;
`
const PlateCont = styled.div`
  position:absolute;
  top:100vh;
  left:0;
  height:100vh;
  width:100vw;
  z-index:2;
`
const PizzaCont = styled.div`
  position:absolute;
  top:100vh;
  left:0;
  height:100vh;
  width:100vw;
  z-index:3;
`
const BananaCont = styled.div`
  position:absolute;
  top:100vh;
  left:0;
  height:100vh;
  width:100vw;
  z-index:2;
`

const ResultsCont = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  justify-content: center;
  align-items: center;
  width: 90vw;
  z-index:10;
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
        <Title title="Hungry?"/>
        <Title title="We can help."/>
        <Button text='Start' onClick={()=>r.push("#search")}/>
      </IntroCont>

      <AppleCont>
        <Canvas className='canvas'>
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} />
          <Apple />
        </Canvas>
      </AppleCont>

      <AppleCont>
        <Canvas className='canvas'>
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} />
          <Bowl />
        </Canvas>
      </AppleCont>

      <TableCont>
        <Canvas className='canvas1' camera={{position: [0, 0, 6]}}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} />
          <Table />
        </Canvas>
      </TableCont>
      
      <Spacer/>

      <SearchSection>

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

      <PizzaCont>
        <Canvas className='canvas'>
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} />
          <Pizzaslice />
        </Canvas>
      </PizzaCont>

      <PlateCont>
        <Canvas className='canvas'>
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} />
          <Plate />
        </Canvas>
      </PlateCont>

      <BananaCont>
        <Canvas className='canvas'>
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} />
          <Banana />
        </Canvas>
      </BananaCont>
      
      </SearchSection>

      <Title title="Here's what you can make!"/>
      <ResultsCont id="results">

        {filteredArr.map((recipe, index) => {
          return (
            <Card
            key={index} 
            recipe_name={recipe.name} 
            recipe_description={recipe.ingredients.replace(/['["]+/g, '')}
            onCardClick={()=>r.push('/recipe/'+recipe._id)}
            src={ImgFilter(recipe.ingredients)}
            />
            );
          })}
      </ResultsCont>

    </Wrapper>
    
  </>
}
