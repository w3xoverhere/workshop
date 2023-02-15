import React, {useContext} from 'react';
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import './Footer.scss'
const Footer = () => {
    let theme = useContext(ThemeContext).theme;
    return (
        <div className={`${theme}-footer`}>
            <div>
                <span>workshop.</span>
                <p>магазин компьютерных комплектующих</p>
            </div>
        </div>
    );
};

export default Footer;