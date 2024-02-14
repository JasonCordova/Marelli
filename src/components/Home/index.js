import video3 from '../../adrian_1.mp4';
import './index.css';
import { useRef, useState } from 'react';
import { auth } from '../../firebaseConfig.js';

const imageLink = 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-double-breasted-tailored-wool-jacket--HQJ63WGRN900_PM2_Front%20view.png?wid=490&hei=490';

const playIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 1196"><path d="m1 1 31 19.31 45 28.64 165 105 500 318.1 132 84L939 597v2l-65 40.95-132 84-500 318.1-165 105-45 28.64L1 1195V1Z"/></svg>;
const pauseIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 384"><path d="M9 .57 35 0h45c12.78.06 15.98 4.81 16 17v350c-.02 13.19-3.81 16.98-17 17H15c-11.39-.14-14.95-5.11-15-16V15C.09 7.52 1.63 3.47 9 .57Zm160 0L195 0h45c12.78.06 15.98 4.81 16 17v350c-.02 13.19-3.81 16.98-17 17h-64c-11.39-.14-14.95-5.11-15-16V15c.09-7.48 1.63-11.53 9-14.43Z"/></svg>
const audioIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142 102"><path d="M65 1.99c1.78-.28 2.78-.89 4.4.63C71.96 5 71 18.15 71 22v70c-.01 3.15.67 8.84-4.06 8.58-3.13-.17-7.5-3.88-9.94-5.79L36 78.85c-5.24-3-18.56-1.84-25-1.85C.7 76.98.02 74.94 0 65V37c.02-2.79-.18-6.32 1.74-8.57C3.83 25.98 7.06 26.04 10 26c4.8-.06 20.52.55 24-.73L65 1.99ZM121 4c19.83 14.33 24.25 48.12 16.46 70-4.28 12.03-7.64 14.35-14.46 24l-8-7c12.32-15.18 19.16-30.05 15.54-50-1.17-6.42-4.58-14.47-8.01-20-1.53-2.48-6.35-7.59-6.33-10 .01-2.53 3.16-5.29 4.8-7Zm-16.98 18.34c5.67.26 8.58 6.87 10.32 11.66 4.91 11.56 4.78 23.56 0 35-1.54 3.03-5.03 9.78-8.38 10.66-3.06.82-6.33-2.7-6.06-5.66.17-1.95 2.71-5.15 3.74-7 2.08-3.71 3.74-8.76 4.19-13 .59-5.62-.69-11.96-3.21-17l-4.54-8c-.94-3.53 1.31-5.1 3.94-6.66ZM88 37c8.18 7.01 8.5 21.14 0 28-8.53-8.87-3.67-7.39-3.67-14S79.47 45.87 88 37Z"/></svg>;
const mutedIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142 102"><path d="M65 1.91c1.79-.23 2.81-.79 4.4.71C71.96 5.02 71 18.14 71 22v69c-.01 3.6.49 10.04-5.02 9.43-3.03-.34-7.56-4.32-9.98-6.22L36 79.02C30.55 75.7 17.66 77.01 11 77 1.32 76.98.02 75.68 0 66V40c0-2.79-.38-8.49 1.02-10.77C2.97 26.04 6.71 26.05 10 26c5.01-.06 20.27.64 24-.85 6.7-2.68 22.14-18.79 31-23.24ZM117 31l7 7c-2.39 2.39-10.96 9.9-10.96 13 0 2.68 8.72 10.87 10.96 14l-7 6c-2.39-2.39-9.9-10.96-13-10.96-2.68 0-10.87 8.72-14 10.96l-6-7c2.65-2.65 11.8-10.2 10.8-14-1.11-4.22-10.56-8.89-8.63-13.94.89-2.34 3.42-3.73 5.83-2.89 3.37 1.17 7.94 7.83 11 8.63 3.8 1 11.35-8.15 14-10.8Z"/></svg>;
const Home = () => {

    const videoElement = useRef(null);
    const [playing, setPlaying] = useState(true);
    const [isMuted, setMuted] = useState(true);

    const handlePlay = () => {
        setPlaying(!playing);
        if (playing) videoElement.current.pause();
        else videoElement.current.play();
    }

    const handleAudio = () => {
        setMuted(!isMuted);
    }

    return (
        <>
            <div className="main-wrapper">

                <div className="play-button wrapper-button" onClick={() => {handlePlay();}}>
                    {playing ? pauseIcon : playIcon}
                </div>
                <div className="audio-button wrapper-button" onClick={() => {handleAudio();}}>
                    {isMuted ? mutedIcon : audioIcon}
                </div>

                <video ref={videoElement} className="video" muted={isMuted ? true : false} autoPlay="True" loop="True">
                    <source src={video3} type="video/mp4"></source>
                </video>

                <div className="wrapper-content">
                    <div className="wrapper-title">AW24 Collection</div>
                    <a className='wrapper-link' href="shop">Shop Collection</a>
                </div>

            </div>

            <div className="new-arrivals">

                <div className="label-wrapper">
                    <div className="label-title">New Arrivals</div>
                    <div className="label-desc">

                    Step into luxury with Marelli's stunning new arrivals, where elegance meets innovation to redefine your style

                    </div>
                </div>

                <div className="popular-categories">

                    {[1, 2, 3, 4].map((e) => {
                        return (<a href="#" className="category" key={e}>
                        <img draggable={false} src={imageLink} className='category-img'/>
                        <div className="category-info">
                            <div className="category-title">Item Name</div>
                            <div className="category-price">$99.99</div>
                        </div>
                    </a>);
                    })}

                </div>

            </div>

        </>

    )
}

export default Home;