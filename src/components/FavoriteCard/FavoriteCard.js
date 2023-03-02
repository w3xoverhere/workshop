import React, {useContext} from "react";
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import {Link} from "react-router-dom";
import ImageSlider from "../ImageSlider/ImageSlider";
import {useSelector} from "react-redux";
import {useStoreDispatch} from "../../store/store";
import {removeAnnFromFavorite} from "../../features/favorite/actions";

export const FavoriteCard = ({data}) => {
    const dispatch = useStoreDispatch();
    const user = useSelector(state => state.user);
    let theme = useContext(ThemeContext).theme;

    return (
        <div className={`${theme}-card`}>
            <div className='CardHeader'>
                <span>{data.title}</span>
                <Link to={`/catalog/${data.tag_name}/${data.id}`} style={{textDecoration: 'none'}}
                      className={`${theme}-ref`}>Перейти</Link>
            </div>
            <div className='CardBody'>
                <ImageSlider data={data.images} />
                <p className='CardDesc'>{data.description}</p>
            </div>
            <span className='CardAuthor'>Автор: {data.author.name}</span>
            <div className='CardFooter'>
                <span>{data.price} руб.</span>
                {user.isAuthenticated && <button onClick={()=>{dispatch(removeAnnFromFavorite({userID: user.user.id, annID: data.id}))}} className={`${theme}-remove-or-delete-button`}>Убрать</button>}
            </div>
        </div>
    )
}