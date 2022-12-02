import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/UserContext';
import style from '@/components/Register/style.module.css';
import NavBar from '@/components/NavBar';

const Register = () => {
  const { updateUserData, userId } = useContext(UserContext);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();

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
      const response = await fetch(
        `http://localhost:5000/api/v1/users/register`,
        {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();

      if (data.Error === 'Missing required parameter - file') {
        return setError('Please upload a profile picture.');
      }

      if (data.Error) {
        return setError(data.Error);
      }

      if (data.Message === 'Successfully registered') {
        // Update User Data to UserContext
        updateUserData(username);
        // Navigate to User profile after uploading
        navigate(`/${username}`);
      }
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
        {userId && (
          <input
            onChange={emailOnChange}
            className={style.inputText}
            type="text"
            name="bio"
            placeholder="Bio"
          />
        )}
        <input
          className={style.inputFile}
          onChange={fileOnChange}
          type="file"
          name="image"
        />
        <button onClick={createUser} type="button">
          Register
        </button>
        {error && <p className={style.error}>{error}</p>}
      </form>
    </>
  );
};

export default Register;
