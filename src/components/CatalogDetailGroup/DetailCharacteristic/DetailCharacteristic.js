import React, {useContext} from 'react';
import './DetailCharacteristic.scss';
import {ThemeContext} from "../../../contexts/themeContext/ThemeContext";
import {types} from "./types";

const DetailCharacteristic = ({obj, type}) => {
    const theme = useContext(ThemeContext).theme;


    console.log(obj);
    console.log(type);

    return (
        <div className={`${theme}-detail-characteristic`}>
            <table>
                <thead>
                    <tr>
                        <td id='detail-characteristic-header' colSpan='2'>
                            <span>Характеристики</span>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {((obj) => {
                        let i = 0;
                        delete obj.name;
                        let rows = [];
                        for (let key in obj) {
                            if(obj[key]===null) continue;
                            rows.push(
                                <tr key={i}>
                                    <td className='detail-characteristic-field'><span>
                                        {types[type][key]}
                                    </span></td>
                                    <td>{(()=>{
                                        if(typeof(obj[key])=="object")
                                            return obj[key].join(', ');
                                        else if(typeof(obj[key])=='boolean')
                                            return obj[key]===false?'-':'+';
                                        else
                                            return obj[key];
                                    })()}</td>
                                </tr>
                            );
                            i+=1;
                        }

                        return rows;
                    })(obj)}
                </tbody>
            </table>
        </div>
    );
};

export default DetailCharacteristic;