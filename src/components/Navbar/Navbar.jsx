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

        <span>
          {user && (
            <Link to={`/profile/${user._id}`}>
              @{user.username.toLowerCase()}
            </Link>
          )}
        </span>

        <button onClick={logOutUser}>Logout</button>

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
