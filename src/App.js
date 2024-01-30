import Header from "./components/Header";
import {Routes, Route} from 'react-router-dom';
import PageNotFound from './components/PageNotFound/index.js';
import Home from './components/Home/index.js';
import Register from './components/Register/index.js';
import Profile from './components/Profile/index.js';
import Shop from './components/Shop/index.js';
import CreateItem from "./components/CreateItem/index.js";
import Product from './components/Product/index.js';
import Footer from './components/Footer/index.js';
import Lenis from "@studio-freight/lenis";

function App() {

  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="*" element={<PageNotFound/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/create_item' element={<CreateItem/>}/>
        <Route path='/products/:id' element={<Product/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
