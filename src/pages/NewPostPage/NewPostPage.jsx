import React from 'react';
import './NewPostPage.css';
import { api } from '../../api';

const NewPostPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const myTest = e.target.myTest.value;

    const response = await api.post('/posts/create', { myTest });

    console.log('response', response);
  };

  return (
    <div>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit}>
        {/* <label>Post Description</label>
        <input type='text' />
        <label>Post Image</label>
        <input type='file' id='img' /> */}

        <input type='text' name='myTest' />

        <button type='submit'>Create Post</button>
      </form>
    </div>
  );
};

export default NewPostPage;
