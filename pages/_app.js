import '../styles/globals.css';
import AppProvider from '../utils/provider';
import NavBar from '../comps/NavBar';
import { useState, useEffect } from 'react'
import { comp_themes, themes } from "../utils/variables";
import { useTheme } from "../utils/provider";
import { useItemsView } from '../utils/provider';
import axios from 'axios';
import HamMenu from '../comps/HamMenu';

function MyApp({ Component, pageProps }) {


  return <AppProvider>

    <NavBar/>
    <HamMenu/>
    <Component {...pageProps} />
  </AppProvider>
}

export default MyApp
