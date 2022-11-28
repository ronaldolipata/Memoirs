import { useState } from 'react';
import style from '@/components/Login/style.module.css';
import NavBar from '@/components/NavBar';

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [hashedPassword, setHashedPassword] = useState();
  const [user, userDetails] = useState();

  const usernameOnChange = (event) => {
    setUsername(event.target.value);
  };

  const passwordOnChange = (event) => {
    setPassword(event.target.value);
  };

  const loginUser = async () => {
    // const formData = {
    //   username,
    //   password,
    // };

    try {
      await fetch(`http://localhost:5000/api/v1/users/login`);
      // const response = await fetch(`http://localhost:5000/api/v1/users/login`);
      // const data = await response.json();
      // userDetails(data.userDetails);
    } catch (error) {
      console.log(error);
    }

    // try {
    //   await fetch(`http://localhost:5000/api/v1/users/login`);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      <NavBar></NavBar>
      <form className={style.loginContainer}>
        <input
          onChange={usernameOnChange}
          className={style.inputText}
          type="text"
          name="username"
          placeholder="Username"
        />
        <input
          onChange={passwordOnChange}
          className={style.inputText}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button onClick={loginUser} type="button">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
