import React from 'react'
import './PostPage.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

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
      </div>
    );
}

export default PostPage