import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '@/UserContext';
import NavBar from '@/components/NavBar';
import PostPicture from '@/components/PostPicture';
import style from '@/components/UpdatePost/style.module.css';

const UpdatePost = () => {
  const { updateUserData, userId, username } = useContext(UserContext);

  // Get the details from the previous page
  const location = useLocation();
  const { previousTitle, previousContent, imageUrl, postId } = location.state;

  const [title, setTitle] = useState(previousTitle);
  const [content, setContent] = useState(previousContent);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const titleOnChange = (event) => {
    setTitle(event.target.value);
  };

  const contentOnChange = (event) => {
    setContent(event.target.value);
  };

  const updatePost = async () => {
    const formData = {
      userId,
      username,
      title,
      content,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/posts/${postId}`,
        {
          method: 'PATCH',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
            'X-USER-ID': userId,
            'X-POST-ID': postId,
          },
        }
      );
      const data = await response.json();

      if (data.Error) {
        return setError(data.Error);
      }

      if (data.Message === 'Post successfully updated') {
        // Update User Data to UserContext
        updateUserData(username);
        // Navigate to User profile after uploading
        navigate(`/${username}`);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <p className={style.formTitle}>Update post</p>
      <form className={style.createPostContainer}>
        <PostPicture imageUrl={imageUrl}></PostPicture>
        <div className={style.rightSide}>
          <input
            className={style.inputText}
            onChange={titleOnChange}
            type="text"
            defaultValue={title}
          />
          <textarea
            className={style.textArea}
            onChange={contentOnChange}
            name="content"
            id="content"
            cols="30"
            rows="10"
            defaultValue={content}
          ></textarea>
          <button onClick={updatePost} type="button">
            Submit
          </button>
          {error && <p className={style.error}>{error}</p>}
        </div>
      </form>
    </>
  );
};

export default UpdatePost;
