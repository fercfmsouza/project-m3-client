import './App.css';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import PostPage from './pages/PostPage/PostPage';
import NewPostPage from './pages/NewPostPage/NewPostPage';

import Navbar from './components/Navbar/Navbar';
import IsPrivate from './components/IsPrivate/IsPrivate';

function App() {
  return (
    <div className='App'>
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route
          path='/profile'
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path='/post'
          element={
            <IsPrivate>
              <PostPage />
            </IsPrivate>
          }
        />

        <Route
          path='/newpost'
          element={
            <IsPrivate>
              <NewPostPage />
            </IsPrivate>
          }
        />

        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
