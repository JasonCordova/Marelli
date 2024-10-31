import { useEffect, useState } from 'react';
import {collection, getDocs, where, query} from 'firebase/firestore/lite';
import Item from './Item';
import './index.css';
import { db } from '../../firebaseConfig';
import { getFirestore } from 'firebase/firestore';
import { documentId } from 'firebase/firestore';

const Cart = (props) => {

    const [cartItems, setCartItems] = useState([]);
    const [initialCart, setInitialCart] = useState([]);
    const [total, setTotal] = useState(0);

    function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift(); 
        return null;
    }

    async function getCartItems(array){

        if (array.length != 0){

            const col = collection(db, "items");
            const q = query(col, where('__name__', 'in', array))
            const snapshot = await getDocs(q);
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            setCartItems(items);

        }        

    }

    useEffect(() => {

        var cart = getCookie("cart");
        var cartArray = cart ? JSON.parse(cart) : {};

        setInitialCart(cartArray);
        getCartItems(Object.keys(cartArray));

    }, []);

    const updateTotal = () => {

        var cart = getCookie("cart");
        var cartArray = cart ? JSON.parse(cart) : {};
    
        let totalPrice = 0;
    
        if (cartItems.length > 0){
            for (var i in cartItems){
                if (cartArray[cartItems[i].id])
                    totalPrice += cartItems[i].currentPrice * cartArray[cartItems[i].id];
            }
        }
    
        setTotal(totalPrice);
    };

    return (
        <div className="cart-banner">
            {cartItems.length > 0 ?
            <div className="label-wrapper">
                <div className="label-title">My Cart</div>
                <div className="label-desc">Review your cart or edit quantities before checking out.</div>
            </div> : <></>}

            {cartItems.length > 0 ?
            
            <div className="cart">
                {cartItems.map((e) => {
                    return (
                        <Item data={e} initialQuantity={initialCart[e.id]} updateCartQuantity={props.updateCartNumber} updateTotal={updateTotal}/>
                    )
                })}
                <div className="total-cart-price">
                    <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                        <span className="total-text">TOTAL</span>
                        <span className="total-price-text">${total.toFixed(2)}</span>
                    </div>
                    <div className="checkout-button">Checkout</div>
                </div>
            </div> : <div className="empty-bag">
                <span className="empty-cart-text">Your shopping bag is empty.</span>    
                <a href="shop" className="goto-shop">Start Shopping</a>
            </div>}

        </div>
    )

}

export default Cart;