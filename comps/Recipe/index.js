import styled from "styled-components";
import { motion } from "framer-motion";
 
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
`
const HeadingCont = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: fit-content;
    justify-content: center;
    align-items: center;
    padding: 10px;

    /* background-color: green; */
`
const BackCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;

    /* background-color: yellow; */
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
    flex: 1.5;

    /* background-color: blue; */
`
const InfoCont = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
    justify-content: center;
    align-items: center;

    /* background-color: red; */
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
    flex: 1;
    justify-content: center;
    position: relative;

    /* background-color: ${({bgcol})=>bgcol}; */
`
const RecipeName = styled.h4`
    font-family: "Poppins", sans-serif;
    font-size: 1.5rem;
    color: ${colors.orange};
    font-weight: 500;
    margin: 0;
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
const SecCont = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
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
    flex-wrap: wrap;
`
const ListItem = styled.li`
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    font-style: italic;
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
    flexdir="row",
    recipe_name="Recipe Name",
    recipe_desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel rutrum elit, nec cursus eros. Vestibulum leo justo, cursus nec enim a, efficitur posuere nisl. In dictum egestas est. Quisque non tortor ac sapien eleifend consequat. Aliquam in aliquam leo. Sed vulputate quam a justo tempus, sed lobortis nibh dapibus. Nulla facilisi. Proin in sapien risus ac sapien eleifend.",
    recipe_ingredients="Ingredient 1",
    recipe_instructions="Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    onFavorite=()=>{},
    onClickFill=()=>{},
    fill
})
{
    const {theme, setTheme} = useTheme();

    return <>
        <Wrapper>
            <HeadingCont>
                <BackCont>
                    Back
                </BackCont>

                <Heading color={comp_themes[theme].text_color}>
                    Here's your recipe!
                </Heading>
            </HeadingCont>

            <MainCont>
                <ImgCont>
                    <img src="/plate.png" width={250}/>
                </ImgCont>
                <InfoCont>
                    <InnerCont>
                        <DetailsCont bgcol="yellow" flexdir="column">
                            <RecipeName>
                                {recipe_name}
                            </RecipeName>
                            <Heart
                                onFavorite={onFavorite}
                                onClickFill={onClickFill}
                                fill={fill}
                            />
                        </DetailsCont>
                        <DetailsCont bgcol="green">
                            <Dietary/>
                            <Dietary diet="GF"/>
                            <Dietary diet="DF"/>
                        </DetailsCont>
                    </InnerCont>

                    <DescCont>
                        <Desc color={comp_themes[theme].text_color}>
                            {recipe_desc}
                        </Desc>
                    </DescCont>
                </InfoCont>
            </MainCont>

            <SecCont>
                <HeadingCont>
                    <Heading color={colors.orange}>Ingredients</Heading>
                </HeadingCont>

                <IngredientsCont>
                    <List>
                        <ListItem color={comp_themes[theme].text_color}>
                            {recipe_ingredients}
                        </ListItem>
                    </List>
                </IngredientsCont>
            </SecCont>
            <SecCont>
                <HeadingCont>
                    <Heading color={colors.orange}>Instructions</Heading>
                </HeadingCont>

                <List>
                    <ListItem color={comp_themes[theme].text_color}>
                        {recipe_instructions}
                    </ListItem>
                </List>
            </SecCont>
            <QRCont>
                <QRImgCont>
                    <h1>
                        QR HERE
                    </h1>
                </QRImgCont>
                <QRDesc color={comp_themes[theme].text_color}>
                Scan this QR code with your phone and get a grocery list of the items you need to create your new delicious recipe!
                </QRDesc>   
            </QRCont>
        </Wrapper>
    </>
}