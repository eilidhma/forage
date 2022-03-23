import '../styles/globals.css';
import AppProvider from '../utils/provider';
import NavBar from '../comps/NavBar';

// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const config = require('../config')
// const userRouter = require("../pages/api/Routes/user")

// // mongoose.connect('mongodb://localhost/todos',(e)=>{
// mongoose.connect(config.MONGODB_URL,(e)=>{
//   console.log(e)
// });

// app.use(express.json())
// app.use(userRouter)
// app.listen(3000, ()=>{console.log('server running on 3000')})


function MyApp({ Component, pageProps }) {


  return <AppProvider>

    <NavBar/>
    <Component {...pageProps} />
  </AppProvider>
}

export default MyApp
