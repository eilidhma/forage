import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";

export default function Background() {

  const {theme, setTheme} = useTheme();

  return <Cont inner={themes[theme].innerGradient} outer={themes[theme].outerGradient} />
}

const Cont = styled.div`
  background:radial-gradient(${props=>props.inner}, ${props=>props.outer});
  width:100%;
  height:100%;
  z-index:-1;
  position:fixed;
`
