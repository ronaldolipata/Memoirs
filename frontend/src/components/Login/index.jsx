import { useState, useRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '@/UserContext';
import style from '@/components/Login/style.module.css';
import NavBar from '@/components/NavBar';

const Login = () => {
  const {
    appendUserDetails,
    appendUserPosts,
    appendUserId,
    appendUsername,
    username,
    appendUsernameParams,
  } = useContext(UserContext);

  const [hashedPassword, setHashedPassword] = useState();
  const [loginError, setLoginError] = useState(null);

  const refUsername = useRef(null);
  const refPassword = useRef(null);

  const navigate = useNavigate();

  // Get limit and offset queries
  const search = useLocation().search;
  const limit = parseInt(new URLSearchParams(search).get('limit')) || 6;
  const offset = parseInt(new URLSearchParams(search).get('offset')) || 0;

  const inputValidation = () => {
    if (refUsername.current.value === '') {
      return setLoginError('Please enter your username.');
    }

    if (refPassword.current.value === '') {
      return setLoginError('Please enter your password.');
    }

    loginUser();
  };

  const loginUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${refUsername.current.value}?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();

      if (data.Error === 'No User found') {
        return setLoginError('Invalid Username');
      }

      if (data.userDetails.password !== refPassword.current.value) {
        return setLoginError('Invalid Password');
      }

      // Save User's data to UserContext
      appendUserDetails(data.userDetails);
      appendUserPosts(data.userPosts);
      appendUserId(data.userDetails.userId);
      appendUsername(data.userDetails.username);
      appendUsernameParams(data.userDetails.username);

      setLoginError(null);

      // Navigate to User profile once logged in
      navigate(`/${refUsername.current.value}`);
    } catch (error) {
      return setLoginError(error);
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <form className={style.loginContainer}>
        <input
          ref={refUsername}
          className={style.inputText}
          type="text"
          name="username"
          placeholder="Username"
        />
        <input
          ref={refPassword}
          className={style.inputText}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button onClick={inputValidation} type="button">
          Login
        </button>
        {loginError && <p>{loginError}</p>}
      </form>
    </>
  );
};

export default Login;
