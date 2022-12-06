import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { UserContext } from '@/UserContext';
import NavBar from '@/components/NavBar';
import PostPicture from '@/components/PostPicture';
import style from '@/components/ViewPost/style.module.css';

const ViewPost = () => {
  const { userId, username, updateUserData } = useContext(UserContext);

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [error, setError] = useState(null);

  const { postId } = useParams();
  const { usernameParams } = useParams();

  const navigate = useNavigate();

  // Get Post details from clicked Post picture
  const getPostData = async (postId) => {
    try {
      const response = await fetch(
        `https://memoirs.onrender.com:5000/api/v1/posts/${postId}`
      );
      const data = await response.json();
      setTitle(data.title);
      setContent(data.content);
      setImageUrl(data.imageUrl);
    } catch (error) {
      setError(error);
    }
  };

  const deletePost = async () => {
    try {
      const response = await fetch(
        `https://memoirs.onrender.com:5000/api/v1/posts/${postId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-USER-ID': userId,
            'X-POST-ID': postId,
          },
        }
      );
      const data = await response.json();

      if (data.Error) {
        setError(data.Error);
      }

      if (data.Message === 'Post successfully deleted') {
        // Update User Data to UserContext
        updateUserData(username);
        // Navigate to User profile after uploading
        navigate(`/${username}`);
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getPostData(postId);
  }, [usernameParams, username]);

  return (
    <>
      <NavBar></NavBar>
      <div className={style.postContainer}>
        <PostPicture imageUrl={imageUrl}></PostPicture>
        <div>
          <h1>{title}</h1>
          <p>{content}</p>
          <p>Author: @{usernameParams}</p>
          {username !== usernameParams ? null : (
            <>
              <Link
                className={style.editPostLink}
                state={{
                  previousTitle: title,
                  previousContent: content,
                  imageUrl,
                  postId,
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
          {error && <p className={style.error}>{error}</p>}
        </div>
      </div>
    </>
  );
};

export default ViewPost;
