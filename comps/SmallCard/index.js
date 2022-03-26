import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { comp_themes, themes, view_themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { useItemsView } from "../../utils/provider";
import { colors } from "../../utils/colors";
import Dietary from "../Dietary";
import { useDrag, useDrop } from 'react-dnd'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const Cont = styled.div`
  display:flex;
  min-height: 200px;
  max-height: 200px;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  min-width:170px;
  max-width:170px;
  box-shadow: 0px 0px 10px ${props=>props.shadow};
  border-radius: 20px;
  background-color:${props=>props.background};
  padding:10px;
  margin: 20px;
`

const Title = styled.h3`
  color:#EF6345;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 12px;
  min-height: 35px;
  max-height: 40px;
  text-align: center;
  min-width: 150px;
  max-width: 150px;
`

const DescCont = styled.div`
  display:flex;
  justify-content:center;
  align-items:flex-start;
  max-height:100px;
  min-height:100px;
  max-width:150px;
  min-width:150px;
  overflow: hidden;
`

const Description = styled.p`
  font-family: "Poppins", sans-serif;
  font-style: italic;
  font-weight: 300;
  font-size:10px;
  color:${props=>props.color};
  width:${props=>props.textWidth};
  text-align:center;
`

const DietCont = styled.div`
  display:flex;
  flex-direction:row;
  width:200px;
  justify-content:space-between;
  align-items:center;
`

const Close = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: flex-end;
  position: relative;
  top:0px;
  right:0px;
`

const SmallCard = ({
  recipe_name='Recipe Name',
  recipe_description='This is a description of the recipe blah blah blahhhh',
  src='plate.png',
  onCardClick=()=>{},
  onClose=()=>{},
  onUpdateRecipes=()=>{},
  recipepos=null,
  type='recipes',
  recipe_id=""
}) => {

  const {theme, setTheme} = useTheme();
  const {items_view, setItemsView} = useItemsView();


  const [pos, setPos] = useState(recipepos || {
    left:0,
    top:0,
    position: 'relative'
  })

  useEffect(()=>{
    if(type === 'boardrecipes'){
      onUpdateRecipes({
        pos
      })
    }
  }, [pos])


  const [{ isDragging, coords }, drag, dragPreview] = useDrag(() => ({
    type,
    item: {
      type:"recipes",
      recipe_name,
      recipe_description,
      recipe_id
    },
    end:(item, monitor)=>{
      if(type === 'boardrecipes'){
        setPos({
          left:monitor.getClientOffset().x,
          top:monitor.getClientOffset().y,
          position: 'absolute'
        })
      }
    },
		// The collect function utilizes a "monitor" instance (see the Overview for what this is)
		// to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      coords: monitor.getClientOffset()
    })
  }))


  const sty = {
    left: type==='boardrecipes' ? pos.left : null,
    top: type==='boardrecipes' ? pos.top : null,
    position: type==='boardrecipes' ? pos.position : null
  }

  if(coords && isDragging){
    sty.left = coords.x;
    sty.top = coords.y;
    sty.position = 'fixed';
  }

  return <Cont onClick={onCardClick}
    background={themes[theme].card_bg_color}
    shadow={themes[theme].shadow}
  >
    <Close onClick={onClose}>
        <AiOutlineCloseCircle color={themes[theme].text}/>
    </Close>
    <Title ref={drag}>{recipe_name}</Title>
    <DescCont>
      <Description 
      color={themes[theme].text}>
        {recipe_description}
      </Description>
    </DescCont>
  </Cont>
}

export default SmallCard;