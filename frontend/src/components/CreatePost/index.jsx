import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import style from '@/components/CreatePost/style.module.css';
import NavBar from '@/components/NavBar';
import { useEffect } from 'react';

const CreatePost = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const [userId, setUserId] = useState();

  const { username } = useParams();

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

  // Get limit and offset queries
  const search = useLocation().search;
  const limit = parseInt(new URLSearchParams(search).get('limit')) || 6;
  const offset = parseInt(new URLSearchParams(search).get('offset')) || 0;

  const getUserProfile = async (username, limit, offset) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${username}?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();
      setUserId(data.userDetails._id);
    } catch (error) {
      console.log(error);
    }
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
      await fetch(`http://localhost:5000/api/v1/users/${username}/post`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'X-USER-ID': userId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const action = `/${username}/post`;

  useEffect(() => {
    getUserProfile(username, limit, offset);
  }, [username]);

  return (
    <>
      <NavBar></NavBar>
      <form
        className={style.createPostContainer}
        // method="POST"
        // action={action}
        // encType="multipart/form-data"
      >
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
          rows="10"
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
      </form>
    </>
  );
};

export default CreatePost;
