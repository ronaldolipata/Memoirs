import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { UserContext } from '@/UserContext';
import style from '@/components/UpdatePost/style.module.css';
import NavBar from '@/components/NavBar';

const UpdatePost = () => {
  const { user, posts, userId, username } = useContext(UserContext);

  const location = useLocation();
  const { previousTitle, previousContent, imageUrl } = location.state;

  const [title, setTitle] = useState(previousTitle);
  const [content, setContent] = useState(previousContent);

  const { postId } = useParams();

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
      await fetch(`http://localhost:5000/api/v1/posts/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'X-USER-ID': userId.toString(),
          'X-POST-ID': postId.toString(),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const action = `/${username}/post`;

  // useEffect(() => {
  //   getUserProfile(username);
  // }, [username]);

  return (
    <>
      <NavBar></NavBar>
      <p className={style.formTitle}>Update post</p>
      <form
        className={style.createPostContainer}
        method="POST"
        action={action}
        encType="multipart/form-data"
      >
        <img className={style.image} src={imageUrl} alt="image post" />
        <div className={style.rightSide}>
          <input
            className={style.inputText}
            onChange={titleOnChange}
            type="text"
            // placeholder={previousTitle}
            defaultValue={title}
          />
          <textarea
            className={style.textArea}
            onChange={contentOnChange}
            name="content"
            id="content"
            cols="30"
            rows="10"
            // placeholder={previousContent}
            defaultValue={content}
          ></textarea>
          <button onClick={updatePost} type="button">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdatePost;
