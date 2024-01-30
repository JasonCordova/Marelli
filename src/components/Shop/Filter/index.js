import {useState} from 'react';

const arrowUp = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 240"><path d="M201 1.46c-8.18-1.13-18.35-.89-26 2.42-10.24 4.43-26.47 22.59-35 31.12L38 137l-18 18C7.45 167.55.79 173.44 1 192c.16 13.24 6.06 20.05 15 29 11.19 11.21 18.15 18.37 35 17.99 17.73-.41 27.48-13.47 39-24.99l69-69 23-23c2.03-2.03 7.15-7.96 10-7.96 2.85 0 7.97 5.93 10 7.96l23 23 69 69c11.52 11.52 21.27 24.58 39 24.99 15.44.35 22.57-5.56 33-15.99 4.14-4.14 9.53-9.05 12.32-14 7.13-11.47 6.43-26.62 0-38-3.84-6.27-10.16-11.84-15.32-17l-26-26-84-84-23-23c-9.85-9.85-14.87-16.39-29-19.54Z"/></svg>;
const arrowDown = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 240"><path d="M201 238.54c-8.18 1.13-18.35.89-26-2.42-10.24-4.43-26.47-22.59-35-31.12L38 103 20 85C7.45 72.45.79 66.56 1 48c.16-13.24 6.06-20.05 15-29C27.19 7.79 34.15.63 51 1.01 68.73 1.42 78.48 14.48 90 26l69 69 23 23c2.03 2.03 7.15 7.96 10 7.96 2.85 0 7.97-5.93 10-7.96l23-23 69-69c11.52-11.52 21.27-24.58 39-24.99C348.44.66 355.57 6.57 366 17c4.14 4.14 9.53 9.05 12.32 14 7.13 11.47 6.43 26.62 0 38-3.84 6.27-10.16 11.84-15.32 17l-26 26-84 84-23 23c-9.85 9.85-14.87 16.39-29 19.54Z"/></svg>;

const Filter = (props) => {

    const [open, setOpen] = useState(true);

    return (
        <div className={`filter${open ? ' opened' : ''}`}>
            <div className="filter-tab" onClick={() => {setOpen(!open);}}>
                <div className="filter-title">{props.title}</div>
                {open ? arrowUp : arrowDown}
            </div>
            <div className="filter-options">
                <div className="f-options-c">
                {props.options ? props.options.map((e, i) => {
                    return (
                        <div onClick={(e) => {var x = e.currentTarget.getElementsByTagName('input')[0]; if (x) x.click();}} className="radio-option">
                            <input type='radio' defaultChecked={i === 0 ? true : false} name={props.title}></input>
                            <div className="radio-label">{e}</div>
                        </div>);
                }) : ""}
                </div>
            </div>
        </div>
    );
}

export default Filter;