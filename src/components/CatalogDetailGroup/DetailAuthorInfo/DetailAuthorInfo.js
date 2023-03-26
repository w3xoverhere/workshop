import React, {useContext} from 'react';
import './DetailAuthorInfo.scss';
import unknown from "./unknown.jpg";
import {ThemeContext} from "../../../contexts/themeContext/ThemeContext";
const DetailAuthorInfo = ({author}) => {
    const theme = useContext(ThemeContext).theme;

    return (
        <div className={`${theme}-catalog-detail-author-info`}>
            <img src={author.avatar?author.avatar:unknown} alt='-'/>
            <div>
                <span>{author.name}</span>
                <span>{`С нами с ${(author['joined_date']).slice(0,9)}`}</span>
            </div>
        </div>
    );
};

export default DetailAuthorInfo;