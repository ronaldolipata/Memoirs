import { useState, useRef, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '@/UserContext';
import style from '@/components/Login/style.module.css';
import NavBar from '@/components/NavBar';

const Login = () => {
  const {
    appendUserDetails,
    appendUserPosts,
    appendUserId,
    appendUsername,
    appendUsernameParams,
  } = useContext(UserContext);

  const [error, setError] = useState();

  const refUsername = useRef(null);
  const refPassword = useRef(null);

  const navigate = useNavigate();

  const inputValidation = () => {
    if (refUsername.current.value === '') {
      return setError('Please enter your username.');
    }

    if (refPassword.current.value === '') {
      return setError('Please enter your password.');
    }

    loginUser(refUsername.current.value, refPassword.current.value);
  };

  const loginUser = async (username, password) => {
    try {
      const response = await fetch(
        `https://memoirs.onrender.com/api/v1/users/login`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-USERNAME': username,
            'X-PASSWORD': password,
          },
        }
      );
      const data = await response.json();

      if (data.Error === 'No User found') {
        return setError('Invalid Username');
      }

      if (data.Error === 'Invalid password') {
        return setError('Invalid Password');
      }

      if (data.Message === 'Successfully logged in') {
        // Fetch User data based in the Username
        try {
          const response = await fetch(
            `https://memoirs.onrender.com/api/v1/users/${username}?limit=6&offset=0`
          );
          const data = await response.json();

          // Save User's data to UserContext
          appendUserDetails(data.userDetails);
          appendUserPosts(data.userPosts);
          appendUserId(data.userDetails.userId);
          appendUsername(data.userDetails.username);
          appendUsernameParams(data.userDetails.username);

          setError(null);

          // Navigate to User profile once logged in
          navigate(`/${refUsername.current.value}`);
        } catch (error) {
          return setError(error);
        }
      }
    } catch (error) {
      return setError(error);
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
        <div>
          <button onClick={inputValidation} type="button">
            Login
          </button>
          <Link to="/register">Register</Link>
        </div>
        {error && <p className={style.error}>{error}</p>}
      </form>
    </>
  );
};

export default Login;
