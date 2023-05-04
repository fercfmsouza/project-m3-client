import React from 'react'
import './PostPage.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Link } from 'react-router-dom';
import FeedPage from '../FeedPage/FeedPage';

const PostPage = () => {
    const { isLoggedIn, post } = useContext(AuthContext);
    return (
      <div>
        <h1>{post}'s Post</h1>
        {isLoggedIn && (
          <>
          here render post details
          </>
        )}
        <br />
        <Link to="/feed" content={<FeedPage />}>Back</Link>
      </div>
    );
}

export default PostPage