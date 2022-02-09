import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";

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
`

const Title = ({
  title='title'
}) => {

  const {theme, setTheme} = useTheme();

  return <Cont>
    <Text color={themes[theme].text}>{title}</Text>
  </Cont>
}

export default Title;