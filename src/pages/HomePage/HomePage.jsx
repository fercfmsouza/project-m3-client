import './HomePage.css';
import PostPage from '../PostPage/PostPage';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className='bg'>
      <h1>Home page</h1>
      <Link to="/post" content={<PostPage />}>Post</Link> 
      <br />
      {
      //should include a key ( postId ? ) to redirect a different post
      }
      <Link to="/post" content={<PostPage />}>Post</Link>
      <br />
      <Link to="/post" content={<PostPage />}>Post</Link>
      <br />
      <Link to="/post" content={<PostPage />}>Post</Link>
      <br />
      <Link to="/post" content={<PostPage />}>Post</Link>
      <br />
      <Link to="/post" content={<PostPage />}>Post</Link>
      <br />
    </div>
  );
}

export default HomePage;
