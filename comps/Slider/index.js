import React from "react";
import styled from "styled-components";
import { comp_themes, themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
 
export default function Slider() {
  
  const {theme, setTheme} = useTheme();

  return <>
    <Styles bgcolor={comp_themes[theme].slider_bg_color}>
      <input type="range" min={0} max={100} className="slider" />
    </Styles>
  </>
}

const sliderThumbStyles = (props) => (`
  width: 30px;
  height: 30px;
  background: #EF6345;
  cursor: pointer;
  border-radius: 15px;
  -webkit-transition: .2s;

`);

const Styles = styled.div`
  display: flex;
  align-items: center;
  color: #888;
  margin-top: 2rem;
  margin-bottom: 2rem;
  .slider {
    flex: 6;
    -webkit-appearance: none;
    width: 300px;
    height: 10px;
    border-radius: 15px;
    background: ${props=>props.bgcolor};
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
    outline: none;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      ${props => sliderThumbStyles(props)}
    }
    &::-moz-range-thumb {
      ${props => sliderThumbStyles(props)}
    }
  }
`;

