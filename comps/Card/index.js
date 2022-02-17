import styled from "styled-components";
import { useRouter } from "next/router";
import { comp_themes, themes, view_themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { useItemsView } from "../../utils/provider";
import { colors } from "../../utils/colors";
import Dietary from "../Dietary";

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
  padding:${props=>props.padding} 20px ${props=>props.padding} 20px;
  margin: 20px;
`

const Title = styled.h3`
  color:#EF6345;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size:18px;
  min-height: 50px;
  max-height: 50px;
  text-align: center;
  min-width: 200px;
  max-width: 200px;
`

const DescCont = styled.div`
  display:flex;
  justify-content:flex-start;
  align-items:flex-start;
  max-height:100px;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Description = styled.p`
  font-family: "Poppins", sans-serif;
  font-style: italic;
  font-weight: 300;
  font-size:14px;
  color:${props=>props.color};
  width:${props=>props.textWidth};
  text-align:${props=>props.textAlign};
`

const Img = styled.img`
  display:${props=>props.display};
  width:150px;
  padding-bottom:30px;
  padding-top:30px;
`

const DietCont = styled.div`
  display:flex;
  flex-direction:row;
  width:200px;
  justify-content:space-between;
  align-items:center;
`

const Card = ({
  recipe_name='Recipe Name',
  recipe_description='This is a description of the recipe blah blah blahhhh',
  src='plate.png'
}) => {

  const {theme, setTheme} = useTheme();
  const {items_view, setItemsView} = useItemsView();

  return <Cont 
    flexDirection={view_themes[items_view].card_flex_direction}
    width={view_themes[items_view].card_width}
    background={themes[theme].card_bg_color}
    justifyContent={view_themes[items_view].justify_content}
    shadow={themes[theme].shadow}
    padding={view_themes[items_view].card_padding}
  >
    <Title>{recipe_name}</Title>
    <DescCont>
      <Description 
      color={themes[theme].text} 
      textWidth={view_themes[items_view].card_text_width}
      textAlign={view_themes[items_view].text_align}>
        {recipe_description}
      </Description>
    </DescCont>
    <Img display={view_themes[items_view].img_display} src={src}></Img>
    <DietCont>
      <Dietary/>
      <Dietary diet="GF"/>
      <Dietary diet="DF"/>
    </DietCont>
  </Cont>
}

export default Card;