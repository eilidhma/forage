import styled from "styled-components";
import { useTheme } from "../../utils/provider";
import { AiOutlineClose } from 'react-icons/ai'


const Close = () => {

  const {theme, setTheme} = useTheme();

  return <Cont>
    <AiOutlineClose color="white" size={30}/>
  </Cont>
}

const Cont = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:30px;
  height:30px;
  border-radius: 50%;
  background-color:#8D95A3;
  padding:5px;
`

export default Close;