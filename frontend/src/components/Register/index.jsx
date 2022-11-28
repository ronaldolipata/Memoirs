import { useState } from 'react';
import style from '@/components/Register/style.module.css';
import NavBar from '@/components/NavBar';

const Register = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState();

  const firstNameOnChange = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameOnChange = (event) => {
    setLastName(event.target.value);
  };

  const usernameOnChange = (event) => {
    setUsername(event.target.value);
  };

  const passwordOnChange = (event) => {
    setPassword(event.target.value);
  };

  const emailOnChange = (event) => {
    setEmail(event.target.value);
  };

  const fileOnChange = (event) => {
    const file = event.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const createUser = async () => {
    const formData = {
      firstName,
      lastName,
      username,
      password,
      email,
      image,
    };

    try {
      await fetch(`http://localhost:5000/api/v1/users/register`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <form className={style.registerContainer}>
        <input
          onChange={firstNameOnChange}
          className={style.inputText}
          type="text"
          name="firstName"
          placeholder="First name"
        />
        <input
          onChange={lastNameOnChange}
          className={style.inputText}
          type="text"
          name="lastName"
          placeholder="Last name"
        />
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
        <input
          onChange={emailOnChange}
          className={style.inputText}
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          className={style.inputFile}
          onChange={fileOnChange}
          type="file"
          name="image"
        />
        <button onClick={createUser} type="button">
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
