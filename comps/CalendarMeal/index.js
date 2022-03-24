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
  justify-content:${props=>props.justifyContent};
  align-items:center;
  flex-direction:${props=>props.flexDirection};
  min-width:${props=>props.width};
  max-width:${props=>props.width};
  box-shadow: 0px 0px 20px ${props=>props.shadow};
  border-radius: 20px;
  background-color:${props=>props.background};
  //padding:${props=>props.padding} 20px ${props=>props.padding} 20px;
  margin: 5px;
  padding: 5px;
  ${({position, left, top})=> (position === 'fixed' || position === 'absolute') && `
    left:${left}px;
    top:${top}px;
    position:${position};
  `}
`

const Title = styled.h3`
  color:#EF6345;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size:14px;
  min-height: 50px;
  max-height: 50px;
  text-align: center;
  min-width: 150px;
  max-width: 150px;
`

const Close = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  position: relative;
  top: -80;
`

const CalendarMeal = ({
  recipe_name='Recipe Name',
  recipe_description='This is a description of the recipe blah blah blahhhh',
  src='plate.png',
  onClose=()=>{},
  onUpdateRecipes=()=>{},
  onDrag=()=>{},
  recipepos=null,
  type='recipes',
  children=null,
  recipe_id=""
}) => {

  const {theme, setTheme} = useTheme();
  const {items_view, setItemsView} = useItemsView();

  const [data, setData] = useState({})


  const [pos, setPos] = useState(recipepos || {
    left:0,
    top:0,
    position: 'relative'
  })

  /*useEffect(()=>{
    if(type === 'boardrecipes'){
      onUpdateRecipes({
        pos
      })
    }
  }, [pos])*/


  const [{ isDragging, coords }, drag, dragPreview] = useDrag(() => ({
		// "type" is required. It is used by the "accept" specification of drop targets.
    type,
    item: {
      type:"recipes",
      recipe_name,
      recipe_id
    },
    end:(item, monitor)=>{
      if(type === 'boardrecipes'){
        setPos({
          left:monitor.getClientOffset().x,
          top:monitor.getClientOffset().y,
          position: 'fixed'
        })
        //item
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



  return <Cont ref={dragPreview} {...sty}
    flexDirection={view_themes[items_view].card_flex_direction}
    width={view_themes[items_view].card_width}
    background={themes[theme].card_bg_color}
    justifyContent={view_themes[items_view].justify_content}
    shadow={themes[theme].shadow}
    padding={view_themes[items_view].card_padding}
  >
    <Close onClick={onClose}>
        <AiOutlineCloseCircle size={25} color="rgba(0,0,0,0.4)"/>
    </Close>
    <Title onDrop={onDrag} ref={drag}>{recipe_name}</Title>
  </Cont>
}

export default CalendarMeal;