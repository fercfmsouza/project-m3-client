import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProfilePage.css';

import { api } from '../../api';
import { useGoBack } from '../../hooks/useGoBack';

function ProfilePage() {
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
    <div>
      <h1>{user.username}</h1>

      {user.posts.length > 0 &&
        user.posts.map((post) => {
          return (
            <Link key={post._id} to={`/post/${post._id}`}>
              <img src={post.image} key={post._id} alt={post.description} />
            </Link>
          );
        })}

      <Link to='/newpost'>New Post</Link>
      <div onClick={goBack}>Back</div>
    </div>
  );
}

export default ProfilePage;
