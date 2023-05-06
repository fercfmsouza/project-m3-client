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
            </div>

            <ul className={click ? 'nav-menu active' : 'nav-menu'}></ul>
            <li className='nav-item'>
              <Link
                to={`/profile/${user._id}`}
                className='nav-links'
                onClick={closeMobileMenu}
              >
                @{user.username.toLowerCase()}
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                <button onClick={logOutUser}>Log out</button>
              </Link>
            </li>
            <Link to='/' className='nav-links' onClick={closeMobileMenu} />
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
