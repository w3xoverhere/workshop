import React, {useState} from 'react'
import './Root.scss'
import {Outlet} from "react-router-dom";
import ThemeProvider from "../../contexts/themeContext/ThemeProvider";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Root = () => {
    let initialState = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
    const [theme, setTheme] = useState(initialState);
    return (
        <div className={`${theme}-root`}>
            <ThemeProvider theme={theme}>
                <Navbar theme={theme} setTheme={setTheme}/>
                <div className='content'>
                    <Outlet/>
                </div>
                <div className='footer'>
                    <Footer/>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default Root;
