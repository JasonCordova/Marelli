import './index.css';
import video from '../../adrian_1.mp4';
import {auth, storage} from '../../firebaseConfig.js';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useState, useRef, useEffect} from 'react';
import { db } from '../../firebaseConfig';
import {collection, getDocs, where, query} from 'firebase/firestore/lite';

const camera = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 366 282"><path d="M137 1.15h85c11.03-.1 23.45 4.87 30.21 13.89 3.38 4.51 8.21 17.7 12 19.94C266.29 36.2 269.62 36 272 36h52c18 .09 34 11.88 39.64 29 1.94 5.87 2.35 9.89 2.36 16v155c-.04 26.52-18.49 44.96-45 45H43c-25.48-.3-42.96-20.08-43-45V81c.04-25.19 17.15-44.96 43-45h51c2.38 0 5.71.2 7.79-1.02 3.79-2.24 8.62-15.43 12-19.94 5.29-7.06 14.76-11.7 23.21-13.89Zm4 22.98c-15.88 5.03-13.15 24.05-25.02 32.31-3.9 2.72-8.45 2.55-12.98 2.56H44c-15.22.19-20.98 9.95-21 24v151c0 3.15-.1 5.93.79 9 3.3 11.43 12.4 14.98 23.21 15h274c15.15-.19 21.98-9.67 22-24V83c-.02-15.95-6.7-23.97-23-24h-57c-4.53-.01-9.08.16-12.98-2.56-8.24-5.73-12.3-24.05-18.15-28.8-4.35-3.54-8.59-3.63-13.87-3.51h-77Zm35 51.29c8.68-1.06 17.5.1 26 2 8.23 1.85 17.91 6.12 25 10.67 48.26 30.96 47.74 103.28 0 134.37-16.64 10.83-30.75 12.76-50 12.54-7.2-.09-14.23-2-21-4.34C110.28 214.84 90.69 163 110.89 120c8.87-18.87 27.25-34.66 47.11-40.97 6.32-2.01 11.55-2.63 18-3.61Zm2 22.87c-23.18 3.54-40.69 14.78-48.91 37.71-12.27 34.21 12.27 75.55 49.91 76 13.36.15 22.2-.74 34-7.93 5.27-3.2 11.68-9.24 15.48-14.07 30.4-38.64-1.5-96.29-50.48-91.71Z"/></svg>;

const Profile = () => {

    const [user, setUser] = useState(null);
    const [wishlistItems, setWishlistItems] = useState([]);
    const nameInput = useRef(null);
    const emailInput = useRef(null);
    const hiddenInput = useRef(null);
    const profilePicture = useRef(null);

    const formatDate = (temp) => {
        var newDate = new Date(temp);
        return newDate.toLocaleDateString('en-US');
    }

    function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift(); 
        return null;
    }

    auth.onAuthStateChanged((user) => {
        if (user){
            setUser(user);
            try {
                profilePicture.current.src = user.photoURL;
            } catch (e) {
                console.log(e.message);
            }
        } else {}
            //window.location.href = "/";
    });

    const updateInfo = async (e) => {

        e.preventDefault();

        // Upload imageFile if there is a new file in the hiddenInput

        if (hiddenInput.current.files[0] && nameInput.current.value.trim().length > 2){

            var tempURL = null;
            const imgRef = ref(storage, `userImages/${auth.currentUser.uid}`);
            uploadBytes(imgRef, hiddenInput.current.files[0]).then(() => {
                getDownloadURL(ref(storage, `userImages/${auth.currentUser.uid}`)).then((e) => {
                    tempURL = e;
                }).then(() => {
                    updateProfile(auth.currentUser, {
                        displayName: nameInput.current.value,
                        photoURL: `${tempURL}`,
                    }).then(() => {window.location.href = "/profile"});
                })
            });

        } else if (nameInput.current.value.trim().length > 2){
            updateProfile(auth.currentUser, {
                displayName: nameInput.current.value,
            }).then(() => {window.location.href = "/profile"});
        }

    }

    useEffect(() => {

        var initial = getCookie("wishlist");
        var wishlistArray = initial ? JSON.parse(initial) : [];
        getItems(wishlistArray);

    }, [])

    async function getItems(array){

        if (array.length != 0){

            const col = collection(db, "items");
            const q = query(col, where('__name__', 'in', array))
            const snapshot = await getDocs(q);
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            setWishlistItems(items);

        }        

    }

    return (
        <div className="content">
            <div className="wrapper">
                <video disableRemotePlayback loop={true} muted autoPlay={true} src={video}/>
            </div>
            <div className="page-content">
                <div className="profile-info">
                    <div className="profile-picture-input">
                        <img ref={profilePicture} className="profile-picture">
                        </img>
                        <div className="update-picture" onClick={() => {hiddenInput.current.click();}}>
                            {camera}
                            <input ref={hiddenInput} type="file" accept="image/*" className="hidden-input" onChange={(e) => {
                                var element = URL.createObjectURL(e.target.files[0]);
                                profilePicture.current.src = element;
                            }}></input>
                        </div>
                    </div>
                </div>
                <form className="profile-form" onSubmit={(e) => {updateInfo(e);}}>
                    
                    <div className="row">
                        <div className="profile-input-row">
                            <div className="input-label">Full Name</div>
                            <input ref={nameInput} type="text" defaultValue={user ? user.displayName : ""} className="profile-input"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="profile-input-row">
                            <div className="input-label">Email Address</div>
                            <input ref={emailInput} disabled={true} type="text" defaultValue={user ? user.email : ""} className="profile-input"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="row-cell">
                            <span>Joined</span>
                            <span>{user ? formatDate(user.metadata.creationTime) : ''}</span>
                        </div>
                    </div>

                    <div className="row">
                        <button className='login-button'>Update</button>
                    </div>

                </form>
            </div>
            <div id="wishlist" className="wishlist-wrapper">
                <div className="label-title">My Wishlist</div>
                <div className="label-desc">{`You have ${wishlistItems.length} items in saved items.`}</div>
            </div>
            <div className="wishlist-grid">
                    {wishlistItems.map((e) => {
                        return (
                            <a href={`../products/${e.id}`} className="category">
                            <img alt="Product" draggable={false} src={e.image} className='category-img'/>
                            <div className="category-info">
                                <div className="category-title">{e.name}</div>
                                <div className="category-price">

                                    { e.currentPrice.toFixed(2) < e.retailPrice.toFixed(2) ? 
                                        <><span className="current-price">{"$" + e.currentPrice.toFixed(2).toLocaleString('en-US')}</span><span className='retail'>{"$" + e.retailPrice.toFixed(2)}</span></> 
                                        : <span>{"$" + e.currentPrice.toFixed(2).toLocaleString('en-US')}</span> 
                                    }

                                </div>
                             </div>
                        </a>
                        );
                    })}
                </div>
        </div>
    )
}

export default Profile;