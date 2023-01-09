import { CircularProgress } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useRef } from 'react';

import Post from "./Post";
import AppPagination from '../AppPagination/AppPagination';

import './TableFilters.css';
import './TableFooter.css';

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

    const [itemOffset, setItemOffset] = useState(0);

    const orderByInput = useRef(null);
    const orderInput = useRef(null);
    const perPage = useRef(null);
    const textInput = useRef(null);

    const handlePageClick = (event) => {
        setItemOffset(event.selected);
    };
    
    const handleFilters = () => {

    if (textInput.current) {
        setSearch(textInput.current.value);
    }
    if (perPage.current) {
        setperPage(perPage.current.value);
    }
    if (orderByInput.current) {
        setOrderBy(orderByInput.current.value);
    }
    if (orderInput.current) {
        setOrder(orderInput.current.value);
    }

    }

    const [posts, setPosts] = useState([]);
    const [responsePageCount, setResponsePageCount] = useState(Number(perpage));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch (`https://techcrunch.com/wp-json/wp/v2/posts?context=embed&per_page=${perpage}&search=${search}&orderby=${orderBy}&order=${order}&page=${itemOffset + 1}`)
        .then(res => {
            setResponsePageCount(Number(res.headers.get('x-wp-totalpages')));
            return res.json();
        })
        .then(data => setPosts(data))
        .finally(() => setLoading(false));
    }, [search, orderBy, order, perpage, itemOffset]);
    

    const [items, setItems] = useState([]);

    useEffect(() => {
        const storedItems = localStorage.getItem('posts');

    if (storedItems) {
        setItems(JSON.parse(storedItems));
    }
    }, []);

    
    function handleClick(post) {

        // Check if the post is already in the list of items
        const isInList = items.find(item => item.id === post.id);
    if (isInList) {

        // The post is already in the list, so remove it
        const updatedItems = items.filter(item => item.id !== post.id);
        setItems(updatedItems);
        localStorage.setItem('posts', JSON.stringify(updatedItems));
    } else {

        // The post is not in the list, so add it
        const newItem = post;
        setItems(prevItems => {

        // Add the new item to the list of items
        const updatedItems = [...prevItems, newItem];
        localStorage.setItem('posts', JSON.stringify(updatedItems));

        return updatedItems;
    });
    }
    }

    return (
        <>
            <div id="table-filters">

                <div id='short-select'>
                    <select name="orderby" ref={orderByInput} onChange={handleFilters} id="orderby">
                        {orderby.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <select name="order" ref={orderInput} onChange={handleFilters} id="order">
                        {Order.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div id="search-bar">
                    <input type="text" ref={textInput} onChange={handleFilters} placeholder='Hledat...' name="search" id="text-input" />
                    
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
                            <Post key={post.id} post={post} handler={handleClick} favouriteItems={items} />
                            ))}
                        </tbody>

                    </table>
                </div>
                
                </>

            ) : <div id='loader'><CircularProgress isIndeterminate color='limegreen' /></div>}

            <div id="table-footer">
                            
                <AppPagination totalPages={responsePageCount} onChange={handlePageClick} />
                            
                    <select name="result-sum" ref={perPage} onChange={handleFilters} id="result-sum">
                         {PerPage.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                         ))}
                    </select>
                </div>
        </>
    )
}

export default FetchTable;