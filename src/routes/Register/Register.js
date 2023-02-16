import React, {useContext} from 'react';
import './Register.scss'
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const Register = () => {
    const user = useSelector(state => state.user);
    const theme = useContext(ThemeContext)

    if(user.isAuthenticated) return <Navigate to='/'/>;

    return (
        <div className={`${theme}-register-wrapper`}>
            <span>Register</span>
        </div>
    );
};

export default Register;