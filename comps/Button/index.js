import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { motion } from "framer-motion";

export default function Button({
  text='text',
  onClick=()=>{}
}) {

  const {theme, setTheme} = useTheme();

  return <But
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick} shadow={themes[theme].button_shadow}
  >
    {text}
  </But>
}

const But = styled(motion.button)`
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
