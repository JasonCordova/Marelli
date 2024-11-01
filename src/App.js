import Header from "./components/Header";
import {Routes, Route, useParams} from 'react-router-dom';
import PageNotFound from './components/PageNotFound/index.js';
import Home from './components/Home/index.js';
import Register from './components/Register/index.js';
import Profile from './components/Profile/index.js';
import Confirmation from "./components/Confirmation/index.js";
import Shop from './components/Shop/index.js';
import CreateItem from "./components/CreateItem/index.js";
import Product from './components/Product/index.js';
import Footer from './components/Footer/index.js';
import Cart from './components/Cart/index.js'
import Lenis from "@studio-freight/lenis";
import { useEffect, useState} from "react";

function App() {

  const lenis = new Lenis();
  const [cartLength, setCartLength] = useState(0);

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  useEffect(() => {
    
    const cookie = getCookie("cart");
    const cart = cookie ? JSON.parse(cookie) : [];
    updateCartNumber();

  }, []);

  const updateCartNumber = () => {

    const cookie = getCookie("cart");
    const cart = cookie ? JSON.parse(cookie) : [];

    var total = 0;

    Object.keys(cart).map((key) => {
      total += cart[key];
    });

    setCartLength(total);

  }

  function getCookie(name) {
      const value = "; " + document.cookie;
      const parts = value.split("; " + name + "=");
      if (parts.length === 2) return parts.pop().split(";").shift(); 
      return null;
  }

  return (
    <>
      <Header cartLength={cartLength}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="*" element={<PageNotFound/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/shop/:category' element={<Shop/>}/>
        <Route path='/create_item' element={<CreateItem/>}/>
        <Route path='/products/:id' element={<Product updateCartNumber={updateCartNumber}/>}/>
        <Route path='/cart' element={<Cart updateCartNumber={updateCartNumber}/>}/>
        <Route path='/confirmation/:id' element={<Confirmation/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
