import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import Loading from '../../components/Loading/Loading';
import './ProfilePage.css';

import { api } from '../../api';
import { useGoBack } from '../../hooks/useGoBack';

function ProfilePage() {
  const { user, logOutUser } = useContext(AuthContext);

  const { id } = useParams();
  const [profileUser, setProfileUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { goBack } = useGoBack();

  const isProfileOwner = user._id === id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/users/${id}`);

        setProfileUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (!profileUser || isLoading) return <Loading />;

  return (
    <section className='container animeLeft'>
      <div className='header-newpost'>
        <h1 className='title'>{profileUser.username}</h1>

        {isProfileOwner && (
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
        )}
      </div>

      {profileUser.posts.length === 0 && <p>Create your first post.</p>}

      <ul className='feed animeLeft'>
        {profileUser.posts.length > 0 &&
          profileUser.posts.map((post) => {
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
                  <span className='feed-views'>{post.views}</span>
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
