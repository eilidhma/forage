import styled from "styled-components";
import { useRouter } from "next/router";
import { comp_themes, themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { colors } from "../../utils/colors";

const Cont = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:50px;
  height:50px;
  border-radius: 50%;
  background-color:rgba(255, 255, 255, 0.5);
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.25);
  padding:20px;
  margin-left: 10px;
`

const Diet = styled.h3`
  color:${props=>props.color};
  font-family:"Poppins", sans-serif;
  font-weight:500;
  font-style:italic;
  font-size:14px;
`

const Dietary = ({
  diet='V'
}) => {

  const {theme, setTheme} = useTheme();

  return <Cont>
    <Diet color={themes[theme].text}>{diet}</Diet>
  </Cont>
}

export default Dietary;