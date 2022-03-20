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
import AddIngredients from '../comps/AddIngredients'
import { filterProps } from 'framer-motion'
import axios from 'axios'
import { useRecipesData } from '../utils/provider'
import Apple from '../comps/3d/Apple'
import Table from '../comps/3d/Table'
import Coffeecup from '../comps/3d/Coffecup'


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
  height:100vh;
  width:100vw;
  top:0;
  left:0;
  z-index:5;
`
const TableCont = styled.div`
  height:100vh;
  width:100vw;
  position:fixed;
  top:0;
  left:0;
  z-index:0;
`
const AppleCont = styled.div`
  height:100vh;
  width:100vw;
  position:fixed;
  top:0;
  left:0;
  z-index:1;
`
const CoffeeCont = styled.div`
  height:100vh;
  width:100vw;
  position:fixed;
  top:0;
  left:0;
  z-index:1;
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
  width: 100vw;
  height: 60vh;
  z-index:5;
`

const ResultsCont = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  justify-content: center;
  align-items: center;
  width: 90vw;
  z-index:5;
`


export default function Home({}) {

//  axios.create(
//     {
//             baseURL: "https://forage-backend-final.herokuapp.com/",
//             withCredentials: false,
//             headers: {
//               'Access-Control-Allow-Credentials':true,
//               'Access-Control-Allow-Origin' : '*',
//               'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
//           }
//       })

  // const [recipes, setRecipes] = useState()
  const {recipes, setRecipes} = useRecipesData();  

  
  useEffect(() => {

    const getData = async() => {
      const result = await axios.get('https://forage-backend-final.herokuapp.com/recipes');
      setRecipes(result.data)
      console.log(recipes, "data")
    } 
    getData()
  },[]) 

//need this later
  // /console.log(recipes[0].ingredients)
  var someStr = 'He said "Hello, my name is Foo"';
  //console.log(someStr);     
  //console.log(someStr.replace(/['"]+/g, ''));     

  const r = useRouter();
  const [isToggled, setIsToggled] = useState(false);
  const introText = `Hungry?\n We can help.`
  const [filteredArr, setFilteredArr] = useState([])
  const [ings, setIngs] = useState(["onion", "garlic", "pasta"]);
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


  const ResultsFunc = (filters) => {
  //console.log("called")
    let result = []
    recipes.forEach(r=>{
      let count = 0;
      var fail = false

      filters.forEach(element => {
        if(r.ingredients.includes(element)){
          count++
        } else {
          fail = true;
        }


      });

      if(count >= 3 && fail === false){
        result.push(r)
      }
      
    })
    // return result
    //console.log(result)
    //let filtered = recipes.filter((r,i)=> result[i])
  setFilteredArr(recipes)
    //console.log(filteredArr)
  }

    if(recipes === null){
      return <>
      </>
    }

        
    return <>      
    <Background/>
      <Wrapper>
      
      <IntroCont>
        <div style={{
          background:'rgba(255,255,255,0.25)', 
          width:'20%', 
          height:'25%', 
          borderRadius:25,
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'}}>
        <Title title="Hungry?"/>
        <Title title="We can help."/>
        <Button text='Start' onClick={()=>r.push("#search")}/>
        </div>
      </IntroCont>

      <AppleCont>
        <Canvas className='canvas'>
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} />
          <Apple />
        </Canvas>
      </AppleCont>

      <CoffeeCont>
        <Canvas className='canvas'>
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} />
          <Coffeecup />
        </Canvas>
      </CoffeeCont>

      <TableCont>
        <Canvas className='canvas1' camera={{position: [0, 0, 6]}}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} />
          <Table />
        </Canvas>
      </TableCont>

      <SearchCont id="search">
        <AddIngredients 
        ings={ings}
        searchVal={searchVal}
        onClickAdd={()=>PushIngredient()}
        onClickDelete={(e)=>SpliceIngredient(e)}
        onChangeSearch={(e)=>setSearchVal(e.target.value)} 
        // showRecipes={()=>r.push("#results")}
        showRecipes={()=>ResultsFunc(ings)}
        />
      </SearchCont>

      <Title title="Here's what you can make!"/>
      <ResultsCont id="results">

        {/* {recipes.filter(recipe=>recipe.ingredients.includes(ings[0])).map((recipe, index) => { */}
        {filteredArr.map((recipe, index) => {
          return (
            <Card 
            key={index} 
            recipe_name={recipe.name} 
            recipe_description={recipe.ingredients.replace(/['["]+/g, '')}
            onCardClick={()=>r.push('/recipe/'+recipe._id)}
            />
            );
        })}
      </ResultsCont>
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