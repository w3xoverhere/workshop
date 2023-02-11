import React, {useContext} from 'react';
import './CategoryList.scss'
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";

const CategoryList = ({type, total}) => {
    const theme = useContext(ThemeContext);
    const onChangeHandler = (e) => {
        window.location.href = `/catalog/${e.target.value}`;
    }

    return (
        <div className={`${theme}-category-list-wrapper`}>
            <select className={`${theme}-category-list`} defaultValue={type} onChange={onChangeHandler}>
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
            <span>{total} товаров</span>
        </div>
    );
};

export default CategoryList;