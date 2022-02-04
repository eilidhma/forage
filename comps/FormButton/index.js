import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";

import { colors } from "../../utils/colors";

const ButtonUI = styled(motion.button)`
    width: 135px;
    height: 35px;
    margin: 5px 0 0 0;
    background-color: ${colors.orange};
    border-radius: 10px;
    border: none;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

    font-family: "Poppins", sans-serif;
    font-size: 14px;
    color: white;

    :hover {
        cursor: pointer;
    }
`


export default function FormButton({
    buttonText="default",
    onClick=()=>{}
})
{
    return <>
        <ButtonUI 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
        >
            {buttonText}
        </ButtonUI>
    </>
}