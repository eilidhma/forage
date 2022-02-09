import '../styles/globals.css';
import AppProvider from '../utils/provider';
import { useState } from 'react';
import LoginUI from '../comps/LoginUI';
import NavBar from '../comps/NavBar';

function MyApp({ Component, pageProps }) {

  const [isVisible, setIsVisible] = useState(false);

  return <AppProvider>

    <NavBar 
        onLoginClick={()=>setIsVisible(true)}
    />

      <LoginUI 
        visibility={isVisible === true ? "visible" : "hidden"} 
        onCancelClick={()=>{setIsVisible(false)}}
      />
      
    <Component {...pageProps} />
  </AppProvider>
}

export default MyApp
