import React from 'react';
import { useLocation } from 'react-router-dom';
import './PostPage.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Link } from 'react-router-dom';
import ProfilePage from '../ProfilePage/ProfilePage';

const PostPage = () => {
  const { state } = useLocation();
  const { user } = useContext(AuthContext);
  console.log('user', user);
  console.log('state', state);

  return (
    <div className='PostPage'>
      <img src={state.image} alt='random_image' />

      <h1>{state.owner.username}</h1>
      <p>{state.description}</p>

      <Link to='/profile' content={<ProfilePage />}>
        Back
      </Link>
    </div>
  );
};

export default PostPage;
