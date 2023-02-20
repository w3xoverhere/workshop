import React, {useContext, useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import {useStoreDispatch} from '../../store/store';
import {useSelector} from "react-redux";
import axios from "axios";
import {REST_API_URL} from "../../env";
import {ModalContext} from "../../contexts/modalContext/ModalContext";

const Forgot = () => {
    const navigate = useNavigate();
    const modal = useContext(ModalContext);
    const [errors, setError] = useState([])
    const user = useSelector(state => state.user);
    let theme = useContext(ThemeContext).theme;


    const [email, setEmail] = useState('');

    const forgotPassword = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({'email': email});
        const send = async (email) => {
            try {
                const response = await axios.post(`${REST_API_URL}auth/users/reset_password/`, body, config)
                if (response.statusText !== 'OK') throw new Error('Ошибка сброса пароля')
            } catch (e) {
                setError([...errors, e.message])
            }
        }

        send().then(() => {
            modal.setActive(true);
            modal.setMessage('На вашу почту было отправлено письмо с ссылкой. Перейдите по ссылке для смены пароля');
            navigate('/');
        });
    }


    const onChange = (e) => {
        setEmail(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        forgotPassword(email);
    }

    if (user.isAuthenticated) return <Navigate to='/'/>;

    return (
        <div className={`${theme}-auth-form-wrapper`}>
            <h1>Восстановление пароля</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}
                    placeholder='email'
                    required
                />
                <button>Отправить</button>
            </form>
        </div>
    );
};

export default Forgot