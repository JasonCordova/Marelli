import "./index.css"
import { useEffect, useState} from 'react';

const plus = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.128 23.088"><path d="M13.54 23.092v-9.22h8.592V9.216H13.54V0H8.592v9.216H0v4.656h8.592v9.22Z"/></svg>;
const minus = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.4 3.8"><path d="M12.4 3.8V0H0v3.8Z"/></svg>;
const max = 10;

const Item = (props) => {

    function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift(); 
        return null;
    }

    const setCookie = (name, value, days) => {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
            expires = "; expires=" + date.toUTCString(); // Set expiration date
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/"; // Add cookie
    }


    const [quantity, setQuantity] = useState(1);

    useEffect(() => {

        setQuantity(props.initialQuantity);

    }, []);

    useEffect(() => {

        const cookie = getCookie("cart");
        const cartDict = cookie ? JSON.parse(cookie) : ({});
        cartDict[props.data.id] = quantity
        if (quantity == 0)
            delete cartDict[props.data.id]
        setCookie("cart", JSON.stringify(cartDict), 7);
        props.updateCartQuantity();
        props.updateTotal();

    }, [quantity, props])

    return (
        <div className="cart-item">
            <a className="item-left" href={`/products/${props.data.id}`}>
                <img className="item-img" src={props.data.image}/>
            </a>
            <div className="item-right">
                <div className="cart-item-details">
                    <div className="card-item-name">{props.data.name}</div>
                    <div className="card-item-category">{props.data.category}</div>
                </div>
                <div className="cart-item-quantity">
                    <div className="quantity-button" onClick={() => {setQuantity(quantity > 0 ? quantity - 1 : 0)}}>{minus}</div>
                    <div className="quantity-span">{quantity}</div>
                    <div className="quantity-button" onClick={() => {setQuantity(quantity < max ? quantity + 1 : max)}}>{plus}</div>
                </div>
                <div className="cart-item-total">
                    <div className="cart-total">${(props.data.currentPrice * quantity).toFixed(2)}</div>
                    <div className="cart-unit-price">${props.data.currentPrice}/item</div>
                </div>
                    
            </div>
        </div>
    )

}

export default Item;