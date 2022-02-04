import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";

const Cont = styled.div`
  background:radial-gradient(${props=>props.inner}, ${props=>props.outer});
  width:100vw;
  height:100vh;
  z-index:-1;
  position:fixed;
`

const Background = () => {

  const {theme, setTheme} = useTheme();

  return <Cont inner={themes[theme].innerGradient} outer={themes[theme].outerGradient}>

  </Cont>
}

export default Background;