import React, {useContext, useState} from 'react';
import './DetailSlider.scss';
import {ThemeContext} from "../../../contexts/themeContext/ThemeContext";

const DetailSlider = ({data}) => {
    const theme = useContext(ThemeContext).theme;
    const [currentPage, setCurrentPage] = useState(1);

    if (data.length === 1)
        return (
            <div className='catalog-detail-slider-wrapper'>
                <div className={`${theme}-catalog-detail-slider`}>
                    <img className='catalog-detail-slider-element' src={data[0].images} alt='-'/>
                </div>
            </div>
        );

    const onClickHandler = (e) => {
        if (e.target.id === 'left-slider-block-detail') {
            currentPage === 1 ? setCurrentPage(data.length) : setCurrentPage(prevState => prevState - 1);
        } else if (e.target.id === 'right-slider-block-detail') {
            currentPage === data.length ? setCurrentPage(1) : setCurrentPage(prevState => prevState + 1);
        }
    }

    return (
        <div className='catalog-detail-slider-wrapper'>
            <div className={`${theme}-catalog-detail-slider`}>
                <div
                    id='left-slider-block-detail'
                    className='catalog-detail-slider-left-arrow-block'
                    onClick={(e) => onClickHandler(e)}>
                    <p className='catalog-detail-slider-arrow'>&lt;</p>
                </div>
                <img className='catalog-detail-slider-element' src={data[currentPage - 1].images} alt='-'/>
                <div
                    id='right-slider-block-detail'
                    className='catalog-detail-slider-right-arrow-block'
                    onClick={(e) => onClickHandler(e)}>
                    <p className='catalog-detail-slider-arrow'>&gt;</p>
                </div>
            </div>
            <div className='catalog-detail-slider-miniature'>
                {data.map((miniature) => {
                    return <img
                        className={data.indexOf(miniature)+1===currentPage?`${theme}-detail-slider-miniature-selected`:""}
                        onClick={()=>{setCurrentPage(data.indexOf(miniature)+1)}}
                        key={data.indexOf(miniature)}
                        src={miniature.images}
                        alt='-'/>
                })}
            </div>
        </div>
    );
};

export default DetailSlider;