import React, {useContext, useEffect} from 'react';
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import './Navbar.scss'
import {Link} from "react-router-dom";
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import {useSelector} from "react-redux";
import {useStoreDispatch} from "../../store/store";
import {getFavoriteCount} from "../../features/favorite/actions";

const favorite = require('./favorite.png');

const Navbar = () => {
    const dispatch = useStoreDispatch();
    const user = useSelector(state=>state.user.user)
    const favoriteCount = useSelector(state => state.favorite.count)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    let theme = useContext(ThemeContext).theme;

    useEffect(()=>{
        if(isAuthenticated) {
            dispatch(getFavoriteCount(user.id));
        }
    }, [isAuthenticated])

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
                    </div>
                }
            </div>
            {isAuthenticated && <div>
                <Link to='/favorite/'>
                    <div className='navbar-favorite-wrapper'>
                        <img style={{
                            height: '20px',
                            filter: `invert(${theme === 'dark' ? '60%' : '30%'})`
                        }} src={favorite} alt='-'/>
                        <div className='navbar-favorite-count'>{favoriteCount}</div>
                    </div>
                </Link>
            </div>}
            <span className={'ThemeToggler'}>
               Тема <ThemeToggler/>
            </span>
        </div>
    );
};

export default Navbar;