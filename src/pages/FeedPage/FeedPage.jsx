import "./FeedPage.css";
import PostPage from "../PostPage/PostPage";
import NewPostPage from "../NewPostPage/NewPostPage";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

function FeedPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  return (
    <div>
      <h1>{user.username}'s Feed</h1>
      {isLoggedIn && (
        <>
        here render project's images
        as Links to the PostDetails
        <br />
        <Link to="/newpost" content={<NewPostPage />}>New Post</Link>
        <br />
        <Link to="/post" content={<PostPage />}>Post Details</Link>
        </>
        
      
      // user.posts.map(()=> {
      //   return(
      //     <>
      //       <h1>{user.posts.description}</h1>
      //     </>
      // )}
        )}
    </div>
  );
}

export default FeedPage;
