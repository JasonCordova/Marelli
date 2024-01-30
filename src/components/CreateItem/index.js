import {useRef} from 'react';
import {collection, getDocs, doc, setDoc, deleteDoc, addDoc} from 'firebase/firestore/lite';
import { db, storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CreateItem = () => {

    const nameInput = useRef(null);
    const priceInput = useRef(null);
    const stockInput = useRef(null);
    const imageInput = useRef(null);

    const addItem = async () => {
        
        const imgArray = [...Array.from(imageInput.current.files)];
        const urlArray = [];

        for (var i in imgArray){

            const imgRef = ref(storage, `storeImages/${imgArray[i].name}`)
            uploadBytes(imgRef, imgArray[i]).then((e) => {
                getDownloadURL(e).then((e) => {console.log(e);})
            });
        }

        var itemName = nameInput.current.value.replaceAll(" ", "-").toLowerCase();

        await setDoc(doc(db, "items", itemName), ({
            name: nameInput.current.value,
            price: parseFloat(priceInput.current.value),
            stock: parseInt(stockInput.current.value),
            images: [],
        }));

    }


    return (
<>
            <form className="login-form" onSubmit={(e) => {e.preventDefault(); addItem();}}>

                <div className="input-row">
                    <div className="label">Item Name*</div>
                    <input ref={nameInput} required text="text" name='item_name' className="login-input"></input>
                </div>

                <div className="input-row">
                    <div className="label">Price*</div>
                    <input ref={priceInput} required text="number" name='item_price' className="login-input"></input>
                </div>

                <div className="input-row">
                    <div className="label">Stock*</div>
                    <input ref={stockInput} required text="number" name='item_stock' className="login-input"></input>
                </div>

                <div className="input-row">
                    <div className="label">Images*</div>
                    <input ref={imageInput} required type='file' multiple name='item_stock' className="login-input"></input>
                </div>

                <div className="input-row">
                    <button className="login-button">Create Item</button>
                </div>

            </form>
            
        </>
    )

}

export default CreateItem;