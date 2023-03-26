import React, {useEffect} from 'react';
import {getFavoriteList} from "../../features/favorite/actions";
import {useStoreDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import {clearFavorite} from "../../features/favorite/favoriteSlice";
import {FavoriteCard} from "../../components/FavoriteCard/FavoriteCard";
import './Favorite.scss';

const Favorite = () => {
    const user = useSelector(state => state.user)
    const dispatch = useStoreDispatch();
    const favoriteAnn = useSelector(state => state.favorite.announcements)

    useEffect(()=>{
        if(user.isAuthenticated) {
            dispatch(getFavoriteList({userID: user.user.id}));
        }

        return function cleanup() {
            dispatch(clearFavorite());
        }
    },[user.isAuthenticated])

    return (
        <div className='favorite-wrapper'>
            {favoriteAnn && favoriteAnn.map((data)=> <FavoriteCard key={data.id} data={data}/>)}
        </div>
    );
};

export default Favorite;