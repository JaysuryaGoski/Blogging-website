import { useState, useContext } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #f4f6f8; /* Light cool background */
`;

const Image = styled('img')({
  width: 150,
  margin: 'auto',
  display: 'flex',
  padding: '20px 0',
});

const Wrapper = styled(Box)`
  padding: 40px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #007bff; /* Bright blue */
  color: white;
  height: 48px;
  border-radius: 25px;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3; /* Darker blue for hover effect */
  }
`;

const SignUpButton = styled(Button)`
  text-transform: none;
  background: #ffffff; /* White for contrast */
  color: #007bff; /* Match the login button color */
  height: 48px;
  border-radius: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;

  &:hover {
    background: #e9ecef; /* Light gray for hover effect */
  }
`;

const Text = styled(Typography)`
  color: #343a40; /* Dark gray for text */
  font-size: 16px;
`;

const Error = styled(Typography)`
  font-size: 12px;
  color: #dc3545; /* Red for error */
  line-height: 1.2;
  margin-top: 10px;
  font-weight: 600;
`;

const loginInitialValues = {
  username: '',
  password: ''
};

const signupInitialValues = {
  name: '',
  username: '',
  password: '',
};

const Login = ({ isUserAuthenticated }) => {
  const imageUrl = "https://upload.wikimedia.org/wikipedia/en/0/02/DotBlog_domain_logo.png";
  const [account, setAccount] = useState('login');
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState('');
  const [login, setLogin] = useState(loginInitialValues);
  const { setAccounts } = useContext(DataContext);
  const navigate = useNavigate();

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const toggleSignUp = () => {
    setAccount(account === 'signup' ? 'login' : 'signup');
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    try {
      let response = await API.userSignup(signup);
      if (response.isSuccess) {
        setError('');
        setSignup(signupInitialValues);
        setAccount('login');
      } else {
        setError('Something went wrong! Please try again later');
      }
    } catch (error) {
      setError('An unexpected error occurred! Please try again later.');
      console.error("Error during signup:", error);
    }
  };

  const loginUser = async () => {
    try {
      let response = await API.userLogin(login);
      if (response.isSuccess) {
        setError('');
        sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
        setAccounts({ username: response.data.username, name: response.data.name });
        isUserAuthenticated(true);
        navigate('/');
      } else {
        setError('Something went wrong! Please try again later.');
      }
    } catch (error) {
      setError('An unexpected error occurred! Please try again later.');
      console.error("Error during login:", error);
    }
  };

  return (
    <Component>
      <Box>
        <Image src={imageUrl} alt="Login" />
        {account === 'login' ? (
          <Wrapper>
            <TextField
              variant="outlined"
              value={login.username}
              label="Username"
              onChange={onValueChange}
              name="username"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              variant="outlined"
              value={login.password}
              label="Password"
              onChange={onValueChange}
              name="password"
              type="password"
              fullWidth
              required
              margin="normal"
            />
            {error && <Error>{error}</Error>}
            <LoginButton variant="contained" onClick={loginUser}>Login</LoginButton>
            <Text style={{ textAlign: 'center' }}>OR</Text>
            <SignUpButton onClick={toggleSignUp}>Create an Account</SignUpButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="outlined"
              name="name"
              label="Name"
              onChange={onInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              variant="outlined"
              name="username"
              label="Username"
              onChange={onInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              variant="outlined"
              name="password"
              label="Password"
              type="password"
              onChange={onInputChange}
              fullWidth
              required
              margin="normal"
            />
            {error && <Error>{error}</Error>}
            <SignUpButton onClick={signupUser}>Sign Up</SignUpButton>
            <Text style={{ textAlign: 'center' }}>OR</Text>
            <LoginButton variant="contained" onClick={toggleSignUp}>
              Already have an Account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
