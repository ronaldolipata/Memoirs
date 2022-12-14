import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '@/UserContext';
import style from '@/components/UpdateProfile/style.module.css';
import NavBar from '@/components/NavBar';

const UpdateProfile = () => {
  const { updateUserData, userId } = useContext(UserContext);

  // Get the details from the previous page
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

  // Bind changes from inputs and assigned the the previous data as the initial value
  const [firstName, setFirstName] = useState(previousFirstName);
  const [lastName, setLastName] = useState(previousLastName);
  const [password, setPassword] = useState(previousPassword);
  const [image, setImage] = useState(null);
  const [bio, setBio] = useState(previousBio);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Use to disable Username and Email input
  const disabledInput = true;

  const firstNameOnChange = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameOnChange = (event) => {
    setLastName(event.target.value);
  };

  const passwordOnChange = (event) => {
    setPassword(event.target.value);
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
      username: previousUsername,
      password,
      email: previousEmail,
      image: previousImageUrl,
      bio,
    };

    if (image !== null) {
      formData.image = image;
    }

    try {
      const response = await fetch(
        `https://memoirs.onrender.com/api/v1/users/update`,
        {
          method: 'PATCH',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
            'X-USER-ID': userId,
          },
        }
      );
      const data = await response.json();

      if (data.Error) {
        setError(data.Error);
      }

      if (data.Message === 'User profile successfully updated') {
        // Update User Data to UserContext
        updateUserData(previousUsername);
        // Navigate to User profile after uploading
        navigate(`/${previousUsername}`);
      }
    } catch (error) {
      setError(error);
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
          className={style.inputText}
          type="text"
          name="username"
          defaultValue={previousUsername}
          disabled={disabledInput}
        />
        <input
          onChange={passwordOnChange}
          className={style.inputText}
          type="password"
          name="password"
          placeholder="Change password?"
        />
        <input
          className={style.inputText}
          type="email"
          name="email"
          defaultValue={previousEmail}
          disabled={disabledInput}
        />
        <input
          onChange={bioOnChange}
          className={style.inputText}
          type="text"
          name="bio"
          placeholder={bio === null ? 'Enter bio' : bio}
          defaultValue={bio}
        />
        <button onClick={updateUserProfile} type="button">
          Update profile
        </button>
        {error && <p className={style.error}>{error}</p>}
      </form>
    </>
  );
};

export default UpdateProfile;
