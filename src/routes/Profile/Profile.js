import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Link, Navigate} from "react-router-dom";
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import './Profile.scss';
import axios from "axios";
import ProfileAnn from "../../components/ProfileAnn/ProfileAnn";

const unknown = require('./unknown.jpg');
const prevArrow = require('./prev.png');
const nextArrow = require('./next.png');
const settingGear = require('./settings.png');

const Profile = () => {
    const user = useSelector(state => state.user);
    const [userAnnouncements, setUserAnnouncements] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasPrev, setHasPrev] = useState(false);
    const [hasNext, setHasNext] = useState(false);
    const [fetching, setFetching] = useState(true);
    let globalID;
    const theme = useContext(ThemeContext).theme;

    useEffect(() => {
            const fetchAnnouncements = async () => {
                try {
                    if (!user.isAuthenticated) throw new Error('Error get user announcements');
                    const response = await axios.get(`${process.env.REACT_APP_REST_API}announcements/user/profile/${user.user.id}?page=${currentPage}`, {
                        headers: {
                            'Authorization': `JWT ${localStorage.getItem('access')}`
                        }
                    })
                    if (response.statusText !== 'OK') throw new Error('Error get user announcements');
                    setUserAnnouncements([...response.data.results]);
                    if (response.data.next !== null) setHasNext(true);
                    if (response.data.previous !== null) setHasPrev(true);
                } catch (e) {
                    console.log(e.message)
                }
            }
            fetchAnnouncements().finally(() => setFetching(false));
        }
        , [fetching])


    const announcementChangePageHandler = (e) => {
        setUserAnnouncements([]);
        if (e.target.id === 'next')
            setCurrentPage((prevState) => prevState + 1);
        else if (e.target.id === 'prev')
            setCurrentPage((prevState) => prevState - 1);
        setHasNext(false);
        setHasPrev(false);
        setFetching(true);
    }

    if (!user.isAuthenticated) return <Navigate to='/'/>


    const settingGearOnMouse = (e) => {
        let gear = document.getElementById('setting-gear');
        let degree = 0;
        const rotateGear = () => {
            gear.style.transform = `rotate(${degree}deg)`;
            if (degree !== 360) degree += 5
            else degree = 0;
            globalID = requestAnimationFrame(rotateGear);

        }

        if (e.type === 'mouseenter') {
            globalID = requestAnimationFrame(rotateGear);
        } else if(e.type === 'mouseleave') {
            cancelAnimationFrame(globalID);
        }
    }


    return (
        <div className={`${theme}-profile-wrapper`}>
            <div className={`profile-setting-block`} onMouseEnter={(e) => settingGearOnMouse(e)}
                 onMouseLeave={(e) => settingGearOnMouse(e)}>
                <img id='setting-gear' className='setting-gear' src={settingGear} alt='-'/>
                <Link className={`${theme}-ref`} to='/profile/settings'><span>Настройки</span></Link>
            </div>
            <div className='profile-header'>
                <img className='profile-avatar' src={user.user.avatar ? user.user.avatar : unknown} alt='-'/>
                <div className='profile-info'>
                    <p className='profile-name'>{user.user.name}</p>
                    <p className='profile-email'>{user.user.email}</p>
                    <span className='profile-country'>{user.user.country}</span>
                    <span className='profile-birth-date'>{user.user.birth_date}</span>
                </div>
            </div>
            {userAnnouncements && <div className='profile-announcements'>
                <span style={{marginBottom: '10px'}}>Мои объявления</span>
                <div className='profile-announcements-nav'>
                    {hasPrev ? <img src={prevArrow} className='profile-nav-arrow' id='prev'
                                    onClick={announcementChangePageHandler} alt='-'/> : <span></span>}
                    {hasNext ? <img src={nextArrow} className='profile-nav-arrow' id='next'
                                    onClick={announcementChangePageHandler} alt='-'/> : <span></span>}
                </div>
                <div className='profile-announcements-wrapper'>
                    {userAnnouncements.map((data) => <ProfileAnn key={data.pk} data={data}/>)}
                </div>
            </div>}
        </div>
    );
};

export default Profile;