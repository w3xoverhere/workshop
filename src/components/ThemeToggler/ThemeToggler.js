import React, {useContext} from 'react';
import './ThemeToggler.scss'
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
const ThemeToggler = () => {
    let themeObj = useContext(ThemeContext)
    const changeTheme = () => {
        if (themeObj.theme === 'light') themeObj.setTheme('dark')
        else themeObj.setTheme('light')
    }

    return (
        <div>
            <div className={`${themeObj.theme}-toggler`} onClick={changeTheme}>
                <div id='Circle'
                     style={themeObj.theme === 'light' ? {right: '', left: '0'} : {left: '', right: '0'}}
                     className={'Circle'}
                />
            </div>
        </div>
    );
};

export default ThemeToggler;