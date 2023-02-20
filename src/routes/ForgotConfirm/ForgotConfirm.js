import React, {useContext, useState} from 'react';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import {useSelector} from "react-redux";
import axios from "axios";
import {REST_API_URL} from "../../env";
import {ModalContext} from "../../contexts/modalContext/ModalContext";

const ForgotConfirm = () => {
    const modal = useContext(ModalContext)
    const navigate = useNavigate();
    const {uid, token} = useParams();
    const [errors, setError] = useState([])
    const user = useSelector(state => state.user);
    let theme = useContext(ThemeContext).theme;

    const [passwords, setPasswords] = useState({
        password: '',
        re_password: ''
    })

    const onChange = (e) => {
        setPasswords({...passwords, [e.target.name]: e.target.value})
    }


    const sendNewPassword = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({
            'uid': uid,
            'token': token,
            'new_password': passwords.password,
            're_new_password': passwords.re_password
        });
        const send = async () => {
            try {
                const response = await axios.post(`${REST_API_URL}auth/users/reset_password_confirm/`, body, config);
                if (response.status !== 204) throw new Error('Ошибка смены пароля')
                modal.setMessage('Успешный сброс пароля');
                modal.setActive(true);
            } catch (e) {
                setError([...errors, e.message]);
                console.log(e.message);
            }
        }
        send().then(()=> {
            modal.setActive(true);
            modal.setMessage('Проверьте почту');
            navigate('/');
        });
    }



    const onSubmit = (e) => {
        e.preventDefault();
        sendNewPassword();
    }

    if (user.isAuthenticated) return <Navigate to='/'/>;

    return (
        <div className={`${theme}-auth-form-wrapper`}>
            <h1>Восстановление пароля</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <input
                    type='password'
                    name='password'
                    value={passwords.password}
                    onChange={e => onChange(e)}
                    placeholder='password'
                    required
                />
                <input
                    type='password'
                    name='re_password'
                    value={passwords.re_password}
                    onChange={e => onChange(e)}
                    placeholder='confirm password'
                    required
                />
                <button>Отправить</button>
            </form>
            {errors && errors.map((error)=><span style={{color: 'red'}} id={errors.indexOf(error)}>{error}</span>)}
        </div>
    );
};

export default ForgotConfirm;