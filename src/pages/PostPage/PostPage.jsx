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

  

  async function handleEdit() {
    try {
      const response = await api.put(`/posts/${state._id}`);

      if (response.status === 200) {

      }
    } catch (error) {
      
    }
  }

  return (
    <div className='PostPage'>

      <h1>{state.owner.username}</h1>

      <img src={state.image} alt='random_image' />
      {
        user &&
        <>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
        </>
      }

      <p>{state.description}</p>

      <div onClick={goBack}>Back</div>
    </div>
  );
};

export default PostPage;
