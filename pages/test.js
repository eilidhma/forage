// import styled from "styled-components";
// import { useState } from "react";
// import { signup, login } from "./api/Controller/user";

// const SearchBar = styled.input`
//     width: 100%;
//     height: 40px;
//     padding: 10px;
//     margin: 5px 0 5px 0;
//     border-radius: 10px;
//     border: none;
//     font-family: "Poppins", sans-serif;
//     font-weight: 500;
//     box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.25);
//     :focus {
//         outline: none !important;
//         border: 1px black solid;
//     }
// `

// const Test = () => {

//     const [searchVal, setSearchVal] = useState("");
//     const [pw, setPw] = useState("");

//     return(
//         <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100vw', height:'100vh'}}>

//             <SearchBar onChange={(e)=>setSearchVal(e.target.value)} value={searchVal}/>
//             <SearchBar onChange={(e)=>setPw(e.target.value)} value={pw}/>
//             <button onClick={()=>{
//                 signup({
//                     email:searchVal, 
//                     password:pw})
//             }}>sign up</button>
//         </div>

//     )
// }

// export default Test