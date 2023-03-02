import React, {useContext, useEffect, useState} from 'react';
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import {useSelector} from "react-redux";
import {useStoreDispatch} from "../../store/store";
import {changeEmail, changeField} from "../../features/user/actions";
import {ModalContext} from "../../contexts/modalContext/ModalContext";
import {useNavigate} from "react-router-dom";
import './ProfileSettings.scss';
const unknown = require('./unknown.jpg');

const ProfileSettings = () => {
    const navigate = useNavigate();
    const dispatch = useStoreDispatch();
    const modal = useContext(ModalContext);
    const theme = useContext(ThemeContext).theme;
    const user = useSelector(state => state.user);
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        country: '',
        avatar: ''
    })

    useEffect(() => {
        if (user.isAuthenticated) {
            setCredentials({
                name: user.user.name,
                email: user.user.email,
                country: user.user.country,
                avatar: user.user.avatar
            })
        }
    }, [user.isAuthenticated])


    const onChangeHandler = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
        let btn = document.getElementById(`${e.target.name}-button`);
        if (credentials[e.target.name].length > 4 && e.target.value!==user.user[e.target.name])
            btn.style.visibility = 'visible';
        else btn.style.visibility = 'hidden';
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        try {
            dispatch(changeField({field: e.target.id,value: credentials[e.target.id]}));
            modal.setMessage('Успешная смена поля пользователя');
            modal.setActive(true);
        } catch (e) {
            modal.setMessage('Ошибка смена поля пользователя');
            modal.setActive(true);
        }
    }

    const changeEmailHandler = (e) => {
        e.preventDefault();
        dispatch(changeEmail(credentials.email)).then(()=>{
            if(user.error.length>0) {
                modal.setMessage(user.error[0]);
                modal.setActive(true);
            } else {
                modal.setMessage('Для смены почты перейдите по ссылке в письме');
                modal.setActive(true);
            }
        })
    }

    const changeAvatarHandler = (e) => {
        const file = e.target.files[0];
        const allowedExtensions = ['image/jpeg', 'image/png']
        if(allowedExtensions.includes(file.type)) {
            dispatch(changeField({field: 'avatar',value: file})).then(()=>{
                setCredentials({...credentials, localErrors: {avatar:''}})
                modal.setMessage('Успешная смена аватарки');
                modal.setActive(true);
            })
        } else {
            modal.setMessage(`Разрешённые расширения: ${allowedExtensions}`);
            modal.setActive(true);
        }
    }

    return (
        <div className={`${theme}-profile-settings-wrapper`}>
            <div className='profile-settings-form-group'>
                <form encType='multipart/form-data' id='avatar' onSubmit={(e) => onSubmitHandler(e)}>
                    {credentials.avatar?<img className='profile-settings-avatar' src={credentials.avatar} alt='-'/>:
                        <img className='profile-settings-avatar' src={unknown} alt='-'/>}
                    <input
                        type='file'
                        name='avatar'
                        onChange={(e) => changeAvatarHandler(e)}
                        placeholder='Аваратка'
                    />
                </form>
            </div>
            <div className='profile-settings-form-group'>
                <form id='name' onSubmit={(e) => onSubmitHandler(e)}>
                    <label>Изменить никнейм</label>
                    <input
                        type='text'
                        name='name'
                        value={credentials.name}
                        onChange={(e) => onChangeHandler(e)}
                        placeholder='Никнейм'
                    />
                    <button id='name-button' type='submit' style={{visibility: 'hidden'}}>Сохранить</button>
                </form>
                <form id='country' onSubmit={(e) => onSubmitHandler(e)}>
                    <label>Изменить страну</label>
                    <input
                        type='text'
                        name='country'
                        onChange={(e) => onChangeHandler(e)}
                        value={credentials.country}
                        placeholder='Страна'
                    />
                    <button id='country-button' type='submit' style={{visibility: 'hidden'}}>Сохранить</button>
                </form>
            </div>
            <div className='profile-settings-form-group' style={{flexFlow: 'column nowrap'}}>
                <button onClick={(e)=>{changeEmailHandler(e)}} className='profile-settings-btn'>Сменить почту</button>
                <button onClick={(e)=>{navigate('/logout/')}} className='profile-settings-btn' style={{backgroundColor: 'rgba(235, 25, 25, 0.8)'}}>Выйти</button>
            </div>
        </div>
    );
}

export default ProfileSettings;