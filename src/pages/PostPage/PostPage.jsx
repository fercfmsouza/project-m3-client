import React from 'react';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { AuthContext } from '../../context/auth.context';
import './PostPage.css';
import { useGoBack } from '../../hooks/useGoBack';


const PostPage = () => {
  const { state } = useLocation();
  const { user } = useContext(AuthContext);
  const { goBack } = useGoBack()
  
  console.log('user', user);
  console.log('state', state);

  return (
    <div className='PostPage'>
      <img src={state.image} alt='random_image' />

      <h1>{state.owner.username}</h1>
      <p>{state.description}</p>

      <div onClick={goBack}>
        Back
      </div>
    </div>
  );
};

export default PostPage;
