import { useParams } from "react-router-dom";
import { collection, doc, query, where, getDoc } from "firebase/firestore";
import './index.css';

import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

//const imageLink = 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-double-breasted-tailored-wool-jacket--HQJ63WGRN900_PM2_Front%20view.png?wid=490&hei=490';
const heart = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 428 387"><path d="M108 1.42c26.12-3.18 52.87 4.18 76 15.83 6.82 3.43 14.99 8.71 21 13.42 2.2 1.72 6.24 5.85 9 5.85 2.71 0 10.22-6.84 13-8.8 8.86-6.24 19.89-12.72 30-16.66C306.46-8.23 361.4-.8 397.83 40c17.94 20.09 29.13 53.14 29.17 80v19c-.3 25.39-11.86 58-24.14 80-26.14 46.85-65.24 84.91-107.86 116.87-18.21 13.66-37.21 26.58-57 37.85-4.21 2.4-19.25 11.35-23 11.79-3.71.43-6.92-1.94-10-3.65l-16-8.87c-22.66-13.31-44.19-28.08-65-44.11C73.7 290.15 21.69 234.2 5.89 171 .94 151.19.97 139.92 1 120c.03-20.48 7.02-45.28 17.15-63C27.23 41.13 40.45 27.66 56 18.06 73.41 7.31 88.27 4.29 108 1.42Zm4 20.86c-15.34 2.22-27.01 3.96-41 11.76C21.63 61.57 13.58 124.32 29.02 174 45.99 228.6 90.29 274.37 134 309.2c18.71 14.91 38.49 28.69 59 41 4.5 2.7 17.32 11.59 22 10.95 3.31-.44 18.29-9.78 22-12.1l48-32.92 43-36.3c7.53-6.81 19.94-20.81 26.73-28.83 26.18-30.97 51.07-75.35 51.27-117 .15-32.08-6.19-62.65-30-85.99-31.74-31.1-85.47-32.94-123-11.58-10 5.69-19.68 12.59-27.83 20.74-2.44 2.44-7.72 9.79-11.17 9.79-3.04 0-7.6-5.75-9.58-7.92C198.65 52.68 191.16 46.75 184 42c-20.27-13.43-47.53-21.99-72-19.72Z"/></svg>;
const heartFilled = <svg xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 428 387"> <path d="M 107.00,1.43
      C 132.73,-1.75 158.96,4.90 182.00,16.11
        189.55,19.78 196.27,23.86 203.00,28.89
        205.77,30.97 210.51,35.45 214.00,35.45
        217.69,35.45 224.71,29.03 228.00,26.72
        238.28,19.53 247.38,14.77 259.00,10.20
        303.68,-7.34 361.11,-0.48 394.72,36.04
        406.18,48.50 413.95,62.00 419.33,78.00
        427.82,103.21 427.30,115.04 427.00,141.00
        426.81,157.00 420.55,179.13 414.60,194.00
        399.50,231.78 371.68,269.26 342.00,296.91
        327.67,310.26 312.67,322.87 297.00,334.63
        278.34,348.62 259.25,361.81 239.00,373.42
        234.08,376.24 219.94,384.77 215.00,385.29
        209.54,385.86 195.27,376.72 190.00,373.72
        167.16,360.71 146.00,345.62 125.00,329.87
        108.30,317.34 90.59,301.93 76.01,287.00
        42.70,252.86 13.66,210.38 4.00,163.00
        0.78,147.16 0.82,133.02 1.00,117.00
        1.13,106.01 4.54,90.48 8.00,80.00
        12.40,66.68 16.76,57.38 25.16,46.00
        33.89,34.16 43.47,25.49 56.00,17.81
        73.44,7.12 87.33,4.65 107.00,1.43 Z" />
</svg>
;


const Product = (props) => {

    const {id} = useParams();
    const [item, setItem] = useState(null);
    const [wishState, setWishState] = useState(false);

    const setCookie = (name, value, days) => {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
            expires = "; expires=" + date.toUTCString(); // Set expiration date
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/"; // Add cookie
    }

    function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift(); 
        return null;
    }

    const addToWishlist = () => {

        const cookie = getCookie("wishlist")
        const wishArray = cookie ? JSON.parse(cookie) : [];

        const includesId = wishArray.includes(id);
        includesId ? wishArray.splice(wishArray.indexOf(id), 1) : wishArray.push(id);
        setWishState(!includesId);
        setCookie("wishlist", JSON.stringify(wishArray), 7);

        console.log(wishArray);

    }

    const addToCart = (id) => {

        const cookie = getCookie("cart");
        const cartDict = cookie ? JSON.parse(cookie) : ({});
        cartDict[id] === undefined ? cartDict[id] = 1 : cartDict[id] += 1;
        setCookie("cart", JSON.stringify(cartDict), 7);
        console.log(getCookie("cart"));
        props.updateCartNumber();

    }

    async function getItem(){

        const db = getFirestore();
        const docRef = doc(db, 'items', id.toString());       
        const docSnap = await getDoc(docRef); 
        if (docSnap.exists()) setItem(docSnap.data());
        else setItem(null);

    }

    useEffect(() => {

        getItem();
        const cookie = getCookie("wishlist")
        const wishArray = cookie ? JSON.parse(cookie) : [];
        setWishState(wishArray.includes(id));

        console.log(JSON.parse(getCookie("wishlist")));

    }, [])

    return (
        <div className="item-page">
            <div className="item-image-container">
                <img src={item ? item.image : ""} draggable className="item-image"/>
            </div>
            <div className="item-info-container">
                <div className="item-info">
                    <div className="item-header">
                        <div className="item-name">{item ? item.name : "Loading..."}</div>
                        <div className="item-price">{item ?
                        <>{ item.currentPrice.toFixed(2) != item.retailPrice.toFixed(2) ? 
                            <><span className="current-price">{"$" + item.currentPrice.toFixed(2)}</span><span className='retail'>{"$" + item.retailPrice.toFixed(2)}</span></> 
                            : <span>{"$" + item.currentPrice.toFixed(2)}</span> }</>
                        : "Loading..."}</div>
                    </div>
                    <div className="item-buttons">
                        <div className={`wishlist-button${wishState ? " filled" : ""}`} onClick={() => {addToWishlist();}}>
                            {heartFilled}
                        </div>
                        <div className="cart-button" onClick={() => {addToCart(id)}}>
                            Add to Cart
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Product;