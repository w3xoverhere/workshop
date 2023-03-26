import React, {useContext, useState} from 'react';
import './ImageSlider.scss';
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";

const ImageSlider = ({data}) => {
    const theme = useContext(ThemeContext).theme;
    const [images, setImages] = useState(data)
    const [pages, setPages] = useState(images.length);
    const [currentPage, setCurrentPage] = useState(1);


    if (pages === 1) {
        return <img className='Miniature' src={images[0].images} alt='-'/>
    }

    return (
        <div className='image-slider-wrapper'>
            <img className='Miniature' src={images[currentPage - 1].images}/>
            <div className='slider-buttons-group'>
                {(() => {
                    const pagesSpan = [];
                    for (let i = 1; i <= pages; i++) {
                        pagesSpan.push(<div className='area-slider-button' key={i} style={{width: `${100 / pages - 5}%`}} onMouseEnter={() => {setCurrentPage(i)}}>
                            <div
                                className={`${theme}-slider-button`}
                                style={{
                                    filter: `${currentPage !== i ? 'invert(25%)' : 'invert(0%)'}`
                                }}
                                key={i}
                            ></div>
                        </div>)
                    }

                    return pagesSpan
                })()
                }
            </div>
        </div>
    );
};

export default ImageSlider;