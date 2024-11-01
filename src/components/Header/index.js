import './index.css';
import { auth } from '../../firebaseConfig';
import {useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut} from 'firebase/auth';

const logo = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.032 34.08"><path d="M6.864 34.08V8.016l8.688 26.064h5.616l8.64-26.016V34.08h6.72V0h-9.7l-8.3 25.248L10.176 0H0v34.08Zm78.576 0L72.528 0H64.8L51.888 34.08h7.2l2.592-7.3h13.728L78 34.08ZM68.54 7.44l4.848 13.584h-9.644Zm39.22 26.64v-12.1h5.808l7.728 12.1h7.968l-8.5-12.816a9.828 9.828 0 0 0 7.3-9.984v-.576c0-6.96-5.232-10.7-12.336-10.7H100.8V34.08Zm0-28.224h7.248c3.36 0 5.76 1.44 5.76 4.848v.576c0 3.36-2.4 4.848-5.76 4.848h-7.248Zm61.536 28.224v-5.808h-17.808V19.58h15.888v-5.76h-15.888V5.804h17.472V0h-24.48v34.08Zm37.2 0v-5.808h-13.488V0h-7.1v34.08Zm37.344 0v-5.808h-13.488V0h-7.1v34.08Zm24.192 0V0h-7.1v34.08Z"/></svg>;

const menu = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 468 246"><path d="M8.04 1.65 56 1h396c3.24.01 6.91-.21 9.82 1.45 6.43 3.69 6.82 13.42 1.07 18.12-3.36 2.75-6.84 2.42-10.89 2.43H17c-4.21-.01-8.38.26-11.89-2.51C-1.41 15.36-.32 5.44 8.04 1.65ZM8 112.74c5.27-1.28 11.54-.74 17-.74h426c3.71.01 7.69-.22 10.96 1.85 6.74 4.28 6.59 14.06 0 18.41-3.04 2.01-6.49 1.73-9.96 1.74H17c-4.21-.01-8.38.26-11.89-2.51-7.13-5.61-4.5-14.8 2.89-18.75Zm0 111c5.27-1.28 11.54-.74 17-.74h426c3.71.01 7.69-.22 10.96 1.85 6.65 4.23 6.43 13.99.71 18.14-3.1 2.26-7.03 2-10.67 2.01H16c-3.64-.01-7.57.25-10.67-2.01-6.44-4.67-5.93-14.65 2.67-19.25Z"/></svg>;
const search = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 562 626"><path d="m382 454-15 8.69c-12.53 6.8-25.56 12.83-39 17.62-48.58 17.3-104.81 17.91-154 2.81-26.45-8.13-51.72-20.87-74-37.27-18.78-13.84-35.61-30.19-49.63-48.85-65.48-87.18-67.15-202.47-5.35-292C62.34 79.93 84.71 58.86 110 42.18c82.74-55.32 191.34-54.93 274 0 22.7 15.31 44.25 35.95 60.52 57.82 27.31 36.7 44.23 81.38 47.57 127l.91 12v18l-.91 10c-2.61 37.29-13.55 71.58-32.09 104-7.09 12.39-15.3 24.03-24.43 35-2.14 2.57-10.54 11.18-10.53 14 .02 2.63 5.67 7.83 7.54 10l23.29 27 59.41 69 32 38c8.56 12.24 19.82 37.32 12.27 52-9.6 18.66-34.83 4.4-45.55-5.17l-6.91-6.83-23.37-27-63.85-74-24.95-29c-5.06-6.07-10.67-12.28-12.92-20ZM230 44.14c-23.88 3.58-34.46 4.28-58 12.91C123.6 74.8 82.4 111.94 59.37 158c-36.45 72.89-23.78 163.57 30.8 224 24.41 27.03 55.34 46.84 89.83 58.33 17.19 5.73 40.89 10.45 59 10.67 38.06.44 65.22-5.32 100-20.86 21.59-9.65 41.42-25.56 58-42.14 16.4-16.4 29.71-35.89 39.3-57 9.35-20.58 17.66-49.32 17.7-72v-25c-.15-12.13-4.21-31.19-7.58-43C426.84 122.37 372.16 70.87 304 51.43c-24.06-6.87-44.3-7.72-69-7.29h-5Z"/></svg>;
const profile = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 231.702 226.553"><path d="M0 226.553c0-9.928.579-18.384 3.128-28.062 4.415-16.755 14.643-32.513 27.25-44.258a117.067 117.067 0 0 1 24.2-17.192 21 21 0 0 1 3.583-1.607 118.577 118.577 0 0 1 25.882-8.585 65.781 65.781 0 0 1-34.979-41.891c-1.107-3.979-2.461-10.6-2.466-14.674v-6.952c.007-4.609 1.691-12.81 3.1-17.249A66.972 66.972 0 0 1 85.215 6 66.777 66.777 0 0 1 106.841.237L109.415 0h6.694c4.595.008 12.82 1.694 17.248 3.1 15.854 5.022 30.276 16.863 37.912 31.657l1.925 3.6a61.082 61.082 0 0 1 3.641 10.04 71.181 71.181 0 0 1 2.371 13.387l.234 2.575v4.376l-.234 3.089c-1.015 14.52-7.445 29.867-17.54 40.419a70.909 70.909 0 0 1-9.773 8.645l-6.951 4.743 7.209 1.949A106.738 106.738 0 0 1 164.6 132c.935.312 1.523.526 1.73.6a5.492 5.492 0 0 1 1.471.816q2.765 1.275 5.455 2.689l11.586 6.649c20.15 13.434 36.92 32.9 43.655 56.507 2.616 9.16 3.2 17.843 3.2 27.29Zm59.986-79.471a106.414 106.414 0 0 0-18.794 12.826c-11.783 10.13-21.283 23.211-26.126 38.068a91.63 91.63 0 0 0-2.9 12.1l-.584 5.149h208.531l-1.085-7.209a77.473 77.473 0 0 0-5.552-16.734c-10.171-21.682-30.52-39.07-52.319-48.433q-1.915-.822-3.864-1.567c-14.519-4.15-56.7-13.522-94.525 4.145a25.783 25.783 0 0 1-2.782 1.654Zm44.28-135.169a62.425 62.425 0 0 0-12.615 3.537 56 56 0 0 0-30.523 31.921 58.017 58.017 0 0 0-3.37 19.236l.168 3.161c.02 13.275 7.251 27.98 16.734 37.062a55.5 55.5 0 0 0 15.962 10.643c4.8 2.166 12.764 4.495 18.021 4.557h8.239c7.653-.013 17.982-3.707 24.457-7.674a56.777 56.777 0 0 0 13.275-11.119 57.938 57.938 0 0 0 9.484-15.447 56.188 56.188 0 0 0-10.7-58.955 54.42 54.42 0 0 0-16.69-12.167c-5.95-2.878-13.946-5.259-20.6-5.3h-7.209Z"/></svg>;
const cart = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 512"><path d="M108 116c0-27.56-2.59-44.71 11.87-70 32.83-57.41 113.28-61.3 153.61-10 10.76 13.68 18.49 33.51 18.52 51v29c24.73 0 46.33-3.98 63.71 18 10.32 13.05 9.96 26.49 11.46 42l3.92 44 2.74 28 7 78 7.89 88 2.45 30c2.24 23.19 6.08 42.1-15.17 58.47-3.32 2.56-8.07 4.97-12 6.47-6.62 2.51-10 3.05-17 3.06H53c-21.55-.03-41.6-14.12-45.77-36-.37-3.33-.27-7.57 0-11l1.68-21 4.92-55 14-157 5-56c1.36-14.08 1.06-26.56 9.27-39 16.57-25.11 40.02-21 65.9-21Zm157 0c0-21.4 2.41-37.5-8.87-57-22.05-38.07-78.1-41.91-105.66-8C133.28 72.15 136 90.89 136 116h129Zm-130 28v59c-.02 4.2.08 7.4-2.51 10.98-8.94 12.38-24.28 5.97-24.49-8.98v-52c0-1.99.23-5.81-1.02-7.4-1.47-1.86-4.85-1.58-6.98-1.6H86c-3.45.01-6.65-.05-10 .94-14.96 4.42-13.83 19.84-15.28 32.06l-1.89 22-1.74 16-4.92 55-6.34 73-6.92 78L35 468c.19 13.7 11.46 16.98 23 17h285c8.07-.1 18.15-3.15 20.78-12 .32-1.93.24-5.89 0-8l-1.61-20-4-45-9.34-107-4-45-2.86-31-2.88-31c-.98-13.42.16-35.12-15.09-40.74-3.53-1.3-7.3-1.25-11-1.26h-15c-1.95.04-4.63-.1-5.98 1.6-1.25 1.59-1.02 5.41-1.02 7.4v52c-.22 15.51-15.93 20.34-24.2 9.82-3.05-3.89-2.79-7.2-2.8-11.82v-51c-.06-8.13-1.27-7.98-9-8H135Z"/></svg>;
const close = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.52 29.517"><path d="m26.068 28.897-11.309-11.31-11.311 11.31a2.036 2.036 0 0 1-2.875.049 2.035 2.035 0 0 1 .049-2.876l11.309-11.31L.617 3.446A2.031 2.031 0 0 1 .574.574a2.026 2.026 0 0 1 2.871.044l11.314 11.314L26.073.618a2.026 2.026 0 0 1 2.871-.044 2.026 2.026 0 0 1-.045 2.872L17.585 14.76l11.311 11.31a2.032 2.032 0 0 1 .049 2.876 1.969 1.969 0 0 1-1.395.57 2.1 2.1 0 0 1-1.482-.619Z"/></svg>;

const hidePassword = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 218 174"><path d="M24.32 1.08C29.53-.03 32.56 4.57 36 8l24 24 100 100 29 29c2.13 2.15 9.88 8.98 4.68 11.92-3.62 2.05-8.43-3.68-10.68-5.92l-24-24L57 41 29 13c-3.36-3.38-8.9-7.31-4.68-11.92ZM94 26.21h23c25.97-.09 55.02 13.23 75 29.19 6.9 5.51 18.63 16.11 23 23.6 4.53 7.76 1.39 14.75-3.76 21-7.34 8.9-16.74 17.42-26.24 23.98-3.15 2.17-12.36 8.8-15.92 8.48-3.53-.31-5.86-4.67 0-8.84l8.92-5.65c8.01-5.48 15.22-12.03 21.99-18.97 2.52-2.58 8.16-8.24 8.16-12 0-2.47-2.13-5.16-3.62-7-3.07-3.82-10.72-11.31-14.53-14.57-24.08-20.62-51.24-31.48-83-31.43-7.01.01-14.13 1.02-21 2.4l-9 2.03c-3.3.39-6.65-1.47-5.34-5.21.89-2.54 4.04-3.23 6.34-3.84l16-3.17ZM47 41.75c5.98-.47 7.09 3.95 3.57 7.35L38 57.43C31.15 62.34 24.92 68.01 19 74c-2.72 2.75-9.15 8.98-9.15 13 0 3.24 4.13 7.72 6.24 10 6.66 7.19 14.88 14.65 22.91 20.28 22.32 15.63 46.85 23.03 74 22.72l28-4.28c3.27-.38 6.69 1.21 5.34 5.06-.97 2.77-4.84 3.47-7.34 4.09-7.5 1.87-15.27 3.12-23 3.13h-14c-28.53-.04-58.56-14.51-80-32.59C13.3 108.07-1.54 95.79 1.39 83 3.2 75.1 18.56 61.36 25 56.2c6.29-5.04 14.55-11.44 22-14.45Zm59 4.68c18.75-1.91 37.58 11.32 42.1 29.57 2.09 8.43 2.21 13.56 0 22-.77 2.93-2.34 7.37-6.06 7.37-3.65 0-3.82-3.72-3.26-6.37l1.9-7c1.63-9.81-1.93-19.87-8.77-26.96-6.97-7.22-15.91-10.75-25.91-9.95-5.31.43-9.85 3.25-12.85 2.22-3.33-1.14-3.08-4.64-.83-6.8 2.75-2.64 9.91-3.47 13.68-4.08ZM74.13 69.08c3.31-.68 5.45-.07 5.4 3.94L77.09 84c-.94 11.77 4.31 22.36 13.91 29.21a31.29 31.29 0 0 0 22 5.61c4.45-.54 8.98-3.12 11.85-2.13 3.4 1.17 3.64 5.46-.91 8.01-2.22 1.25-6.38 1.95-8.94 2.38-20.86 3.5-41.28-10.22-45.55-31.08-1.61-7.85-2.12-21.42 4.68-26.92Z"/></svg>;
const showPassword = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 218 123"><path d="M99 .21h14c29.21.14 61.41 13.53 83 32.96 7.84 7.05 21.74 18.54 20.9 29.83-.65 8.83-13.53 19.99-19.9 25.91-24.71 22.98-58.61 34.48-92 34.09-30.15-.36-64.52-15.06-86-36.01C12.91 81.04 1.75 71.75 1.1 63 .28 51.99 10.87 44.05 18 37 35.87 19.34 59.42 7.39 84 2.45L99 .21Zm8 8.09-25 3.12c-19.86 4.45-39.82 15.07-55 28.53-6.13 5.44-8.49 7.68-13.83 14.05-2.16 2.58-4.42 5.4-3.61 9C10.77 68.36 22.65 79.09 27 82.95 45.55 99.4 74.8 113.7 100 114h16c25.35-.04 54-12.98 73-29.28 6.74-5.79 9.11-8.01 14.95-14.72 2.42-2.79 5.39-5.98 4.49-10-1.27-5.61-13.89-16.93-18.44-20.95-21.06-18.6-46.26-28.23-74-30.14-3.94-.27-4.62-.83-9-.61Zm-5 13.16c7.65-1.06 13.67-.58 21 1.9 5.41 1.82 8.79 3.82 13 7.73 25.02 23.27 13.74 64.37-20 70.45C93.83 105.53 72.32 90.35 69 68c-.39-2.66-.88-5.31-.68-8 .93-12.17 5.45-21.7 14.68-29.82 5.87-5.16 11.53-7.06 19-8.72Zm4 7.83C93.52 31.36 84.2 36.77 79.26 49 70.64 70.3 87.15 96.06 111 93.7c5.23-.52 10.54-1.8 15-4.67 28.37-18.26 14.04-62.66-20-59.74Z"/></svg>;

const heart = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 428 387"><path d="M108 1.42c26.12-3.18 52.87 4.18 76 15.83 6.82 3.43 14.99 8.71 21 13.42 2.2 1.72 6.24 5.85 9 5.85 2.71 0 10.22-6.84 13-8.8 8.86-6.24 19.89-12.72 30-16.66C306.46-8.23 361.4-.8 397.83 40c17.94 20.09 29.13 53.14 29.17 80v19c-.3 25.39-11.86 58-24.14 80-26.14 46.85-65.24 84.91-107.86 116.87-18.21 13.66-37.21 26.58-57 37.85-4.21 2.4-19.25 11.35-23 11.79-3.71.43-6.92-1.94-10-3.65l-16-8.87c-22.66-13.31-44.19-28.08-65-44.11C73.7 290.15 21.69 234.2 5.89 171 .94 151.19.97 139.92 1 120c.03-20.48 7.02-45.28 17.15-63C27.23 41.13 40.45 27.66 56 18.06 73.41 7.31 88.27 4.29 108 1.42Zm4 20.86c-15.34 2.22-27.01 3.96-41 11.76C21.63 61.57 13.58 124.32 29.02 174 45.99 228.6 90.29 274.37 134 309.2c18.71 14.91 38.49 28.69 59 41 4.5 2.7 17.32 11.59 22 10.95 3.31-.44 18.29-9.78 22-12.1l48-32.92 43-36.3c7.53-6.81 19.94-20.81 26.73-28.83 26.18-30.97 51.07-75.35 51.27-117 .15-32.08-6.19-62.65-30-85.99-31.74-31.1-85.47-32.94-123-11.58-10 5.69-19.68 12.59-27.83 20.74-2.44 2.44-7.72 9.79-11.17 9.79-3.04 0-7.6-5.75-9.58-7.92C198.65 52.68 191.16 46.75 184 42c-20.27-13.43-47.53-21.99-72-19.72Z"/></svg>;
const order = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 159 187"><path d="M11 1.7C17 .35 35.7 1 43 1h63c14.23.02 18.98 6.25 19 20v61c0 2.12.14 5.9-.74 7.81-1.62 3.41-5.38 3.14-7.24 0-1.21-1.99-1.02-5.48-1.02-7.81V22c-.06-10.68-2.92-11.98-13-12H33c-5.97 0-18.75-1.85-21.98 4.06C9.81 16.27 10 19.52 10 22v126c.06 3.04.08 5.36 2.31 7.72 3.34 3.54 8.24 3.27 12.69 3.28h35c2.15 0 5.88-.2 7.68 1.02 2.99 2.04 1.83 5.94-1.74 7.38-1.76.71-4.99.6-6.94.6H29c-9.97 0-23.58 1.03-27.35-11-.76-2.41-.65-5.47-.65-8V39c0-5.83-.78-24.72 1.09-29C3.95 5.73 6.91 3.56 11 1.7Zm20.15 29.04C36.35 29.4 45.33 30 51 30h36c1.95 0 5.18-.11 6.94.6 3.57 1.44 4.73 5.34 1.74 7.38C93.88 39.2 90.15 39 88 39H35c-7.83-.15-8.87-4.77-3.85-8.26Zm-.84 24.28C35.07 53.21 43.66 54 49 54h39c2.16 0 5.87-.21 7.68 1.02 2.83 1.92 2.19 5.8-.91 7.24-1.88.88-5.64.74-7.77.74H36c-5.28-.1-10.77-2.41-5.69-7.98Zm-.07 23C35.14 76.22 43.56 77 49 77h38c1.95 0 5.18-.11 6.94.6 3.57 1.44 4.73 5.34 1.74 7.38C93.88 86.2 90.15 86 88 86H36c-5.41-.08-11.8-2.07-5.76-7.98ZM111 103.23c2.87-.16 5.1-.28 8 0 36.77.62 53.37 46.22 27.91 71.68-3.67 3.67-8.1 6.67-12.91 8.64-6.29 2.57-11.22 3.59-18 3.44-36.71-.84-54.63-45.98-28.83-71.82 6.87-6.87 14.48-9.98 23.83-11.94Zm2 9.06c-6.45 1.07-10.68 2.12-16 6.24-26.63 20.59-8.74 64.04 25 59.17 32.21-4.64 38.32-48.87 10-62.37-6.33-3.02-12.1-3.69-19-3.04Zm9 28.71c2.48 0 7.69-.33 9.68 1.02 1.03.7 1.69 1.7 1.69 2.98 0 3.85-4.64 3.95-7.37 4-2.95.05-9.27.53-11.4-1.6-2.34-2.33-1.66-11.97-1.6-15.4.05-2.34-.05-5.44 2.31-6.77 7.85-4.41 6.69 12.45 6.69 15.77Z"/></svg>;

const Header = (props) => {

    const header = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const filledPages = ['/register', '/profile', '/shop', '/create_item', '/products', '/cart', '/confirmation'];
    const pageLocation = useLocation();

    const checkPages = () => {
        for (var i in filledPages)
            if (pageLocation.pathname.includes(filledPages[i])) return true;
        return false;
    }

    const initialFilled = checkPages();

    const [showLogin, setLogin] = useState(false);
    const [showMenu, setMenu] = useState(false);
    const [filled, setFill] = useState(initialFilled);
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {

        auth.onAuthStateChanged((user) => {
            if (user) 
                setSignedIn(true);
            else 
                setSignedIn(false);
        });

    }, []);

    window.onscroll = (e) => {

        if (!initialFilled)
            window.pageYOffset >= header.current.getBoundingClientRect().height ? setFill(true) : setFill(false);

    }

    const hideAll = () => {
        setLogin(false);
        setMenu(false);
    }

    const handleError = (error) => {
        switch (error) {
            case 'auth/invalid-email':
                emailInput.current.classList.add("error");
                passwordInput.current.parentElement.classList.remove("error");
                break;
            case 'auth/invalid-credential':
                emailInput.current.classList.remove("error");
                passwordInput.current.parentElement.classList.add("error");
                break;
            default:
                console.log(error);
                break;
        }
    }

    const signIn = async () => {

        signInWithEmailAndPassword(auth, emailInput.current.value, passwordInput.current.value).then((e) => {})
        .catch(err => {handleError(err.code)}).then(() => {});

    }

    const userLogout = async () => {
        signOut(auth);
    }

    return (
        <>
            <div ref={header} className={`header${filled ? " filled" : ""}${initialFilled ? ' abs' : ''}`}>

                <a href="/" className="logo">
                    {logo}
                </a>
                <div className="navigation">
                    <div className="nav-left">
                        <div className='nav-b menu' onClick={() => {setMenu(true);}}>{menu}</div>
                        {/* <div className='nav-b'>
                            {search}
                        </div> */}
                    </div>

                    <div className="nav-right">
                        <div className='nav-b' onClick={() => {setLogin(true);}}>{profile}</div>
                        {/* {auth.currentUser ? <a href="/cart" className='nav-b'><div className="cart-num">{props.cartLength}</div>{cart}</a> : ''} */}
                        <a href="/cart" className='nav-b'><div className="cart-num">{props.cartLength}</div>{cart}</a>
                    </div>
                </div>

            </div>
            <div className={`mask${showLogin || showMenu ? ' visible' : ''}`} onClick={() => {hideAll();}}></div>

            <div className={`login-wrapper${showLogin ? ' visible': ''}`}>
                <div className="nav-login-form">

                    { signedIn === false ? 
                    <>
                    <div className="login-section">
                        <div className="login-title">
                            <span>Sign In</span>
                            <div className="login-close" onClick={() => {setLogin(false)}}>{close}</div>
                        </div>

                        <form className="form" onSubmit={(e) => {e.preventDefault(); signIn();}}>
                        <div className="input-row">
                            <div className="label">Email*</div>
                            <input ref={emailInput} required text="text" name="email" className="login-input"></input>
                        </div>

                        <div className="input-row">
                            <div className="label">Password*</div>
                            <div className="password-input">
                                <input ref={passwordInput} required maxLength={40} name="password" text="text" type={passwordHidden ? "password" : "text"} className="login-input"></input>
                                <div className="show-password" onClick={() => {setPasswordHidden(!passwordHidden);}}>
                                    {passwordHidden ? hidePassword : showPassword}
                                </div>
                            </div>
                        </div>

                        <div className="input-row">
                            <button className="login-button">Sign In</button>
                        </div>
                        </form>

                        <div className="nav-login-or">OR</div>
                    </div>

                    <div className="signup-section">
                        <div className="login-title">
                            <span>Create an account</span>
                            <span className="description">Register a new account to enjoy a richer experience</span>
                        </div>
                        <div className="input-row">
                            <a href="/register" className="create-button">Create Account</a>
                        </div>
                        
                    </div>
                    </>
                    : 
                    <div className="profile-section">
                        <div className="profile-header">
                            <div className="profile-wrapper">
                                <img alt="Profile" src={auth.currentUser.photoURL} className="profile-img"/>
                                <div className="profile-info">
                                    <div className="profile-name">{`${auth.currentUser.displayName}`}</div>
                                    <div className="profile-email">{auth.currentUser.reloadUserInfo.email}</div>
                                </div>
                            </div>
                            <div className="login-close" onClick={() => {setLogin(false)}}>{close}</div>
                        </div>
                        <div className="profile-options">

                            <a className="profile-nav" href="/profile" onClick={() => {setLogin(false)}}>
                                {profile}
                                <span>Profile</span>
                            </a>

                            <a className="profile-nav" href="/profile#orders" onClick={() => {setLogin(false)}}>
                                {order}
                                <span>Order History</span>
                            </a>

                            <a className="profile-nav" href="/profile#wishlist" onClick={() => {setLogin(false)}}>
                                {heart}
                                <span>Wish List</span>
                            </a>

                        </div>
                        <div className="input-row">
                            <div onClick={() => {userLogout();}} className="create-button">Log Out</div>
                        </div>
                    </div>
                    }


                </div>
            </div>

            <div className={`menu-wrapper${showMenu ? ' visible': ''}`}>

                <a className="profile-nav" href="/shop">
                    <span>Shop All</span>
                </a>

                <a className="profile-nav" href="/shop/men">
                    <span>Men</span>
                </a>

                <a className="profile-nav" href="/shop/women">
                    <span>Women</span>
                </a>

                <a className="profile-nav" href="/shop/accessories">
                    <span>Accessories</span>
                </a>

                <a className="profile-nav" href="/shop/sale">
                    <span>Sale</span>
                </a>

                <a className="profile-nav" href="/create_item">
                    <span>Create Item</span>
                </a>

            </div>
        </>
    )

}

export default Header;