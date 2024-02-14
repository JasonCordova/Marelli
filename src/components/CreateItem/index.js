import {useRef} from 'react';
import {collection, getDocs, doc, setDoc, deleteDoc, addDoc} from 'firebase/firestore/lite';
import { db, storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './index.css';

const CreateItem = () => {

    const nameInput = useRef(null);
    const currentPriceInput = useRef(null);
    const retailPriceInput = useRef(null);
    const stockInput = useRef(null);
    const imageInput = useRef(null);
    const genderInput = useRef(null);
    const categoryInput = useRef(null);

    const addItem = async () => {
        
        var itemName = nameInput.current.value.replaceAll(" ", "-").toLowerCase();

        const imgRef = ref(storage, `storeImages/${itemName}`);

        uploadBytes(imgRef, imageInput.current.files[0]).then(() => {
            getDownloadURL(ref(storage, `storeImages/${itemName}`)).then((e) => {
                
                setDoc(doc(db, "items", itemName), ({
                    name: nameInput.current.value,
                    retailPrice: parseFloat(retailPriceInput.current.value),
                    currentPrice: parseFloat(currentPriceInput.current.value),
                    stock: parseInt(stockInput.current.value),
                    category: categoryInput.current.value,
                    gender: genderInput.current.value,
                    image: e,
                })).then(() => {window.location.href = `/products/${itemName}`});

            })
        });

    }


    return (
<>
            <form className="login-form" onSubmit={(e) => {e.preventDefault(); addItem();}}>

                <div className="input-row">
                    <div className="label">Item Name*</div>
                    <input ref={nameInput} required type="text" name='item_name' className="login-input"></input>
                </div>

                <div className="input-row">
                    <div className="label">Retail Price*</div>
                    <input ref={retailPriceInput} required type="number" step="0.01" name='retail_price' className="login-input"></input>
                </div>

                <div className="input-row">
                    <div className="label">Current Price*</div>
                    <input ref={currentPriceInput} required type="number" step="0.01" name='current_price' className="login-input"></input>
                </div>

                <div className="input-row">
                    <div className="label">Stock*</div>
                    <input ref={stockInput} required type="number" name='item_stock' className="login-input"></input>
                </div>

                <div className="input-row">
                    <div className="label">Category*</div>
                    <select ref={categoryInput} required name='category' defaultValue={"accessories"} className="login-input">
                        <option value="clothing">Clothing</option>
                        <option value="accessories">Accessories</option>
                    </select>
                </div>

                <div className="input-row">
                    <div className="label">Image*</div>
                    <input ref={imageInput} required type='file' name='image' className="login-input"></input>
                </div>

                <div className="input-row">
                    <div className="label">Gender</div>
                    <select ref={genderInput} required name='gender' defaultValue={""} className="login-input">
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="">Unisex</option>
                    </select>
                </div>

                <div className="input-row">
                    <button className="login-button">Create Item</button>
                </div>

            </form>
            
        </>
    )

}

export default CreateItem;