import { useState, useEffect } from 'react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

import Post from "./Post";

function FetchTable() {
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