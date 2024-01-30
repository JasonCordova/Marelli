import { useParams } from "react-router-dom";

const Product = () => {

    let {id} = useParams();
    console.log(id);

    return (
        <div></div>
    );

}

export default Product;