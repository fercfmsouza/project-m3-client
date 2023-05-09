import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../api';
import './HomePage.css';

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');

        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className='container mainContainer'>
      {/* feedModal */}

      <ul className='feed animeLeft'>
        {posts &&
          posts.length > 0 &&
          posts.map((post) => {
            return (
              <li key={post._id} className='feed-img'>
                <Link to={`/post/${post._id}`}>
                  <img src={post.image} alt='post' />
                </Link>
                <span className='views'>views</span>
              </li>
            );
          })}
      </ul>
    </section>
  );
}

export default HomePage;
