import React from 'react';
import './ThemeToggler.scss'
const ThemeToggler = ({theme, setTheme}) => {
    const changeTheme = () => {
        if (theme === 'light') setTheme('dark')
        else setTheme('light')
    }

    return (
        <div>
            <div className={`${theme}-toggler`} onClick={changeTheme}>
                <div id='Circle'
                     style={theme === 'light' ? {right: '', left: '0'} : {left: '', right: '0'}}
                     className={'Circle'}
                />
            </div>
        </div>
    );
};

export default ThemeToggler;