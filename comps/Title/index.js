import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";

const Title = ({
  title='title',
  margin='10px',
}) => {

  const {theme, setTheme} = useTheme();

  return <Cont>
    <Text margin={margin} color={themes[theme].text}>{title}</Text>
  </Cont>
}

const Cont = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
`

const Text = styled.h3`
  color:${props=>props.color};
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size:1.7rem;
  margin:${props=>props.margin};
  text-align: center;
`


export default Title;