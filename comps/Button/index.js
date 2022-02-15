import styled from "styled-components";
import { useRouter } from "next/router";
import { comp_themes, themes, view_themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { useItemsView } from "../../utils/provider";
import { colors } from "../../utils/colors";
import Dietary from "../Dietary";

const But = styled.button`
  display:flex;
  justify-content:center;
  align-items:center;
  box-shadow: 0px 2px 10px ${props=>props.shadow};
  border-radius: 10px;
  background-color:#EF6345;
  padding:5px 10px 5px 10px;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  font-size:1.2rem;
  color:white;
  border:none;
  width:150px;
  height:50px;

  :hover {
    cursor: pointer;
  }
`

const Button = ({
  text='text',
  onClick=()=>{}
}) => {

  const {theme, setTheme} = useTheme();

  return <But onClick={onClick} shadow={themes[theme].button_shadow}>
    {text}
  </But>
}

export default Button;