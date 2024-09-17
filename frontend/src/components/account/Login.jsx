import { useState, useContext } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);
`;

const Image = styled('img')({
  width: 200,
  margin: 'auto',
  display: 'flex',
  padding: '50px 0 0',
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex-direction: column;
  & > div, & > button, & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: white;
  height: 48px;
  border-radius: 2px;
`;

const SignUpButton = styled(Button)`
  text-transform: none;
  background: white;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: red;
  line-height: 0;
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
              variant="standard"
              value={login.username}
              label="Enter Username"
              onChange={onValueChange}
              name="username"
            />
            <TextField
              variant="standard"
              value={login.password}
              label="Enter Password"
              onChange={onValueChange}
              name="password"
              type="password"
            />
            {error && <Error>{error}</Error>}
            <LoginButton variant="contained" onClick={loginUser}>Login</LoginButton>
            <Text style={{ textAlign: 'center' }}>OR</Text>
            <SignUpButton onClick={toggleSignUp}>Create an Account</SignUpButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField variant="standard" name="name" label="Enter Name" onChange={onInputChange} />
            <TextField variant="standard" name="username" label="Enter Username" onChange={onInputChange} />
            <TextField variant="standard" name="password" label="Enter Password" type="password" onChange={onInputChange} />
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
