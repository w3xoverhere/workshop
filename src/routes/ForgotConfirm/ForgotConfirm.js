import React, {useContext, useState} from 'react';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import {useSelector} from "react-redux";
import {ModalContext} from "../../contexts/modalContext/ModalContext";
import {useStoreDispatch} from "../../store/store";
import {resetPasswordConfirm} from "../../features/user/actions";

const ForgotConfirm = () => {
    const dispatch = useStoreDispatch();
    const modal = useContext(ModalContext)
    const navigate = useNavigate();
    const {uid, token} = useParams();
    const user = useSelector(state => state.user);
    let theme = useContext(ThemeContext).theme;

    const [passwords, setPasswords] = useState({
        password: '',
        re_password: ''
    })

    const onChange = (e) => {
        setPasswords({...passwords, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPasswordConfirm({'uid':uid, 'token':token, 'new_password': passwords.password, 're_new_password': passwords.re_password})).then(()=>{
            if(user.error.length>0) {
                modal.setMessage(user.error[0]);
                modal.setActive(true);
            } else {
                modal.setMessage('Успешный сброс пароля');
                modal.setActive(true);
                navigate('/');
            }
        });
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
        </div>
    );
};

export default ForgotConfirm;