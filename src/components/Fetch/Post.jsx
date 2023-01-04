import { useState } from 'react';
import { decode } from 'html-entities';
import { formatDate } from '../../functions/DateFromat';
import Icon from '../Icon/Icon';

function Post({ post }) {
    const [state, setState] = useState(false);

    const toggle=()=>{
        setState(!state);
    }

    return (
        
            <tr id='posts'>
                <td>{post.id}</td>
                <td className='title-post'>{post.title.rendered.length > 0 ? decode(post.title.rendered.trim()) : 'N/A'}</td>
                <td className='author-post'>{post.parselyMeta['parsely-author'].join(', ')}</td>
                <td className='date-post'>{formatDate(post.date)}</td>
                <td className='link-post'><a href={post.link} target="_blank" rel="noreferrer"><Icon name="arrow-up-right-from-square" type="fas"/></a></td>
                <td className='favourite'>
                    <button onClick={toggle} className={'uncheck ' + (state ? 'check':'')}><Icon name="shrimp" type="fas" /></button>
                </td>
            </tr> 
        
    );
}

export default Post;
