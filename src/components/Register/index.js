import './index.css';
import {useRef, useState} from 'react';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const hidePassword = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 218 174"><path d="M24.32 1.08C29.53-.03 32.56 4.57 36 8l24 24 100 100 29 29c2.13 2.15 9.88 8.98 4.68 11.92-3.62 2.05-8.43-3.68-10.68-5.92l-24-24L57 41 29 13c-3.36-3.38-8.9-7.31-4.68-11.92ZM94 26.21h23c25.97-.09 55.02 13.23 75 29.19 6.9 5.51 18.63 16.11 23 23.6 4.53 7.76 1.39 14.75-3.76 21-7.34 8.9-16.74 17.42-26.24 23.98-3.15 2.17-12.36 8.8-15.92 8.48-3.53-.31-5.86-4.67 0-8.84l8.92-5.65c8.01-5.48 15.22-12.03 21.99-18.97 2.52-2.58 8.16-8.24 8.16-12 0-2.47-2.13-5.16-3.62-7-3.07-3.82-10.72-11.31-14.53-14.57-24.08-20.62-51.24-31.48-83-31.43-7.01.01-14.13 1.02-21 2.4l-9 2.03c-3.3.39-6.65-1.47-5.34-5.21.89-2.54 4.04-3.23 6.34-3.84l16-3.17ZM47 41.75c5.98-.47 7.09 3.95 3.57 7.35L38 57.43C31.15 62.34 24.92 68.01 19 74c-2.72 2.75-9.15 8.98-9.15 13 0 3.24 4.13 7.72 6.24 10 6.66 7.19 14.88 14.65 22.91 20.28 22.32 15.63 46.85 23.03 74 22.72l28-4.28c3.27-.38 6.69 1.21 5.34 5.06-.97 2.77-4.84 3.47-7.34 4.09-7.5 1.87-15.27 3.12-23 3.13h-14c-28.53-.04-58.56-14.51-80-32.59C13.3 108.07-1.54 95.79 1.39 83 3.2 75.1 18.56 61.36 25 56.2c6.29-5.04 14.55-11.44 22-14.45Zm59 4.68c18.75-1.91 37.58 11.32 42.1 29.57 2.09 8.43 2.21 13.56 0 22-.77 2.93-2.34 7.37-6.06 7.37-3.65 0-3.82-3.72-3.26-6.37l1.9-7c1.63-9.81-1.93-19.87-8.77-26.96-6.97-7.22-15.91-10.75-25.91-9.95-5.31.43-9.85 3.25-12.85 2.22-3.33-1.14-3.08-4.64-.83-6.8 2.75-2.64 9.91-3.47 13.68-4.08ZM74.13 69.08c3.31-.68 5.45-.07 5.4 3.94L77.09 84c-.94 11.77 4.31 22.36 13.91 29.21a31.29 31.29 0 0 0 22 5.61c4.45-.54 8.98-3.12 11.85-2.13 3.4 1.17 3.64 5.46-.91 8.01-2.22 1.25-6.38 1.95-8.94 2.38-20.86 3.5-41.28-10.22-45.55-31.08-1.61-7.85-2.12-21.42 4.68-26.92Z"/></svg>;
const showPassword = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 218 123"><path d="M99 .21h14c29.21.14 61.41 13.53 83 32.96 7.84 7.05 21.74 18.54 20.9 29.83-.65 8.83-13.53 19.99-19.9 25.91-24.71 22.98-58.61 34.48-92 34.09-30.15-.36-64.52-15.06-86-36.01C12.91 81.04 1.75 71.75 1.1 63 .28 51.99 10.87 44.05 18 37 35.87 19.34 59.42 7.39 84 2.45L99 .21Zm8 8.09-25 3.12c-19.86 4.45-39.82 15.07-55 28.53-6.13 5.44-8.49 7.68-13.83 14.05-2.16 2.58-4.42 5.4-3.61 9C10.77 68.36 22.65 79.09 27 82.95 45.55 99.4 74.8 113.7 100 114h16c25.35-.04 54-12.98 73-29.28 6.74-5.79 9.11-8.01 14.95-14.72 2.42-2.79 5.39-5.98 4.49-10-1.27-5.61-13.89-16.93-18.44-20.95-21.06-18.6-46.26-28.23-74-30.14-3.94-.27-4.62-.83-9-.61Zm-5 13.16c7.65-1.06 13.67-.58 21 1.9 5.41 1.82 8.79 3.82 13 7.73 25.02 23.27 13.74 64.37-20 70.45C93.83 105.53 72.32 90.35 69 68c-.39-2.66-.88-5.31-.68-8 .93-12.17 5.45-21.7 14.68-29.82 5.87-5.16 11.53-7.06 19-8.72Zm4 7.83C93.52 31.36 84.2 36.77 79.26 49 70.64 70.3 87.15 96.06 111 93.7c5.23-.52 10.54-1.8 15-4.67 28.37-18.26 14.04-62.66-20-59.74Z"/></svg>;

const Register = () => {

    const email = useRef();
    const password = useRef();
    const firstname = useRef();
    const lastname = useRef();

    const [passwordHidden, setPasswordHidden] = useState(true);

    const registerAccount = async () => {
        
        try {
            await createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((e) => {
                updateProfile(e.user, {
                    displayName: `${firstname.current.value} ${lastname.current.value}`,
                    photoURL: `https://firebasestorage.googleapis.com/v0/b/marelli-ad154.appspot.com/o/M.png?alt=media&token=a0dd08e1-393f-48de-9aaf-5e2c8d5bd784`
                }).then(() => {window.location.href = "/";});
            });
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <>
            <form className="login-form" onSubmit={(e) => {e.preventDefault(); registerAccount();}}>

                <div className="input-row">
                    <div className="label">Email*</div>
                    <input ref={email} required text="text" name='email' className="login-input"></input>
                </div>

                <div className="input-row">
                    <div className="label">Password*</div>
                    <div className="password-input">
                        <input ref={password} required maxLength={40} text="text" type={passwordHidden ? "password" : "text"} className="login-input"></input>
                        <div className="show-password" onClick={() => { setPasswordHidden(!passwordHidden); }}>
                            {passwordHidden ? hidePassword : showPassword}
                        </div>
                    </div>
                </div>

                <div className="input-row">
                    <div className="label">First Name*</div>
                    <input ref={firstname} required text="text" name='first_name' className="login-input"></input>
                </div>

                <div className="input-row">
                    <div className="label">Last Name*</div>
                    <input ref={lastname} required text="text" name='last_name' className="login-input"></input>
                </div>

                <div className="input-row">
                    <button className="login-button">Sign Up</button>
                </div>

            </form>
            
        </>
    )

}

export default Register;