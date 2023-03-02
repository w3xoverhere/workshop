import React, {useContext} from 'react';
import './CategoryList.scss'
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import {useNavigate} from "react-router-dom";

const CategoryList = ({category, categoryChange, total}) => {
    const theme = useContext(ThemeContext).theme;
    const navigate = useNavigate();
    const onChangeHandler = (e) => {
        navigate(`/catalog/${e.target.value}`);
        categoryChange();

    }

    const declensionOfTotal = (total) => {
        let totalRemainder = Number(total) % 10;
        if(totalRemainder === 1) return `${total} товар`
        else if([2,3,4].includes(totalRemainder)) return `${total} товара`
        else if([5,6,7,8,9,0].includes(totalRemainder)) return `${total} товаров`
    }

    return (
        <div className={`${theme}-category-list-wrapper`}>
            <select className={`${theme}-category-list`} defaultValue={category} onChange={onChangeHandler}>
                <option value=''>Все товары</option>
                <option value='computers'>Компьютеры</option>
                <optgroup label='Комплектующие'>
                    <option value='motherboard'>Материнские платы</option>
                    <option value='processor'>Процессоры</option>
                    <option value='videocard'>Видеокарты</option>
                    <option value='ram'>Оперативная память</option>
                    <option value='rom'>Твердотельные накопители</option>
                    <option value='ssd'>SSD</option>
                    <option value='powerunit'>Блоки питания</option>
                    <option value='cooler'>Кулеры</option>
                </optgroup>
            </select>
            <span>{declensionOfTotal(total)}</span>
        </div>
    );
};

export default CategoryList;