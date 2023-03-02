import React, {useContext, useState} from 'react';
import './Register.scss'
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import {useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {useStoreDispatch} from "../../store/store";
import {register} from "../../features/user/actions";
import {ModalContext} from "../../contexts/modalContext/ModalContext";

const Register = () => {
    const dispatch = useStoreDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const theme = useContext(ThemeContext).theme;
    const modal = useContext(ModalContext);
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        country: '',
        password: '',
        re_password: '',
    })

    const onChangeHandler = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(register(credentials)).then(()=>{
            if(user.error.length>0) {
                modal.setMessage(user.error[0]);
                modal.setActive(true);
            } else {
                modal.setMessage('Для завершения регистрации подтвердите аккаунт через почту');
                modal.setActive(true);
                navigate('/');
            }
        })
    }

    if(user.isAuthenticated) return <Navigate to='/'/>;

    return (
        <div className={`${theme}-auth-form-wrapper`}>
            <h1>Регистрация</h1>
            <form onSubmit={(e)=>onSubmitHandler(e)}>
                <input
                    type='text'
                    name='name'
                    value={credentials.name}
                    onChange={e => onChangeHandler(e)}
                    placeholder='Ник пользователя'
                    required
                />
                <input
                    type='email'
                    name='email'
                    value={credentials.email}
                    onChange={e => onChangeHandler(e)}
                    placeholder='Почта'
                    required
                />
                <input
                    type='text'
                    name='country'
                    value={credentials.country}
                    onChange={e => onChangeHandler(e)}
                    placeholder='Страна'
                    required
                />
                <input
                    type='password'
                    name='password'
                    value={credentials.password}
                    onChange={e => onChangeHandler(e)}
                    placeholder='Пароль'
                    minLength='6'
                    required
                />
                <input
                    type='password'
                    name='re_password'
                    value={credentials.re_password}
                    onChange={e => onChangeHandler(e)}
                    placeholder='Повторите пароль'
                    minLength='6'
                    required
                />
                <button>Регистрация</button>
            </form>
        </div>
    );
};

export default Register;