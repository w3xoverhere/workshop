import React, {useContext, useEffect, useState} from 'react';
import './CatalogDetail.scss';
import {ThemeContext} from "../../contexts/themeContext/ThemeContext";
import DetailSlider from "../../components/CatalogDetailGroup/DetailSlider/DetailSlider";
import axios from "axios";
import Error from "../Error/Error";
import {useParams} from "react-router-dom";
import DetailAnnInfo from "../../components/CatalogDetailGroup/DetailAnnInfo/DetailAnnInfo";
import DetailAuthorInfo from "../../components/CatalogDetailGroup/DetailAuthorInfo/DetailAuthorInfo";
import DetailBuyBlock from "../../components/CatalogDetailGroup/DetailBuyBlock/DetailBuyBlock";
import DetailCharacteristic from "../../components/CatalogDetailGroup/DetailCharacteristic/DetailCharacteristic";

const CatalogDetail = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const theme = useContext(ThemeContext).theme;


    useEffect(()=>{
        const getAnnouncement = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_REST_API}announcements/${params.type}/${params.id}`);
                if(response.status!==200) throw new Error('Error to get detail page');
                setData(response.data);
                setLoading(false);
                console.log(data);
            } catch (e) {
                console.log('ERROR FETCH ANNOUNCEMENT')
            }
        }

        getAnnouncement();
    }, [params])

    if(loading) return <h1>Loading...</h1>


    return (
        <div className={`${theme}-catalog-detail`}>
            <div style={{alignSelf: 'flex-start'}} className='catalog-detail-header'>
                <span className='catalog-detail-imp-text'>{data.title}</span>
            </div>
            <div className='catalog-detail-body'>
                <DetailSlider data={data.images}/>
                <div className='catalog-ann-info'>
                    <DetailAnnInfo data={data.description} />
                    <DetailAuthorInfo author={data.author} />
                    <DetailBuyBlock price={data.price} />
                </div>
            </div>
            <DetailCharacteristic type={data['tag_name']} obj={data['content_object']} />
        </div>
    );
};

export default CatalogDetail;