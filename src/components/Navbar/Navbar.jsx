import './Navbar.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <header className='header'>
      <nav className='container nav'>
        <Link className='logo' to='/'>
          <img src='../../../logo.svg' alt='pets-logo' />
        </Link>

        {isLoggedIn && (
          <>
            <button onClick={logOutUser}>Logout</button>

            <Link to='/profile'>Profile</Link>

            <span>{user && user.name}</span>
          </>
        )}

        {!isLoggedIn && (
          <>
            <div className='links'>
              <Link to='/signup'>Sign Up</Link>
              <Link className='login' to='/login'>
                Login
              </Link>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
