import { useState, useEffect } from 'react';
import './Likes.css';

import { api } from '../../api';

const Likes = ({ post, user, getPost }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const userData = await api.get(`/users/${user._id}`);
        const isLiked = userData.data.likedPosts.some(
          (postId) => postId === post._id,
        );

        if (isLiked) setLiked(true);
      }
    };

    fetchUser();
  }, []);

  if (!post) return null;

  async function toggleLike() {
    try {
      const response = await api.put(`/posts/${post._id}/likes`, {
        type: liked ? 'remove' : 'add',
      });

      if (response.status === 200) {
        setLiked(liked ? false : true);
        getPost();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='likes' style={{ cursor: user ? 'pointer' : 'not-allowed' }}>
      <button className='like-btn' onClick={toggleLike} disabled={!user}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 96 960 960'
          width='24'
          height='24'
          fill={liked ? '#f1b252' : 'gray'}
        >
          <path d='m480 935-41-37q-106-97-175-167.5t-110-126Q113 549 96.5 504T80 413q0-90 60.5-150.5T290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.5T880 413q0 46-16.5 91T806 604.5q-41 55.5-110 126T521 898l-41 37Z' />
        </svg>
      </button>
      <div>{post.likes} likes</div>
    </div>
  );
};

export default Likes;
