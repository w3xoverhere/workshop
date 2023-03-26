import React, {useContext, useEffect, useState} from "react";
import './CatalogCard.scss'
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import {Link} from "react-router-dom";
import ImageSlider from "../ImageSlider/ImageSlider";
import {useSelector} from "react-redux";
import {useStoreDispatch} from "../../store/store";
import FavoriteBlock from "../FavoriteBlock/FavoriteBlock";
export const CatalogCard = ({data}) => {
    const dispatch = useStoreDispatch();
    const user = useSelector(state => state.user);
    let theme = useContext(ThemeContext).theme;
    console.log(data);

    return (
        <div className={`${theme}-card`}>
            <div className='CardHeader'>
                <span>{data.title}</span>
                <Link to={`/catalog/${data.tag_name}/${data.id}`} style={{textDecoration: 'none'}}
                      className={`${theme}-ref`}>Перейти</Link>
            </div>
            <div className='CardBody'>
                <ImageSlider data={data.images} />
                <div>
                    <p className='CardDesc'>{data.description}</p>
                    <FavoriteBlock favorite={data.favorite_by} user={user} annID={data.id} />
                </div>
            </div>
                <div className='CardFooter'>
                    <span>{data.price} руб.</span>
                    <span className='CardAuthor'>{data.author.name}</span>
                </div>
        </div>
)
}