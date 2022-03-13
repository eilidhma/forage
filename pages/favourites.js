import styled from 'styled-components'
import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd'
import Background from '../comps/Background'
import Recipe from '../comps/Recipe'
import Card from '../comps/Card'
import DragCard from '../comps/DragCard'
import clientPromise from '../lib/mongodb'
import Dropzone from '../comps/Dropzone'
import { v4 as uuidv4 } from 'uuid';

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

const DropCont = styled.div`
  height:20vh;
  background:${({bg})=> bg || '#DDD'};
  width:100%;
  position: relative;
`

export default function Favourites({recipes}){

    const [storage, setStorage] = useState()

    const [rs, setRs] = useState({})

    useEffect(() => {
        const curRec = recipes
        console.log(curRec)
        setRec(curRec);
    
        setStorage(localStorage.getItem("recipe_id", id))
    }, [])

    const DeleteRecipe = (id) => {
        if(rs[id]){
          delete rs[id]
          setRs({
            ...rs
          })
        }
      }

    const HandleUpdateRecipe = (id, recipedata) => {
    rs[id] = {
        ...rs[id],
        ...recipedata
    }

    setRs({
        ...rs
    })
    }
    
    const [rec, setRec] = useState([]);
    const r = useRouter();
    const { id } = r.query

    return <>      
        <DndProvider backend={TouchBackend} options={{
            enableTouchEvents:false,
            enableMouseEvents:true
        }}>
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
                    <Dropzone acceptType={'recipes'} onDropItem={(item)=>{
                        
                        const r_id = uuidv4();
                        setRs((prev)=>({
                            ...prev,
                            [r_id]:{id:r_id}
                        }))
                    }}>
                        <DropCont>
                        <h2 style={{paddingTop:'50px'}}>Recipe Calendar</h2>
                        </DropCont>
                        {Object.values(rs).map(o=><DragCard 
                        //onClose={()=>DeleteNote(o.id)}
                        type="boardrecipes" 
                        key={o.id}
                        recipe_name={o.name}
                        recipe_description={o.description}
                        recipepos={o.pos}
                        recipecontent={o.content}
                        onUpdateRecipes={(obj)=>HandleUpdateRecipe(o.id, obj)}
                        >
                        </DragCard>
                        )}
                    </Dropzone >
                    <DragCard />
            </Wrapper>
                </DndProvider>

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
  