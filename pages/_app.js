import '../styles/globals.css';
import AppProvider from '../utils/provider';
import NavBar from '../comps/NavBar';
import HamMenu from '../comps/HamMenu';

function MyApp({ Component, pageProps }) {
  return <AppProvider>
    <NavBar/>
    <HamMenu/>
    <Component {...pageProps} />
  </AppProvider>
}

export default MyApp;
