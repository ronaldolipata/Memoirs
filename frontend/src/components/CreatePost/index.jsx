import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/UserContext';
import style from '@/components/CreatePost/style.module.css';
import NavBar from '@/components/NavBar';

const CreatePost = () => {
  const { userId, username, updateUserData } = useContext(UserContext);

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();

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

  const titleOnChange = (event) => {
    setTitle(event.target.value);
  };

  const contentOnChange = (event) => {
    setContent(event.target.value);
  };

  const uploadPost = async () => {
    const formData = {
      userId,
      username,
      title,
      content,
      image,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${username}/post`,
        {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
            'X-USER-ID': userId,
          },
        }
      );
      const data = await response.json();

      if (data.Error === 'Missing required parameter - file') {
        setError('Please upload a photo.');
      }

      if (data.Message === 'Successfully uploaded') {
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
      <form className={style.createPostContainer}>
        <p className={style.formTitle}>Post Memories or Tell Stories</p>
        <input
          className={style.inputText}
          onChange={titleOnChange}
          type="text"
          placeholder="Title"
        />
        <textarea
          className={style.textArea}
          onChange={contentOnChange}
          name="content"
          id="content"
          cols="30"
          rows="7"
          placeholder="Content"
        ></textarea>
        <input
          className={style.inputFile}
          onChange={fileOnChange}
          type="file"
          name="image"
        />
        <button onClick={uploadPost} type="button">
          Submit
        </button>
        {error && <p className={style.error}>{error}</p>}
      </form>
    </>
  );
};

export default CreatePost;
