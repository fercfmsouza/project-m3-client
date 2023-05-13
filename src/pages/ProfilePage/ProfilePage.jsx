import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import './ProfilePage.css';

import { api } from '../../api';
import { useGoBack } from '../../hooks/useGoBack';

function ProfilePage(props) {
  const { logOutUser } = useContext(AuthContext);

  const { id } = useParams();
  const [user, setUser] = useState();
  const { goBack } = useGoBack();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);

        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <section className='container animeLeft'>
      <div className='header-newpost'>
        <h1 className='title'>{user.username}</h1>

        <div className='wrapper-links'>
          <Link to='/newpost'>
            <img src='../../../plus.svg' alt='plus-sign' />
          </Link>

          <Link to={`/settings`}>
            <img src='../../../settings.svg' alt='settings-sign' />
          </Link>

          <button onClick={logOutUser} className='btn-logout'>
            <img src='../../../logout.svg' alt='settings-sign' />
          </button>
        </div>
      </div>

      {user.posts.length === 0 && <p>Create your first post.</p>}

      <ul className='feed animeLeft'>
        {user.posts.length > 0 &&
          user.posts.map((post) => {
            return (
              <li key={post._id} className='feed-item'>
                <Link
                  className='feed-link'
                  key={post._id}
                  to={`/post/${post._id}`}
                >
                  <img
                    className='feed-img'
                    src={post.image}
                    key={post._id}
                    alt={post.description}
                  />
                  <span className='feed-views'>views</span>
                </Link>
              </li>
            );
          })}
      </ul>

      <button onClick={goBack} className='back-button'>
        Back
      </button>
    </section>
  );
}

export default ProfilePage;
