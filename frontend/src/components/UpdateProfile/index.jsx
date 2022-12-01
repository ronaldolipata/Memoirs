import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '@/UserContext';
import style from '@/components/UpdateProfile/style.module.css';
import NavBar from '@/components/NavBar';
import { useEffect } from 'react';

const UpdateProfile = () => {
  const { updateUserData, userId } = useContext(UserContext);

  const location = useLocation();
  const {
    previousFirstName,
    previousLastName,
    previousUsername,
    previousPassword,
    previousEmail,
    previousImageUrl,
    previousBio,
  } = location.state;

  const [firstName, setFirstName] = useState(previousFirstName);
  const [lastName, setLastName] = useState(previousLastName);
  const [username, setUsername] = useState(previousUsername);
  const [password, setPassword] = useState(previousPassword);
  const [email, setEmail] = useState(previousEmail);
  const [image, setImage] = useState(null);
  const [bio, setBio] = useState(previousBio);

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

  const bioOnChange = (event) => {
    setBio(event.target.value);
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

  const updateUserProfile = async () => {
    const formData = {
      firstName,
      lastName,
      username,
      password,
      email,
      image: previousImageUrl,
      bio,
    };

    if (image !== null) {
      formData.image = image;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/update`,
        {
          method: 'PATCH',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
            'X-USER-ID': userId.toString(),
          },
        }
      );
      const data = await response.json();

      if (data.Message === 'User profile successfully updated') {
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
      <form className={style.updateProfileContainer}>
        <img
          src={previousImageUrl}
          alt="profile picture"
          className={style.profilePicture}
        />
        <input
          className={style.inputFile}
          onChange={fileOnChange}
          type="file"
          name="image"
        />
        <input
          onChange={firstNameOnChange}
          className={style.inputText}
          type="text"
          name="firstName"
          defaultValue={firstName}
        />
        <input
          onChange={lastNameOnChange}
          className={style.inputText}
          type="text"
          name="lastName"
          defaultValue={lastName}
        />
        <input
          onChange={usernameOnChange}
          className={style.inputText}
          type="text"
          name="username"
          defaultValue={username}
        />
        <input
          onChange={passwordOnChange}
          className={style.inputText}
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <input
          onChange={emailOnChange}
          className={style.inputText}
          type="email"
          name="email"
          defaultValue={email}
        />
        {userId && (
          <input
            onChange={bioOnChange}
            className={style.inputText}
            type="text"
            name="bio"
            defaultValue={bio}
          />
        )}
        <button onClick={updateUserProfile} type="button">
          Update profile
        </button>
      </form>
    </>
  );
};

export default UpdateProfile;
