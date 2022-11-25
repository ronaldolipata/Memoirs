import style from '@/components/Login/style.module.css';
import NavBar from '@/components/NavBar';

const Login = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className={style.loginContainer}>
        <input
          className={style.inputText}
          type="text"
          name="username"
          placeholder="Username"
        />
        <input
          className={style.inputPassword}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </div>
    </>
  );
};

export default Login;
