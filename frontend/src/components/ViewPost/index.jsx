import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '@/UserContext';
import style from '@/components/ViewPost/style.module.css';
import NavBar from '@/components/NavBar';

const ViewPost = () => {
  const { userId, username } = useContext(UserContext);

  const { usernameParams } = useParams();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [imageUrl, setImageUrl] = useState();

  const { postId } = useParams();

  const getPostData = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/posts/${postId}`
      );
      const data = await response.json();
      setTitle(data.title);
      setContent(data.content);
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    try {
      await fetch(`http://localhost:5000/api/v1/posts/${postId}`, {
        method: 'DELETE',
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

  useEffect(() => {
    getPostData(postId);
  }, [username]);

  return (
    <>
      <NavBar></NavBar>
      <div className={style.postContainer}>
        <img className={style.image} src={imageUrl} alt="post picture" />
        <div>
          <h1>{title}</h1>
          <p>{content}</p>
          <p>Author: @{usernameParams}</p>
          {username && (
            <>
              <Link
                className={style.editPostLink}
                state={{
                  previousTitle: title,
                  previousContent: content,
                  imageUrl: imageUrl,
                }}
                to="update"
              >
                Edit post
              </Link>
              <button
                onClick={deletePost}
                className={style.editPost}
                type="button"
              >
                Delete post
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewPost;
