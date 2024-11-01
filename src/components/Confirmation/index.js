import { useParams } from "react-router-dom";
import "./index.css";
import { useEffect } from "react";

import Bag from './bag.png';

const Confirmation = () => {

    const {id} = useParams();

    useEffect(() => {
        console.log("Hello");
    }, []);

    return (
        <div className="cart-confirmation">
            <img src={Bag}/>
            <div className="confirmation-title">Thank you for your order.</div>
            <div className="order-number">{`Order: #${id}`}</div>
        </div>
    );

}

export default Confirmation;