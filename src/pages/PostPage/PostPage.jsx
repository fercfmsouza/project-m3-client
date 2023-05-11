import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../api';

import { AuthContext } from '../../context/auth.context';
import './PostPage.css';
import { useGoBack } from '../../hooks/useGoBack';
import Input from '../../components/Forms/Input';
import Button from '../../components/Forms/Button';

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
    <>
      <div className='post-intro'>
        <h1>{post.owner.username}</h1>
        <div className='buttons'>
          <img className='back' onClick={goBack} src='../../../back-arrow.png' alt='back-arrow' />
          <Link to='/newpost'>
              <img src='../../../plus.svg' alt='plus-sign' />
          </Link>
        </div>
      </div>

      <div className='PostPage'>
        <img className='photo' src={post.image} alt='random_image' />
        
        <div className='post-details'>
          <div>
            <div className='post-custom'>
              {isPostOwner && (
                <div className='edit-buttons'>
                  <button className='delete' onClick={handleDelete}>Delete</button>
                  <button onClick={toggleEditionMode}>Edit</button>
                </div>
              )}
              <p>Views: {views}</p>
            </div>

            <div className='post-form'>
              {!isEditionEnabled && <h2>{post.owner.username.toLowerCase()} <span>{post.description}</span></h2>}
              {isEditionEnabled && (
                <form onSubmit={handleEdition} style={{ display: 'flex' }}>
                  <input
                    type='text'
                    name='description'
                    placeholder={post.description}
                  />
                  <Button>Save Edition</Button>
                </form>
              )}

                <p>{post.createdAt.toString()}</p>
            </div>
          </div>

          <div className='post-comments'>
            {
              !!post.comments.length &&
              post.comments.map((comment) => {
                return (
                  <div key={comment._id}>
                    <p>author: {comment.owner.username}</p>
                    <p>{comment.text}</p>
                  </div>
                );
              })
            }

            <div className='post-newcomment'>
              <form onSubmit={handleSubmit}>
                <Input type='text' name='comment' placeholder='Comments...' />
                <Button>
                  <img src='../../../comment.svg' alt='button-comment' />
                </Button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default PostPage;
