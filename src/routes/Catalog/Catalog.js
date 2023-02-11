import React, {useEffect, useState} from 'react';
import {CatalogCard} from "../../components/CatalogCard/CatalogCard";
import {useParams} from "react-router-dom";
import axios from "axios";
import CategoryList from "../../components/CategoryList/CategoryList";
import styles from './Catalog.module.scss'

const Catalog = () => {
    let {type} = useParams();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const [totalCount, setTotalCount] = useState(0)


    useEffect(() => {
        if (fetching)
            axios.get(`http://127.0.0.1:8000/api/v1/announcements${type ? '/' + type : ''}?page=${currentPage}`)
                .then(response => {
                    setData([...data, ...response.data.results]);
                    setCurrentPage(prevState => prevState + 1);
                    setTotalCount(() => response.data.count);
                })
                .finally(() => setFetching(false));
    }, [fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    },)

    const scrollHandler = (e) => {
        console.log(`data length:${data.length} total count: ${totalCount}`)
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && data.length < totalCount) {
            setFetching(true);
        }
    }

    return (
        <div>
            <CategoryList type={type} total={totalCount}/>
            <div className={styles.CardList}>
                {data.map((card) => {
                    return <CatalogCard key={card.pk} data={card}/>
                })}
            </div>
        </div>
    )
};

export default Catalog;