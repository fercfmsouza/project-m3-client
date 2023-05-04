import React from 'react'
import './NewPostPage.css'

const NewPostPage = () => {
  return (
    <div>
        <h1>New Post</h1>
        <form action="post">
            <label>Post Description</label>
            <input type="text" /> 
            <label>Post Image</label>
            <input type="file" id='img' /> 
            
            <button type='submit'>Create Post</button>
        </form>
    </div>
  )
}

export default NewPostPage