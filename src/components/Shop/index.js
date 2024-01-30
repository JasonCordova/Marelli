import { db } from "../../firebaseConfig";
import {collection, getDocs} from 'firebase/firestore/lite';
import { useEffect, useState } from "react";
import Filter from './Filter/index.js';
import './index.css';

const imageLink = 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-double-breasted-tailored-wool-jacket--HQJ63WGRN900_PM2_Front%20view.png?wid=490&hei=490';

async function getAll(){

    const col = collection(db, 'items');
    const snapshot = await getDocs(col);
    const list = snapshot.docs.map(doc => {
        return doc;
    });

    return list;

}


const Shop = () => {

    useEffect(() => {getAll().then((e) => {setItems(e);})}, []);
    const [items, setItems] = useState([]);

    const temp =             <div className="filter-holder">
    <Filter title="Sort By" options={['Recommended', 'Newest', 'Price: Low to High', 'Price: High to Low']}></Filter>
    <Filter title="Gender" options={['Male', 'Female', 'Unisex']}></Filter>
    <Filter title="Category" options={['Jackets', 'Jeans', 'Shirts', 'Sweaters']}></Filter>
</div>;

    return (
        <div className="content">
            <div className="shop-info">
                <div className="shop-title">AW23 Collection</div>
                <div className="filter-holder"></div>
            </div>
            <div className="shop">

                {items.map((e, i) => {
                    return (
                    <a href={`products/${e.id}`} className="category" key={i}>
                        <img draggable={false} src={imageLink} className='category-img'/>
                        <div className="category-info">
                            <div className="category-title">{e.data().name}</div>
                            <div className="category-price">${e.data().price.toFixed(2)}</div>
                        </div>
                    </a>
                    );

                })}
            </div>
        </div>
    )
}

export default Shop;