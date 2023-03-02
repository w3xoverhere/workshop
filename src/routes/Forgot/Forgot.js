import React, {useContext, useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import {useStoreDispatch} from '../../store/store';
import {useSelector} from "react-redux";
import {ModalContext} from "../../contexts/modalContext/ModalContext";
import {resetPassword} from "../../features/user/actions";

const Forgot = () => {
    const dispatch = useStoreDispatch();
    const navigate = useNavigate();
    const modal = useContext(ModalContext);
    const user = useSelector(state => state.user);
    let theme = useContext(ThemeContext).theme;


    const [email, setEmail] = useState('');

    const onChange = (e) => {
        setEmail(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await dispatch(resetPassword(email)).then(()=>{
            if(user.error.length>0) {
                modal.setMessage(user.error[0])
                modal.setActive(true);
            }
            else {
                modal.setMessage('Проверьте почту.')
                modal.setActive(true);
            }
        });

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