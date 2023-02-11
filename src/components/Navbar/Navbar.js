import React from 'react';
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import './Navbar.scss'
import {Link} from "react-router-dom";
const Navbar = ({theme, setTheme}) => {
    return (
        <div className={`${theme}-navbar`}>
            <span><Link to='/' className={`${theme}-logo-ref`}>workshop.</Link></span>
            <span><Link to='/catalog/' className={`${theme}-ref`}>Каталог</Link></span>
            <div>
                <span><Link to='/login/' className={`${theme}-ref`}>Вход</Link></span>
                <span><Link to='/register/' className={`${theme}-ref`}>Регистрация</Link></span>
            </div>
            <span className={'ThemeToggler'}>
               Тема <ThemeToggler theme={theme} setTheme={setTheme}/>
            </span>
        </div>
    );
};

export default Navbar;