import React, { useState, useEffect } from 'react';
import { decode } from 'html-entities';
import { formatDate } from '../../functions/DateFromat';
import Icon from '../Icon/Icon';

function Post({ post }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
    const storedItems = localStorage.getItem('posts');
    if (storedItems) {
    setItems(JSON.parse(storedItems));
    }
    }, []);
    
    function handleClick() {
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
    
    // Check if the post is in the list of items
    const isInList = items.find(item => item.id === post.id);
    
    

  return (
    <tr id='posts'>
      <td>{post.id}</td>
      <td className='title-post'>
        {post.title.rendered.length > 0
          ? decode(post.title.rendered.trim())
          : 'Žádný titulek'}
      </td>
      <td className='author-post'>
        {post.parselyMeta['parsely-author']?.join(', ') ?? 'Žádný autor'}
      </td>
      <td className='date-post'>{formatDate(post.date)}</td>
      <td className='link-post'>
        <a href={post.link} target='_blank' rel='noreferrer'>
          <Icon name='arrow-up-right-from-square' type='fas' />
        </a>
      </td>
      <td className='favourite'>
        <button
          onClick={handleClick}
          className={'uncheck ' + (isInList ? 'check' : '')}
        >
          <Icon name='shrimp' type='fas' />
        </button>
      </td>
    </tr>
  );
}

export default Post;
