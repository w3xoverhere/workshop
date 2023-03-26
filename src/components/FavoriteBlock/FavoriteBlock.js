import React, {useContext, useState} from 'react';
import {addAnnToFavorite} from "../../features/favorite/actions";
import {useStoreDispatch} from "../../store/store";
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import './FavoriteBlock.scss';
const favoriteImage = require('./favorite.png');

const FavoriteBlock = ({favorite, user, annID}) => {
    const theme = useContext(ThemeContext).theme;
    const dispatch = useStoreDispatch();
    const [liked, incLiked] = useState(favorite.length);
    const [clicked, setClicked] = useState(false);

    const likedHandler = () => {
        if(favorite.indexOf(user.user.id)===-1 && clicked === false) {
            dispatch(addAnnToFavorite({userID: user.user.id, annID: annID}));
            setClicked(true)
            incLiked((prevstate) => {return prevstate+=1});
        }
    }

    return (
        <div className='CardFavoriteBlock'>
            <span>{liked}</span>
            {user.isAuthenticated && <img
                alt='-'
                className='CardFavoriteImg'
                style={{filter: `invert(${theme === 'dark' ? '60%' : '30%'})`}}
                src={favoriteImage}
                onClick={()=>{
                    likedHandler()}
                }/>}
        </div>
    );
};

export default FavoriteBlock;