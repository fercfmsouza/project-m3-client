import "./FeedPage.css";
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
