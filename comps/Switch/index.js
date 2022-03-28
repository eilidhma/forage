import React from "react";
import styled from "styled-components";
import { comp_themes, themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";

export default function Switch({ 
    id, 
    toggled, 
    onChange,
    onClick=()=>{},
}) {
  
  const {theme, setTheme} = useTheme();

  return <>
      <SwitchInput
        className="switch-checkbox"
        id={id}
        type="checkbox"
        checked={toggled}
        onChange={onChange}
      />
        <SwitchCont 
          className="switch-cont" 
          htmlFor={id}
          onClick={onClick}
          bgcolor={comp_themes[theme].switch_bg_color}
          borderColor={comp_themes[theme].switch_border_color}
        >
        <SwitchButton className="switch-button" />
      </SwitchCont>
    </>
}

const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`

const SwitchCont = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 80px;
  height: 40px;
  border-radius: 100px;
  background-color: ${props=>props.bgcolor};
  border: 2px solid ${props=>props.borderColor};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  transition: background-color 0.2s;
`

const SwitchButton = styled.span`
  content: "";
  position: absolute;
  left: 2px;
  width: 32px;
  height: 32px;
  border-radius: 45px;
  transition: 0.2s;
  background: #EF6345;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  ${SwitchInput}:checked + ${SwitchCont} & {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }

  ${SwitchCont}:active & {
    width: 45px;
  }
`

