import React, {useContext} from 'react';
import './DetailBuyBlock.scss';
import {ThemeContext} from "../../../contexts/themeContext/ThemeContext";

const DetailBuyBlock = ({price}) => {
    const theme = useContext(ThemeContext).theme;

    return (
        <div className={`${theme}-catalog-detail-buy`}>
            <div>
                <span>
                    {`${price} руб.`}
                </span>
                <span>
                    КУПИТЬ
                </span>
            </div>
        </div>
    );
};

export default DetailBuyBlock;