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
            axios.get(`${process.env.REACT_APP_REST_API}announcements${type ? '/' + type : ''}?page=${currentPage}`)
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

    const categoryChangeHandler = () => {
        setData([]);
        setCurrentPage(1);
        setFetching(true);
    }

    const scrollHandler = (e) => {
        console.log(`data length:${data.length} total count: ${totalCount}`)
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && data.length < totalCount) {
            setFetching(true);
        }
    }

    return (
        <div>
            <CategoryList category={type} categoryChange={categoryChangeHandler} total={totalCount}/>
            <div className={styles.CardList}>
                {data.map((card) => {
                    return <CatalogCard key={card.id} data={card}/>
                })}
            </div>
        </div>
    )
};

export default Catalog;