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

  const { postId } = useParams();
  const { usernameParams } = useParams();

  const navigate = useNavigate();

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
      const response = await fetch(
        `http://localhost:5000/api/v1/posts/${postId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-USER-ID': userId.toString(),
            'X-POST-ID': postId.toString(),
          },
        }
      );
      const data = await response.json();

      if (data.Message === 'Post successfully deleted') {
        // Update User Data to UserContext
        updateUserData(username);
        // Navigate to User profile after uploading
        navigate(`/${username}`);
      }
    } catch (error) {
      console.log(error);
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
