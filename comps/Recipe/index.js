import styled from "styled-components";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { themes, comp_themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { colors } from "../../utils/colors";

import Dietary from "../Dietary";
import Heart from "../Heart";


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    max-width: 1000px;
    height: fit-content;
    margin-bottom: 375px;
    margin-top: -100px;
`
const HeadingCont = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: fit-content;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-top: 50px;

    /* background-color: green; */
`
const BackCont = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    color: ${props=>props.color};
    :hover {
    cursor: pointer;
}

/* background-color: yellow; */
`
const Arrow = styled.div`
  width: 0; 
  height: 0;
  border-radius: 50px;
  margin-right: 5px;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent; 
  border-right: 7px solid #EF6345; 
`
const Heading = styled.h3`
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    color: ${({color})=>color};
`
const MainCont = styled.div`
    display: flex;
    flex: 2;
    padding-top: 30px;
`
const ImgCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    /* background-color: blue; */
`
const InfoCont = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2.5;
    margin-left: 25px;
    justify-content: flex-start;
    align-items: center;

    // /* background-color: red; */
`
const InnerCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: fit-content;

    margin-bottom: 10%;
`

const DetailsCont = styled.div`
    display: flex;
    flex-direction: ${({flexdir})=>flexdir};
    flex: ${({flex})=>flex};
    justify-content: ${({justify})=>justify};
    position: relative;

    /* background-color: ${({bgcol})=>bgcol}; */
`
const RecipeName = styled.h4`
    font-family: "Poppins", sans-serif;
    font-size: 1.5rem;
    color: ${colors.orange};
    font-weight: 500;
    margin: 0;
    text-transform: capitalize;
`
const DescCont = styled.div`
    width: 100%;
    height: fit-content;
`
const Desc = styled.p`
    font-size: 1.1rem;
    font-family: "Poppins", sans-serif;
    font-weight: 300;
    color: ${({color})=>color};
`
const SecContCont =styled.div`
    display: flex;
    flex-direction: row;
`
const SecCont = styled.div`
    display: flex;
    flex: ${({flex})=>flex};
    flex-direction: column;
    overflow: none;
`
const IngredientsCont = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: fit-content;
    max-height: 200px;

    /* background-color: teal; */
`
const List = styled.ol`
    max-height: 200px;
    display: flex;
    flex-direction: column;
`
const ListItem = styled.div`
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    font-style: italic;
    text-transform: ${({transform})=>transform};
    color: ${({color})=>color};
`
const QRCont = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
`
const QRImgCont = styled.div`
    display: flex;
    width: 20%;
    height: fit-content;
    justify-content: center;
    align-items: center;
`
const QRDesc = styled.div`
    display: flex;
    width: 80%;
    height: fit-content;
    justify-content: center;
    align-items: center;
    font-family: "Poppins", sans-serif;
    font-size: 1.1rem;
    color: ${({color})=>color};
`

export default function Recipe({
    justify="center",
    flexdir="row",
    transform="",
    flex="",
    recipe_name="Recipe Name",
    recipe_desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel rutrum elit, nec cursus eros. Vestibulum leo justo, cursus nec enim a, efficitur posuere nisl. In dictum egestas est. Quisque non tortor ac sapien eleifend consequat. Aliquam in aliquam leo. Sed vulputate quam a justo tempus, sed lobortis nibh dapibus. Nulla facilisi. Proin in sapien risus ac sapien eleifend.",
    recipe_ingredients=[],
    recipe_instructions=[],
    onFavorite=()=>{},
    onClickFill=()=>{},
    onClick=()=>{},
    fill
})
{
    const r = useRouter();
    const {theme, setTheme} = useTheme();

    const toTitleCase = (phrase) => {
        return phrase
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      };
      
      let result = toTitleCase('maRy hAd a lIttLe LaMb');
      console.log(result);

    return <>
        <Wrapper onClick={onClick}>
            <HeadingCont>
                <BackCont
                color={themes[theme].back_color}     
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }} 
                onClick={()=>r.push(`/`)}
                >
                    <Arrow/>
                    Back
                </BackCont>
                <Heading color={comp_themes[theme].text_color}>
                    Bon Appétit!
                </Heading>
            </HeadingCont>

            <MainCont>
                <ImgCont>
                    <img src="/plate.png" width={250}/>
                </ImgCont>
                <InfoCont>
                    <InnerCont>
                        <DetailsCont flex="2" bgcol="yellow" flexdir="row">
                            <RecipeName>
                                {recipe_name}
                            </RecipeName>
                        </DetailsCont>
                        <DetailsCont flex="1" justify="center" bgcol="green">
                            <Heart 
                                onFavorite={onFavorite}
                                onClickFill={onClickFill}
                                fill={fill}
                            />
                            {/* <Dietary/>
                            <Dietary diet="GF"/>
                            <Dietary diet="DF"/> */}
                        </DetailsCont>
                    </InnerCont>

                    <DescCont>
                        <Desc color={comp_themes[theme].text_color}>
                            {recipe_desc}
                        </Desc>
                    </DescCont>
                </InfoCont>
            </MainCont>
            
            <SecContCont>
            <SecCont flex="1">
                <HeadingCont>
                    <Heading color={colors.orange}>Ingredients</Heading>
                </HeadingCont>

                <IngredientsCont>
                    <List>
                        <ListItem transform="capitalize" color={comp_themes[theme].text_color}>
                            {recipe_ingredients}
                        </ListItem>
                    </List>
                </IngredientsCont>
            </SecCont>
            <SecCont flex="2.5">
                <HeadingCont>
                    <Heading color={colors.orange}>Instructions</Heading>
                </HeadingCont>

                <List>
                    <ListItem color={comp_themes[theme].text_color}>
                        {recipe_instructions}
                    </ListItem>
                </List>
            </SecCont>
            </SecContCont>
        </Wrapper>
    </>
}