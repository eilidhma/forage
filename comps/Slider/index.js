import React from "react";
import styled from "styled-components";
 
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

export default function Slider ({
    bgcolor = '#1B2B47',
})
{
    return <>
        <Styles bgcolor={bgcolor}>
            <input type="range" min={0} max={100} value={50} className="slider" />
        </Styles>
    </>
    
}
