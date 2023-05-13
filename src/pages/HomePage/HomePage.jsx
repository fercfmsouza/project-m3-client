import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../api';
import './HomePage.css';
import Loading from '../../components/Loading/Loading';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
              <li key={post._id} className='feed-item'>
                <Link className='feed-link' to={`/post/${post._id}`}>
                  <img
                    loading='lazy'
                    className='feed-img'
                    src={post.image}
                    alt='post'
                  />
                  <span className='feed-views'>{post.views || 0}</span>
                </Link>
              </li>
            );
          })}
      </ul>
    </section>
  );
}

export default HomePage;
