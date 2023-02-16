import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import './Profile.scss';
import axios from "axios";
import {REST_API_URL} from "../../env";
import ProfileAnn from "../../components/ProfileAnn/ProfileAnn";

const unknown = require('./unknown.jpg')
const prevArrow = require('./prev.png')
const nextArrow = require('./next.png')

const Profile = () => {
    const user = useSelector(state => state.user);
    const [userAnnouncements, setUserAnnouncements] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasPrev, setHasPrev] = useState(false);
    const [hasNext, setHasNext] = useState(false);
    const [fetching, setFetching] = useState(true);
    const theme = useContext(ThemeContext).theme;

    useEffect(() => {
            const fetchAnnouncements = async () => {
                try {
                    if(!user.isAuthenticated) throw new Error('Error get user announcements');
                    const response = await axios.get(`${REST_API_URL}announcements/user/${user.user.id}?page=${currentPage}`)
                    if(response.statusText!=='OK') throw new Error('Error get user announcements');
                    setUserAnnouncements([...response.data.results]);
                    if(response.data.next!==null) setHasNext(true);
                    if(response.data.previous!==null) setHasPrev(true);
                } catch (e) {
                    console.log(e.message)
                }
            }
            fetchAnnouncements().finally(()=>setFetching(false));
        }
        , [fetching])


    const announcementChangePageHandler = (e) => {
        setUserAnnouncements([]);
        if(e.target.id==='next')
            setCurrentPage((prevState) => prevState+1);
        else if(e.target.id==='prev')
            setCurrentPage((prevState) => prevState-1);
        setHasNext(false);
        setHasPrev(false);
        setFetching(true);
    }

    if (!user.isAuthenticated) return <Navigate to='/'/>


    return (
        <div className={`${theme}-profile-wrapper`}>
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
                    {hasPrev? <img src={prevArrow} className='profile-nav-arrow' id='prev' onClick={announcementChangePageHandler} />:<span></span>}
                    {hasNext? <img src={nextArrow} className='profile-nav-arrow' id='next' onClick={announcementChangePageHandler}/>: <span></span>}
                </div>
                <div className='profile-announcements-wrapper'>
                    {userAnnouncements.map((data) => <ProfileAnn key={data.pk} data={data} />)}
                </div>
            </div>}
        </div>
    );
};

export default Profile;