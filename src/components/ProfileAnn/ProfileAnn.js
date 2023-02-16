import React, {useContext} from 'react';
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import './ProfileAnn.scss'
import {Link} from "react-router-dom";

const ProfileAnn = ({data}) => {
    const theme = useContext(ThemeContext).theme
    console.log(data);
    return (
        <div className={`${theme}-announcement-card`}>
            <span>{data.title}</span>
            <div className='profile-announcement-card-body'>
                <img src={data.images[0].images} />
                <p className='profile-announcement-card-desc'>{data.description}</p>
            </div>
            <span>{data.price} руб</span>
            <div className='profile-announcements-card-buttons'>
                <Link to='#' className={`${theme}-ref`}>Перейти</Link>
                <Link to='#' className={`${theme}-ref`}>Редактировать</Link>
            </div>
        </div>
    );
};

export default ProfileAnn;