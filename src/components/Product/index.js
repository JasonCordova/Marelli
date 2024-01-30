import { useParams } from "react-router-dom";
import { collection, doc, query, where, getDoc } from "firebase/firestore";
import './index.css';

import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

const imageLink = 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-double-breasted-tailored-wool-jacket--HQJ63WGRN900_PM2_Front%20view.png?wid=490&hei=490';
const heart = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 428 387"><path d="M108 1.42c26.12-3.18 52.87 4.18 76 15.83 6.82 3.43 14.99 8.71 21 13.42 2.2 1.72 6.24 5.85 9 5.85 2.71 0 10.22-6.84 13-8.8 8.86-6.24 19.89-12.72 30-16.66C306.46-8.23 361.4-.8 397.83 40c17.94 20.09 29.13 53.14 29.17 80v19c-.3 25.39-11.86 58-24.14 80-26.14 46.85-65.24 84.91-107.86 116.87-18.21 13.66-37.21 26.58-57 37.85-4.21 2.4-19.25 11.35-23 11.79-3.71.43-6.92-1.94-10-3.65l-16-8.87c-22.66-13.31-44.19-28.08-65-44.11C73.7 290.15 21.69 234.2 5.89 171 .94 151.19.97 139.92 1 120c.03-20.48 7.02-45.28 17.15-63C27.23 41.13 40.45 27.66 56 18.06 73.41 7.31 88.27 4.29 108 1.42Zm4 20.86c-15.34 2.22-27.01 3.96-41 11.76C21.63 61.57 13.58 124.32 29.02 174 45.99 228.6 90.29 274.37 134 309.2c18.71 14.91 38.49 28.69 59 41 4.5 2.7 17.32 11.59 22 10.95 3.31-.44 18.29-9.78 22-12.1l48-32.92 43-36.3c7.53-6.81 19.94-20.81 26.73-28.83 26.18-30.97 51.07-75.35 51.27-117 .15-32.08-6.19-62.65-30-85.99-31.74-31.1-85.47-32.94-123-11.58-10 5.69-19.68 12.59-27.83 20.74-2.44 2.44-7.72 9.79-11.17 9.79-3.04 0-7.6-5.75-9.58-7.92C198.65 52.68 191.16 46.75 184 42c-20.27-13.43-47.53-21.99-72-19.72Z"/></svg>;

const Product = () => {

    const {id} = useParams();
    const [item, setItem] = useState(null);

    async function getItem(){

        const db = getFirestore();
        const docRef = doc(db, 'items', id.toString());       
        const docSnap = await getDoc(docRef); 
        if (docSnap.exists()) setItem(docSnap.data());
        else setItem(null);

    }

    useEffect(() => {

        getItem();

    }, [])

    return (
        <div className="item-page">
            <img src={imageLink} className="item-image"/>
            <div className="item-info-container">
                <div className="item-info">
                    <div className="item-header">
                        <div className="item-name">{item ? item.name : ""}</div>
                        <div className="wishlist-button">
                            {heart}
                        </div>
                    </div>
                    <div className="item-price">${item ? item.price.toFixed(2) : ""}</div>
                </div>
            </div>
        </div>
    );

}

export default Product;