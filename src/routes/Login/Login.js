import React, {useContext, useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import './Login.scss';
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import { useStoreDispatch } from '../../store/store';
import {authentication, authorization} from "../../features/user/actions";
import {useSelector} from "react-redux";

const Login = () => {
    const dispatch = useStoreDispatch();
    const user = useSelector(state => state.user);
    let theme = useContext(ThemeContext).theme;


    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(authentication({email:credentials.email,password: credentials.password}))
            .then(() => dispatch(authorization()));
    }

    if(user.isAuthenticated) return <Navigate to='/'/>;

    return (
        <div className={`${theme}-login-wrapper`}>
            <h1>Вход</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <input
                    type='email'
                    name='email'
                    value={credentials.email}
                    onChange={e => onChange(e)}
                    placeholder='email'
                    required
                />
                <input
                    type='password'
                    name='password'
                    value={credentials.password}
                    onChange={e => onChange(e)}
                    placeholder='password'
                    minLength='6'
                    required
                />
                <button>Войти</button>
            </form>
            {user.error && user.error.map((err) =><span style={{color: 'red'}}>{err}</span>)}
            <Link style={{textDecoration: 'none'}} className={`${theme}-ref`} to='/reset-password/'>Забыли пароль?</Link>
        </div>
    );
};

export default Login;