import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";

import { comp_themes, themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { colors } from "../../utils/colors";

const Cont = styled.div`
    display: flex;
    width: 550px;
    height: 380px;
`


export default function LoginUI({

}) 
{

    const {theme, setTheme} = useTheme();
    return <>

    </>
}