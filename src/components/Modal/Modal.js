import React, {useContext} from 'react';
import './Modal.scss'
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";

const Modal = ({active, setActive, message, setMessage}) => {
    const theme = useContext(ThemeContext).theme;
    console.log(active);
    return (
        <div className={active?`${theme}-modal modal-active`:`${theme}-modal`}>
            <div className='modal-content'>
                <button onClick={() => { setActive(false); setMessage('')}}>close</button>
                <div className='modal-text'>
                    {message}
                </div>
            </div>
        </div>
    );
};

export default Modal;