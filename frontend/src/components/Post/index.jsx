import { useState } from 'react';
import { useParams } from 'react-router-dom';
import style from '@/components/Post/style.module.css';
import NavBar from '@/components/NavBar';

const Post = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();

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

  const uploadPost = async () => {
    const formData = {
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
          'X-USER-ID': '637e9721ee5d1bd3242dfc94',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const action = `/${username}/post`;

  return (
    <>
      <NavBar></NavBar>
      <form
        className={style.postContainer}
        method="POST"
        action={action}
        encType="multipart/form-data"
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

export default Post;
