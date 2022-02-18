import styled from "styled-components";
import { useRouter } from "next/router";
import { comp_themes, themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { colors } from "../../utils/colors";
import { AiOutlineHeart } from 'react-icons/ai'
import { useState } from "react";

const Cont = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width: fit-content;
  height: fit-content;
  margin-top: 5px;
  :hover{
    cursor: pointer;
  }
`

const Heart = ({
  onFavorite=()=>{}
}) => {

  const [fill, setFill] = useState('none')

  const {theme, setTheme} = useTheme();

  const Fill = () => {
    if(fill === 'none'){
      setFill('#EF6345')
    } else {
      setFill('none')
    }
  }

  return <Cont onClick={onFavorite}>
    <svg onClick={Fill} width="20.3" height="17.5" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.7709 4.69002L14.478 5.39712L15.1851 4.69002L16.9329 2.94221C19.4383 0.436884 23.5002 0.436885 26.0055 2.94221C28.5109 5.44754 28.5109 9.50949 26.0055 12.0148L14.478 23.5423L2.95051 12.0148C0.445185 9.50949 0.445185 5.44754 2.95051 2.94221C5.45584 0.436885 9.51779 0.436885 12.0231 2.94221L13.7709 4.69002Z" fill={fill} stroke="#EF6345" strokeWidth="2"/>
    </svg>
  </Cont>
}

export default Heart;