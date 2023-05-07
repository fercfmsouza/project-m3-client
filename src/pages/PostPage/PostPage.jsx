import React from 'react';
import { useContext, useState, useEffect } from 'react';
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
  const [post, setPost] = useState();

  const isPostOwner = user && post && user._id === post.owner._id;

  useEffect(() => {
    getPost(state._id);
  }, []);

  async function getPost(id) {
    const response = await api.get(`/posts/${id}`);

    setPost(response.data);
  }

  async function handleDelete() {
    try {
      const response = await api.delete(`/posts/${post._id}`);
      if (response.status === 200) navigate(`/profile/${user._id}`);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEdit() {
    try {
      const response = await api.put(`/posts/${post._id}`);

      if (response.status === 200) {
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
        getPost(post._id);
        e.target.reset();
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (!post) return null;

  console.log('isPostOwner', isPostOwner);

  return (
    <div className='PostPage'>
      <h1>{post.owner.username}</h1>

      <img src={post.image} alt='random_image' />

      {!!post.comments.length &&
        post.comments.map((comment) => {
          return (
            <div key={comment._id}>
              <p>author: {comment.owner.username}</p>
              <p>{comment.text}</p>
            </div>
          );
        })}

      {isPostOwner && (
        <>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}

      <p>{post.description}</p>

      <form onSubmit={handleSubmit} style={{ border: '1px solid grey' }}>
        <label htmlFor='comment'>Create a comment</label>
        <input type='text' name='comment' />
      </form>

      <div onClick={goBack}>Back</div>
    </div>
  );
};

export default PostPage;
