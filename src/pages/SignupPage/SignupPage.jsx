import './SignupPage.css';
import '../../App.css';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import Input from '../../components/Forms/Input';
import Button from '../../components/Forms/Button';
import { AuthContext } from '../../context/auth.context';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { email, password, username };

    console.log(requestBody);

    try {
      await authService.signup(requestBody);
      const response = await authService.login(requestBody);

      storeToken(response.data.authToken);
      authenticateUser();

      navigate('/');
    } catch (error) {
      console.error(error);
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <section className='SignupPage animeLeft'>
      <div className='forms'>
        <h1 className='title'>Create account</h1>

        <form onSubmit={handleSignupSubmit}>
          <label>Username</label>
          <Input
            label='Username'
            type='text'
            name='username'
            value={username}
            onChange={handleUsername}
          />
          <label>E-mail</label>
          <Input
            label='E-mail'
            type='email'
            name='email'
            value={email}
            onChange={handleEmail}
          />
          <label>Password</label>
          <Input
            label='Password'
            type='password'
            name='password'
            value={password}
            onChange={handlePassword}
          />
          <Button type='submit'>Create</Button>
        </form>

        {errorMessage && <p className='error-message'>{errorMessage}</p>}

        <div className='create-account'>
          <p>Already have account?</p>
          <Link to={'/login'} className='button'>
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignupPage;
