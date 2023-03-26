import React, {useContext, useEffect, useState} from 'react';
import {ThemeContext} from "../../../contexts/themeContext/ThemeContext";
import './DetailAnnInfo.scss';

const DetailAnnInfo = ({data}) => {
    const [uncapped, setUcpapped] = useState(false);
    const [shortLength, setShortLength] = useState(false);
    const theme = useContext(ThemeContext).theme;

    useEffect(()=>{
        let desc = document.getElementById('desc-detail');
        let descBtn = document.getElementById('desc-detail-btn');

        if(data.length<206) setShortLength(true);

        if(!shortLength) {
            if(uncapped) {
                desc.style.height =  'auto';
                desc.style.display = 'block';
                desc.style.overflow = 'visible';
                descBtn.innerHTML = 'Скрыть';
            } else {
                desc.style.overflow = 'hidden'
                desc.style.display = '-webkit-box';
                desc.style.height =  '9em';
                descBtn.innerHTML = 'Читать полностью...';
            }
        } else {
            desc.style.overflow = 'hidden'
            desc.style.display = '-webkit-box';
            desc.style.height =  '9em';
            descBtn.style.display = 'none';
        }
    },[uncapped])

    const learnMoreHandler = (e) => {
        setUcpapped(!uncapped);
    }

    if(shortLength) {
        return (
            <div className={`${theme}-catalog-detail-desc`}>
                <p id='desc-detail'>{data}</p>
            </div>
        )
    }

    return (
        <div className={`${theme}-catalog-detail-desc`}>
            <p id='desc-detail'>{data}</p>
            <span id='desc-detail-btn' className={`${theme}-ref`} onClick={(e) => learnMoreHandler(e)}></span>
        </div>
    );
};

export default DetailAnnInfo;