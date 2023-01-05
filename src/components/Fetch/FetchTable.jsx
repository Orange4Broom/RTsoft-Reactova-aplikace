import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useRef } from 'react';

import Icon from '../Icon/Icon';
import './TableFilters.css';
import './TableFooter.css';

import Post from "./Post";
import Pages from "../Sites/Sites";
import Sites from '../Sites/Sites';

const orderby = [
    {
        label: 'Datum',
        value: 'date'
    },
    {
        label: 'Titulek',
        value: 'title'
    },
    {
        label: 'Autor',
        value: 'author'
    },
];

const Order = [
    {
        label: 'Sestupně',
        value: 'desc',
    },
    {
        label: 'Vzestupně',
        value: 'asc'
    }
];

const PerPage = [
    {
        label: '20',
        value: '20'
    },
    {
        label: '50',
        value: '50'
    },
    {
        label: '100',
        value: '100'
    }
]

function FetchTable() {
    const [search, setSearch] = useState('');
    const [orderBy, setOrderBy] = useState('date');
    const [order, setOrder] = useState('desc');
    const [perpage, setperPage] = useState('20');


    const orderByInput = useRef(null);
    const orderInput = useRef(null);
    const perPage = useRef(null);

    const textInput = useRef(null);
    const onButtonClick = () => {
        if (!textInput.current || !orderByInput.current || !perPage.current) return;
        setOrderBy(orderByInput.current.value);
        setOrder(orderInput.current.value);
        setperPage(perPage.current.value);
        setSearch(textInput.current.value);
    };

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch (`https://techcrunch.com/wp-json/wp/v2/posts?context=embed&per_page=${perpage}&search=${search}&orderby=${orderBy}&order=${order}`)
        .then(res => res.json())
        .then(data => setPosts(data))
        .finally(() => setLoading(false));
    }, [search, orderBy, order, perpage]);

    return (
        <>
            <div id="table-filters">

                <div id='short-select'>
                    <select name="orderby" ref={orderByInput} id="orderby">
                        {orderby.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <select name="order" ref={orderInput} id="order">
                        {Order.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div id="search-bar">
                    <input type="text" ref={textInput} placeholder='Hledat...' name="search" id="text-input" />
                    <button id='search-button' onClick={onButtonClick}><Icon name="search" type="fa"/></button>
                </div>

            </div>

            {!loading && posts ? (
                <>

                <div id='table'>
                    <table>

                        <thead>
                        <tr id='headers'>
                            <th>Id</th>
                            <th>Titulek</th>
                            <th>Autor</th>
                            <th className='date-post'>Datum</th>
                            <th>Odkaz</th>
                            <th>Oblíbené</th>
                        </tr>
                        </thead>

                        <tbody>
                            {posts.map(post => (
                            <Post key={post.id} post={post} />
                            ))}
                        </tbody>

                    </table>
                </div>
                
                </>

            ) : <div id='loader'><CircularProgress isIndeterminate color='limegreen' /></div>}

            <div id="table-footer">
                    <Sites />
                    <select name="result-sum" ref={perPage} id="result-sum">
                         {PerPage.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                         ))}
                    </select>
                </div>
        </>
    )
}

export default FetchTable;