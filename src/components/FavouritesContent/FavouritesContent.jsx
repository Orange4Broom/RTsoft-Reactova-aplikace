import { useState, useEffect } from 'react';
import { decode } from 'html-entities';
import { formatDate } from '../../functions/DateFromat';
import Icon from '../Icon/Icon';

function FavouritesContent() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  function handleRemovePost(id) {
    // Remove the post with the matching id from the posts array
    const updatedPosts = posts.filter(post => post.id !== id);
    // Update the local storage and the posts state
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  }

  return (
    <>
      <div id='content'>
        <div id='table-body'>
          <div id='table-container'>
            <div id='table'>
              <table>
                <thead>
                  <tr id='headers'>
                    <th>Id</th>
                    <th>Titulek</th>
                    <th>Autor</th>
                    <th>Datum</th>
                    <th>Odkaz</th>
                    <th>Oblíbené</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr key={post.id} id='posts'>
                      <td>{post.id}</td>
                      <td className='title-post'>
                        {post.title.rendered.length > 0
                          ? decode(post.title.rendered.trim())
                          : 'Žádný titulek'}
                      </td>
                      <td className='author-post'>
                        {post.parselyMeta['parsely-author']?.join(', ') ??
                          'Žádný autor'}
                      </td>
                      <td className='date-post'>
                        {formatDate(post.date)}
                      </td>
                      <td className='link-post'>
                        <a href={post.link} target='_blank' rel='noreferrer'>
                          <Icon name='arrow-up-right-from-square' type='fas' />
                        </a>
                      </td>
                      <td className='favourite'>
                        <button
                          onClick={() => handleRemovePost(post.id)}
                          className='check'>
                          <Icon name='shrimp' type='fas' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FavouritesContent;
