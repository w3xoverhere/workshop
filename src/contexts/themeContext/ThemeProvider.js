import {ThemeContext} from "./ThemeContext";
import React from 'react';
const ThemeProvider = ({theme, children}) => {
    localStorage.setItem('theme', theme)
    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};

export default ThemeProvider;