import React, {useEffect, useState} from 'react'
import './Root.scss'
import {Outlet, useNavigate} from "react-router-dom";
import ThemeProvider from "../../contexts/themeContext/ThemeProvider";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {useDispatch} from "react-redux";
import {checkAuthentication} from "../../features/user/actions";
import ModalProvider from "../../contexts/modalContext/ModalProvider";

const Root = () => {
    const dispatch = useDispatch();
    const [modalActive, setModalActive] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    let themeInitialState = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
    const [theme, setTheme] = useState(themeInitialState);

    useEffect(()=>{
        dispatch(checkAuthentication());
    }, )

    return (
        <div className={`${theme}-root`}>
            <ThemeProvider theme={theme} setTheme={setTheme}>
                <ModalProvider active={modalActive} setActive={setModalActive} message={modalMessage} setMessage={setModalMessage}>
                    <Navbar/>
                    <div className='content'>
                        <Outlet/>
                    </div>
                    <div className='footer'>
                        <Footer/>
                    </div>
                </ModalProvider>
            </ThemeProvider>
        </div>
    )
}

export default Root;
