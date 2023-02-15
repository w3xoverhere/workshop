import React, {useContext} from 'react';
import './Register.scss'
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";

const Register = () => {
    const theme = useContext(ThemeContext)
    return (
        <div className={`${theme}-register-wrapper`}>
            <span>Register</span>
        </div>
    );
};

export default Register;