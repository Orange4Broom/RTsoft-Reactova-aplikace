import { useState, useEffect, useRef } from 'react';
import AppPagination from '../AppPagination/AppPagination';
import getTotalFavouritePages from '../FavouritesPagination/FavouritePagination';
import Post from '../Fetch/Post';
import Icon from '../Icon/Icon';

import './FavouritesContent.css';

function FavouritesContent() {
  const [posts, setPosts] = useState([]);
  const [perpage, setperPage] = useState('20');
  const [currentPage, setCurrentPage] = useState(0);

  const perPage = useRef(null);

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


  const handleFilters = () => {
    if (perPage.current) {
      setperPage(perPage.current.value);
    }
  }

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  function handleRemovePost(post) {

    // Remove the post with the matching id from the posts array
    const updatedPosts = posts.filter(checkedPost => checkedPost.id !== post.id);

    // Update the local storage and the posts state
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber.selected);
  }

  return (
    <>
      <div id='content'>
        <div id='table-body'>
          <div id='table-container'>

          {JSON.parse(localStorage.getItem('posts')).length > 0 ? (
            <>
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
                  {posts && posts.slice(currentPage * Number(perpage), currentPage * Number(perpage) + Number(perpage)).map(post => (
                    <Post key={post.id} post={post} handler={handleRemovePost} favouriteItems={posts}  />
                  ))}
                </tbody>
              </table>
            </div>

              <div id='table-footer'>
                <AppPagination totalPages={getTotalFavouritePages(perPage.current?.value ?? 1)} onChange={handlePageChange} />

                  <select name="result-sum" ref={perPage} onChange={handleFilters} id="result-sum">
                    {PerPage.map((option, index) => (
                      <option key={index} value={option.value}>{option.label}</option>
                    ))}
                  </select>
              </div>
              </> 
              ): 
              <div id='no-Favourites'>
                <Icon name='shrimp' type='fas' />
                <p id='add-favourites-text'>Nemáš nic v oblíbených. <br /> Pojď si něco <a href="/" id='add-favourites-link'>přidat</a></p>
              </div> }
          </div>
        </div>
      </div>
    </>
  );
}

export default FavouritesContent;
