import React, {useContext} from 'react';
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import './ProfileAnn.scss'
import {Link} from "react-router-dom";
import ImageSlider from "../ImageSlider/ImageSlider";

const ProfileAnn = ({data}) => {
    const theme = useContext(ThemeContext).theme
    return (
        <div className={`${theme}-announcement-card`}>
            <span>{data.title}</span>
            <div className='profile-announcement-card-body'>
                <ImageSlider data={data.images}/>
                <p className='profile-announcement-card-desc'>{data.description}</p>
            </div>
            <span>{data.price} руб</span>
            <div className='profile-announcements-card-buttons'>
                <Link to={`/catalog/${data['tag_name']}/${data['pk']}`} className={`${theme}-ref`}>Перейти</Link>
            </div>
        </div>
    );
};

export default ProfileAnn;