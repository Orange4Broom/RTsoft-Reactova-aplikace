import { decode } from 'html-entities';
import { formatDate } from '../../functions/DateFromat';

import Icon from '../Icon/Icon';

function Post({ post, handler, favouriteItems }) { 

  console.log(post);
  return (
    <tr id='posts'>

      <td>{post.id}</td>
      <td className='title-post'>
        {post.title.rendered.length > 0
          ? decode(post.title.rendered.trim())
          : 'Žádný titulek'}
      </td>

      <td className='author-post'>
        {post.parselyMeta ? post.parselyMeta['parsely-author']?.join(', ') ?? 'Žádný autor' : 'Jméno neuvedeno'}
      </td>

      <td className='date-post'>{formatDate(post.date)}</td>
      <td className='link-post'>
        <a href={post.link} target='_blank' rel='noreferrer'>
          <Icon name='arrow-up-right-from-square' type='fas' />
        </a>
      </td>

      <td className='favourite'>
        <button
          onClick={() => handler(post)}
          className={'uncheck ' + (favouriteItems?.some(checkedPost => checkedPost.id === post.id) ? 'check' : '')}>
          <Icon name='shrimp' type='fas' />
        </button>
      </td>
      
    </tr>
  );
}

export default Post;
