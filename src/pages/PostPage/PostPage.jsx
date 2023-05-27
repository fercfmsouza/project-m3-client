import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../api';

import { AuthContext } from '../../context/auth.context';
import { useGoBack } from '../../hooks/useGoBack';
import Input from '../../components/Forms/Input';
import './PostPage.css';
import Likes from '../../components/Likes/Likes';

const PostPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { goBack } = useGoBack();
  const [post, setPost] = useState();
  const [isEditionEnabled, setIsEditionEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const isPostOwner = user && post && user._id === post.owner._id;

  useEffect(() => {
    incrementPostViews();
  }, []);

  async function getPost() {
    const response = await api.get(`/posts/${id}`);

    setPost(response.data);
  }

  async function incrementPostViews() {
    try {
      const response = await api.put(`/posts/${id}/views/increment`);
      if (response.status === 200) getPost();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    try {
      const response = await api.delete(`/posts/${post._id}`);
      if (response.status === 200) navigate(`/profile/${user._id}`);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCommentDelete(id) {
    try {
      const response = await api.delete(`/comments/${id}/posts/${post._id}`);
      if (response.status === 200) getPost();
    } catch (error) {
      console.log(error);
    }
  }

  function toggleEditionMode() {
    setIsEditionEnabled((previousState) => !previousState);
  }

  async function handleEdition(e) {
    e.preventDefault();

    const description = e.target.description.value;

    if (description) {
      try {
        const response = await api.put(`/posts/${post._id}`, { description });

        if (response.status === 200) {
          getPost();
          setIsEditionEnabled(false);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await api.get(`/posts/${post._id}`);

        if (response.status === 200) {
          getPost();
          setIsEditionEnabled(false);
        }
      } catch (error) {
        console.error(error);
      }
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
      const errorDescription = 'Please Login to comment.';
      setErrorMessage(errorDescription);
    }
  }

  if (!post) return null;

  return (
    <section>
      <div className='post-intro'>
        <h1 className='title'>{post.owner.username}'s post</h1>
        
        <div className='buttons'>
        <img
          className='back'
          onClick={goBack}
          src='../../../goback-arrow.svg'
          alt='back-arrow'
        />
        {isPostOwner && (
            <Link to='/newpost'>
              <img src='../../../plus.svg' alt='plus-sign' />
            </Link>
        )}

        </div>
      </div>

      <div className='PostPage'>
        <img className='photo' src={post.image} alt='random_image' />

        <div className='post-details'>
          <div className='post-info'>
            <div className='post-custom'>
              <p className='post-author'>
                <span className='views-post'>{post.views}</span>
              </p>

              {isPostOwner && (
                <div className='edit-buttons'>
                  <button className='btn-delete' onClick={handleDelete}>
                    Delete
                  </button>
                  <button className='btn-edit' onClick={toggleEditionMode}>
                    Edit
                  </button>
                </div>
              )}

              {!isPostOwner && (
                <Link className='post-author' to={`/profile/${post.owner._id}`}>
                  @{post.owner.username}
                </Link>
              )}
            </div>

            {!isEditionEnabled && (
              <h2>
                {post.owner.username.toLowerCase()}{' '}
                <span>{post.description}</span>
              </h2>
            )}

            {isEditionEnabled && (
              <form
                className='edit-form'
                onSubmit={handleEdition}
                style={{ display: 'flex' }}
              >
                <input
                  type='text'
                  name='description'
                  placeholder={post.description}
                />
                <button className='btn-edit'>Save</button>
              </form>
            )}

            <p className='created-date'>
              created in {new Date(post.createdAt).toLocaleDateString()}
            </p>

            <Likes user={user} post={post} getPost={getPost} />
          </div>

          <div className='comments'>
            <ul className='post-comments'>
              {!!post.comments.length &&
                post.comments.map((comment) => {
                  return (
                    <li className='comments-wrapper' key={comment._id}>
                      <b>
                        {comment.owner.username}: <span>{comment.text}</span>
                      </b>
                      {isEditionEnabled && (
                        <button
                          className='btn-trash'
                          onClick={() => handleCommentDelete(comment._id)}
                        >
                          <img src='../../../trash.svg' alt='trash-bin' />
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>

            <form className='post-newcomment' onSubmit={handleSubmit}>
              <Input type='text' name='comment' placeholder='Comments...' />
              <button className='btn-comment'>
                <img src='../../../comment.svg' alt='button-comment' />
              </button>
              {errorMessage && <p className='error-message'>{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostPage;
