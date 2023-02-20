import {ThemeContext} from "./ThemeContext";
import React from 'react';
const ThemeProvider = ({theme, setTheme, children}) => {
    let themeObj = {
        theme: theme,
        setTheme: setTheme
    }
    localStorage.setItem('theme', themeObj.theme)
    return (
        <ThemeContext.Provider value={themeObj}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;