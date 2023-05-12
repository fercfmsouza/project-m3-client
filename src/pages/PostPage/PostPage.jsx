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
  const [views, setViews] = useState(0);
  const [isEditionEnabled, setIsEditionEnabled] = useState(false);

  const isPostOwner = user && post && user._id === post.owner._id;

  useEffect(() => {
    getPost();
  }, []);

  async function getPost() {
    const response = await api.get(`/posts/${id}`);

    setPost(response.data);
    console.log(response.data);
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

  useEffect(() => {
    setViews(views + 1);
  }, []);

  if (!post) return null;

  return (
    <section className='mainContainer'>
      <div className='post-intro'>
        <h1 className='title'>{post.owner.username}</h1>

        {isPostOwner && (
          <div className='buttons'>
            <img
              className='back'
              onClick={goBack}
              src='../../../goback-arrow.svg'
              alt='back-arrow'
            />
            <Link to='/newpost'>
              <img src='../../../plus.svg' alt='plus-sign' />
            </Link>
          </div>
        )}
      </div>

      <div className='PostPage'>
        <div className='photo'>
          <img src={post.image} alt='random_image' />
        </div>

        <div className='post-details'>
          <div>
            <p className='post-author'>
              <Link to={`/profile/${user._id}`}>@{post.owner.username}</Link>
              <span className='views-post'>views{post.views}</span>
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

            <h1 className='title'>{post.owner.username}</h1>

            {!isEditionEnabled && (
              <h2 className='description'>{post.description}</h2>
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
          </div>

          <Likes />

          <ul className='post-comments'>
            {!!post.comments.length &&
              post.comments.map((comment) => {
                return (
                  <li key={comment._id}>
                    <b>
                      {comment.owner.username}: {comment.text}
                    </b>
                  </li>
                );
              })}
          </ul>

          <form className='post-newcomment' onSubmit={handleSubmit}>
            <Input type='text' name='comment' placeholder='Comments...' />
            <button className='btn-comment'>
              <img src='../../../comment.svg' alt='button-comment' />
            </button>
          </form>
        </div>
      </div>
      <div className='date'>
        <p className='created-date'>created in {post.createdAt.toString()}</p>
      </div>
    </section>
  );
};

export default PostPage;
