import React, {useContext} from 'react';
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import './Navbar.scss'
import {Link} from "react-router-dom";
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import {useSelector} from "react-redux";

const Navbar = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    let theme = useContext(ThemeContext).theme;
    return (
        <div className={`${theme}-navbar`}>
            <span><Link to='/' className={`${theme}-logo-ref`}>workshop.</Link></span>
            <span><Link to='/catalog/' className={`${theme}-ref`}>Каталог</Link></span>
            <div>
                {!isAuthenticated ? <div>
                        <span><Link to='/login/' className={`${theme}-ref`}>Вход</Link></span>
                        <span><Link to='/register/' className={`${theme}-ref`}>Регистрация</Link></span></div>
                    : <div>
                        <span><Link to='/profile/' className={`${theme}-ref`}>Профиль</Link></span>
                        <span><Link to='/logout/' className={`${theme}-ref`}>Выход</Link></span>
                    </div>
                }
            </div>
            <span className={'ThemeToggler'}>
               Тема <ThemeToggler/>
            </span>
        </div>
    );
};

export default Navbar;