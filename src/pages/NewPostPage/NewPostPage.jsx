import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPostPage.css';
import { api } from '../../api';
import Input from '../../components/Forms/Input';
import Button from '../../components/Forms/Button';
import Loading from '../../components/Loading/Loading';
import { useGoBack } from '../../hooks/useGoBack';

const NewPostPage = () => {
  const navigate = useNavigate();
  const { goBack } = useGoBack();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const description = e.target.description.value;
    const image = e.target.image.files[0];

    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);

    try {
      const response = await api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/formdata' },
      });

      if (response.status === 201) {
        const post = response.data;
        setIsLoading(false);
        navigate(`/post/${post._id}`);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit}>
        <Input label='Description' name='description' />

        <Input type='file' name='image' />

        <Button>Create Post</Button>
        <div onClick={goBack}>Back</div>
      </form>
    </div>
  );
};

export default NewPostPage;
