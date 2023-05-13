import './App.css';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import PostPage from './pages/PostPage/PostPage';
import NewPostPage from './pages/NewPostPage/NewPostPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import IsPrivate from './components/IsPrivate/IsPrivate';

function App() {
  return (
    <div className='App'>
      <Navbar />

      <main className='AppBody'>
        <Routes>
          <Route path='/' element={<HomePage />} />

          <Route
            path='/profile/:id'
            element={
              <IsPrivate>
                <ProfilePage />
              </IsPrivate>
            }
          />

          <Route
            path='/settings'
            element={
              <IsPrivate>
                <SettingsPage />
              </IsPrivate>
            }
          />

          <Route path='/post/:id' element={<PostPage />} />

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
      </main>

      <Footer />
    </div>
  );
}

export default App;
