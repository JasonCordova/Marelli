import { db } from "../../firebaseConfig";
import {collection, getDocs, where, query} from 'firebase/firestore/lite';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import './index.css';

//const imageLink = 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-double-breasted-tailored-wool-jacket--HQJ63WGRN900_PM2_Front%20view.png?wid=490&hei=490';

async function getAll(temp){

    const col = collection(db, 'items');
    const snapshot = await getDocs(col);
    const list = snapshot.docs.map(doc => {
        return doc;
    });

    return list;

}

const Shop = () => {

    const {category} = useParams();

    async function getCategory(temp){

        const ref = collection(db, "items");
        var q;

        switch (temp){

            case "women":
                q = query(ref, where("gender", "==", temp));
                break;
            case "men":
                q = query(ref, where("gender", "==", temp));
                break;
            case "accessories":
                q = query(ref, where("category", "==", temp));
                break;
            case "sale":
                q = query(ref, where("stock", ">=", 0));
                break;
            default:
                q = q = query(ref, where("stock", ">=", 0));
                break;

        }

        const querySnapshot = await getDocs(q);
        var onSale = [];

        const list = querySnapshot.docs.map((e) => {

            if (temp === "sale"){

                const retailPrice = e.data().retailPrice;
                const currentPrice = e.data().currentPrice;
                if (retailPrice !== currentPrice) onSale.push(e);

            } else return e;

        });

        if (temp === "sale") return onSale;
        return list;
    }

    useEffect(() => {

        getCategory(category).then((e) => {setItems(e);})

    }, [category]);

    const [items, setItems] = useState(null);

    return (
        <div className="content">
            <div className="shop-info">
                <div className="shop-title">Inventory{category ? ` / ${category.charAt(0).toUpperCase() + category.slice(1)}` : ""}</div>
                <div className="filter-holder"></div>
            </div>
            <div className="shop">

                {(items === null || (items !== null && items.length === 0)) ? 
                    
                    <div className="shop-message">
                        { items !== null && items.length === 0 ? "There are no items in inventory." : "Loading..."}
                    </div> 
                
                : <>
                
                    {items ? items.map((e, i) => {
                         return (
                        <a href={`../products/${e.id}`} className="category" key={i}>
                            <img alt="Product" draggable={false} src={e.data().image} className='category-img'/>
                            <div className="category-info">
                                <div className="category-title">{e.data().name}</div>
                                <div className="category-price">

                                    { e.data().currentPrice.toFixed(2) < e.data().retailPrice.toFixed(2) ? 
                                        <><span className="current-price">{"$" + e.data().currentPrice.toFixed(2).toLocaleString('en-US')}</span><span className='retail'>{"$" + e.data().retailPrice.toFixed(2)}</span></> 
                                        : <span>{"$" + e.data().currentPrice.toFixed(2).toLocaleString('en-US')}</span> 
                                    }

                                </div>
                             </div>
                        </a>
                        );

                    }) : ""}
                    </>
                    
                }

            </div>
        </div>
    )
}

export default Shop;