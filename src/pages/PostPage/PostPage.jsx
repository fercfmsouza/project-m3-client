import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../api';

import { AuthContext } from '../../context/auth.context';
import './PostPage.css';
import { useGoBack } from '../../hooks/useGoBack';
import Input from '../../components/Forms/Input';

const PostPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { goBack } = useGoBack();
  const [post, setPost] = useState();
  const [views, setViews] = useState(0);
  const [isEditionEnabled, setIsEditionEnabled] = useState(false);

  const isPostOwner = user && post && user._id === post.owner._id;

  useEffect(() => {
    getPost();
  }, []);

  async function getPost() {
    const response = await api.get(`/posts/${id}`);

    
    setPost(response.data);
    setViews(response.data.views);
  }

  async function handleDelete() {
    try {
      const response = await api.delete(`/posts/${post._id}`);
      if (response.status === 200) navigate(`/profile/${user._id}`);
    } catch (error) {
      console.error(error);
    }
  }

  function toggleEditionMode() {
    setIsEditionEnabled((previousState) => !previousState);
  }

  async function handleEdition(e) {
    e.preventDefault();

    const description = e.target.description.value;

    try {
      const response = await api.put(`/posts/${post._id}`, { description });

      if (response.status === 200) {
        getPost();
        setIsEditionEnabled(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const text = e.target.comment.value;

    try {
      const response = await api.post('/comments', { text, postId: post._id });

      if (response.status === 201) {
        getPost();
        e.target.reset();
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (!post) return null;

  return (
    <div className='PostPage'>
      <h1>{post.owner.username}</h1>

      <img src={post.image} alt='random_image' />

      <p>Views: {views}</p>

      {!isEditionEnabled && <h1>{post.description}</h1>}
      {isEditionEnabled && (
        <form onSubmit={handleEdition} style={{ display: 'flex' }}>
          <input
            type='text'
            name='description'
            placeholder={post.description}
          />
          <button>Save Edition</button>
        </form>
      )}

      {isPostOwner && (
        <>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={toggleEditionMode}>Edit</button>
        </>
      )}

      {!!post.comments.length &&
        post.comments.map((comment) => {
          return (
            <div key={comment._id}>
              <p>author: {comment.owner.username}</p>
              <p>{comment.text}</p>
            </div>
          );
        })}

      <form onSubmit={handleSubmit}>
        <Input type='text' name='comment' placeholder='Comments...' />
        <button>
          <img src='../../../comment.svg' alt='button-comment' />
        </button>
      </form>

      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default PostPage;
