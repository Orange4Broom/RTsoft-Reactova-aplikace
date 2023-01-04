import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import Icon from '../Icon/Icon';
import '../TableFilters/TableFilters.css';

import Post from "./Post";

function FetchTable() {

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

    const order = [
        {
            label: 'Sestupně',
            value: 'desc',
        },
        {
            label: 'Vzestupně',
            value: 'asc'
        }
    ]

    const textInput = useRef(null);
    const onButtonClick = () => {
        textInput.current.focus();
        console.log(textInput.current.value);
    };

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch ('https://techcrunch.com/wp-json/wp/v2/posts?context=embed&per_page=20')
        .then(res => res.json())
        .then(data => setPosts(data))
        .finally(() => setLoading(false));
    }, []);

    console.log(posts);

    return (
        <>
            <div id="table-filters">

                <div id='short-select'>
                    <select name="orderby" id="orderby">
                        {orderby.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <select name="order" id="order">
                        {order.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div id="search-bar">
                    <input type="text" ref={textInput} placeholder='Hledat...' name="search" id="text-input" />
                    <button id='search-button' onClick={onButtonClick}><Icon name="search" type="fa"/></button>
                </div>

            </div>

            {!loading ? (
                <table id='table'>

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

            ) : <CircularProgress isIndeterminate color='limegreen' />}
        </>
    )
}

export default FetchTable;