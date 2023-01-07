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
    
    const isInList = items.find(item => item.id === post.id);
    if (isInList) {
      const updatedItems = items.filter(item => item.id !== post.id);
      setItems(updatedItems);
      localStorage.setItem('posts', JSON.stringify(updatedItems));
    } else {
      const newItem = post;

      setItems(prevItems => {
      const updatedItems = [...prevItems, newItem];
      localStorage.setItem('posts', JSON.stringify(updatedItems));

      return updatedItems;
    });
    }
    }
    
    
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
