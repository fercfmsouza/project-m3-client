import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProfilePage.css';
import PostPage from '../PostPage/PostPage';
import NewPostPage from '../NewPostPage/NewPostPage';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { api } from '../../api';

function ProfilePage() {
  // const { isLoggedIn, user } = useContext(AuthContext);
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);

        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {
        user && user.posts.length > 0 &&
        user.posts.map((post) => {
          return <div>{post.description}</div>
        })
      }
      <Link to='/newpost'>New Post</Link>
    </div>
  );
}

export default ProfilePage;
