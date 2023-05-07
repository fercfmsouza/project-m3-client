import './SignupPage.css';
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
    <div className='SignupPage'>
      <h1>Create account</h1>

      <form onSubmit={handleSignupSubmit}>
        <Input
          label='Username'
          type='text'
          name='username'
          value={username}
          onChange={handleUsername}
        />
        <Input
          label='E-mail'
          type='email'
          name='email'
          value={email}
          onChange={handleEmail}
        />
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

      <p>Already have account?</p>
      <Link to={'/login'}> Login</Link>
    </div>
  );
}

export default SignupPage;
