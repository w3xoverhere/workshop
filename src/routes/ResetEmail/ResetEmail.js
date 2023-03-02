import React, {useContext, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import {ModalContext} from "../../contexts/modalContext/ModalContext";
import axios from "axios";

const ResetEmail = () => {
    const navigate = useNavigate();
    const modal = useContext(ModalContext);
    const {uid, token} = useParams();
    const theme = useContext(ThemeContext).theme;


    const [email, setEmail] = useState({
        email: '',
        re_email: ''
    });

    const onChange = (e) => {
        setEmail({...email, [e.target.name]: e.target.value});
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const confirmEmailHandler = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            };

            const body = JSON.stringify({
                uid: uid,
                token: token,
                new_email: email.email,
                re_new_email: email.re_email
            });

            try {
                const response = await
                    axios.post(`${process.env.REACT_APP_REST_API}auth/users/reset_email_confirm/`, body, config);
                if(response.status!==204) throw new Error();
                modal.setMessage('Успешная смена почты');
                modal.setActive(true);
                navigate('/');

            } catch (e) {
                modal.setMessage('Ошибка подтверждения новой почты');
                modal.setActive(true);
            }
        }

        confirmEmailHandler();

    }


    return (
        <div className={`${theme}-auth-form-wrapper`}>
            <h1>Восстановление почты</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <input
                    type='email'
                    name='email'
                    value={email.email}
                    onChange={e => onChange(e)}
                    placeholder='email'
                    required
                />
                <input
                    type='email'
                    name='re_email'
                    value={email.re_email}
                    onChange={e => onChange(e)}
                    placeholder='Повторите новый email'
                    required
                />
                <button onClick={(e) => onSubmit(e)}>Применить</button>
            </form>
        </div>
    );
};

export default ResetEmail