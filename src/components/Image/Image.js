import React, { useState } from 'react';
import './Image.css';

const Image = ({ imgUrl }) => {
  const [skeleton, setSkeleton] = useState(true);

  const handleLoad = (e) => {
    const img = e.target;

    setSkeleton(false);
    img.style.opacity = 1;
  };

  return (
    <div className='Image feed-img'>
      {skeleton && <div className='skeleton' />}
      <img onLoad={handleLoad} src={imgUrl} className='img' alt='pet_image' />
    </div>
  );
};

export default Image;
