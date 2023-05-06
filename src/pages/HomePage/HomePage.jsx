import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './HomePage.css';
import { api } from '../../api';
import PostPage from '../PostPage/PostPage';

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');

        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className='bg'>
      <h1>Home page</h1>
      {posts &&
        posts.length > 0 &&
        posts.map((post) => {
          return (
            <Link key={post._id} to='/post' state={post}>
              <img src={post.image} alt='post' />
            </Link>
          );
        })}
      <br />
      {
        //should include a key ( postId ? ) to redirect a different post
      }

      <br />
    </div>
  );
}

export default HomePage;
