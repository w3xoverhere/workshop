import React, {useContext} from "react";
import './CatalogCard.scss'
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import {Link} from "react-router-dom";

export const CatalogCard = ({data}) => {
    let theme = useContext(ThemeContext).theme;
    return (
        <div className={`${theme}-card`}>
            <div className='CardHeader'>
                <span>{data.title}</span>
                <Link to={`/catalog/${data.tag_name}/${data.pk}`} style={{textDecoration: 'none'}}
                      className={`${theme}-ref`}>Перейти</Link>
            </div>
            <hr style={{width: '100%'}}/>
            <div className='CardBody'>
                <img className='Miniature' src={data.images[0].images} alt='-'/>
                <p className='CardDesc'>{data.description}</p>
            </div>
            <span style={{textAlign: 'right', marginRight: '5%'}}>{data.author.name}</span>
            <hr style={{width: '100%'}}/>
                <div className='CardFooter'>
                    <span>{data.price} руб.</span>
                    <button>В корзину</button>
                </div>
        </div>
)
}