import React from 'react';
import './NewPostPage.css';
import { api } from '../../api';

const NewPostPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const description = e.target.description.value;
    const image = e.target.image.value;

    const response = await api.post('/posts/create', { description, image });

    console.log('response', response);
  };

  return (
    <div>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit}>
        <label>Post Description</label>
        <input type='text' name='description' />
        <label>Post Image</label>
        <input type='file' id='img' name='image' />

        <button type='submit'>Create Post</button>
      </form>
    </div>
  );
};

export default NewPostPage;
