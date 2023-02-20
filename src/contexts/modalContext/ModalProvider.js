import {ModalContext} from "./ModalContext";
import React from 'react';
import Modal from "../../components/Modal/Modal";
const ModalProvider = ({active, setActive, message, setMessage, children}) => {
    let modalObj = {
        active: active,
        setActive: setActive,
        message: message,
        setMessage: setMessage
    }
    return (
        <ModalContext.Provider value={modalObj}>
            {children}
            <Modal active={active} setActive={setActive} message={message} setMessage={setMessage}/>
        </ModalContext.Provider>
    );
};

export default ModalProvider