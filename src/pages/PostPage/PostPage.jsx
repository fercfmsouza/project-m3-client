import React from 'react';
import './PostPage.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Link } from 'react-router-dom';
import ProfilePage from '../ProfilePage/ProfilePage';

const PostPage = () => {
  const { user } = useContext(AuthContext);

  console.log('user', user);

  return (
    <div>
      <h1>Create Post</h1>
      <>here render post details</>
      <br />
      <Link to='/profile' content={<ProfilePage />}>
        Back
      </Link>
    </div>
  );
};

export default PostPage;
