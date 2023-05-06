import React from 'react';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../api';

import { AuthContext } from '../../context/auth.context';
import './PostPage.css';
import { useGoBack } from '../../hooks/useGoBack';

const PostPage = () => {
  const { state } = useLocation();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { goBack } = useGoBack();

  async function handleDelete() {
    try {
      const response = await api.delete(`/posts/${state._id}`);

      if (response.status === 200) navigate(`/profile/${user._id}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='PostPage'>
      <img src={state.image} alt='random_image' />

      <h1>{state.owner.username}</h1>
      <p>{state.description}</p>

      <button onClick={handleDelete}>Delete</button>

      <div onClick={goBack}>Back</div>
    </div>
  );
};

export default PostPage;
