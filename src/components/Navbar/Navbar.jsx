import './Navbar.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link className='logo' to='/'>
          <img src='../../../logo.svg' alt='pets-logo' />
        </Link>

        {isLoggedIn && (
          <>
            <div className='menu-icon' onClick={handleClick}>
            {click && <img src='../../../close-icon.png' alt='close menu' />}
              {!click && <img src='../../../menu-icon.png' alt='bar menu' />}
              {/*<div className={click ? 'fas fa-times' : 'fas fa-bars'}>
                <h3>@{user.username.toLowerCase()}</h3>
                <img src='../../../login.svg' alt='login icon' />
        </div>*/}
            </div>

            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link
                  to={`/profile/${user._id}`}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  My profile
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to={`/settings`}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Settings
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to={'/'}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  <p onClick={logOutUser}>Log out</p>
                </Link>
              </li>
            </ul> 
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
      </div>
    </nav>
  );
}

export default Navbar;
