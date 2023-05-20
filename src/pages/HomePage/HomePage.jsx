import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../api';
import './HomePage.css';
import Image from '../../components/Image/Image';

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
      <ul className='feed animeLeft'>
        {posts &&
          posts.length > 0 &&
          posts.map((post) => {
            return (
              <li key={post._id} className='feed-item'>
                <Link className='feed-link' to={`/post/${post._id}`}>
                  <Image imgUrl={post.image} />
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
