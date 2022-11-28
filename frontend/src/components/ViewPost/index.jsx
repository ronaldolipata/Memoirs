import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { UserContext } from '@/UserContext';
import style from '@/components/ViewPost/style.module.css';
import NavBar from '@/components/NavBar';

const ViewPost = () => {
  const {
    user,
    posts,
    userId,
    username,
    searchedUserId,
    searchedUsername,
    searchedUser,
    searchedUserPosts,
  } = useContext(UserContext);

  const { usernameParams } = useParams();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [imageUrl, setImageUrl] = useState();
  // const [userProfilePictureUrl, setUserProfilePictureUrl] = useState();
  // const [userId, setUserId] = useState();

  const { postId } = useParams();
  // const { username } = useParams();

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

  // Get limit and offset queries
  // const search = useLocation().search;
  // const limit = parseInt(new URLSearchParams(search).get('limit')) || 6;
  // const offset = parseInt(new URLSearchParams(search).get('offset')) || 0;

  // const getUserData = async (username, limit, offset) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/api/v1/users/${username}?limit=${limit}&offset=${offset}`
  //     );
  //     const data = await response.json();
  //     setUserId(data.userDetails._id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
    // getUserData(username, limit, offset);
  }, [username]);

  return (
    <>
      <NavBar></NavBar>
      <div className={style.postContainer}>
        <h1>{title}</h1>
        <img
          className={style.image}
          src={
            username !== null && searchedUsername === username
              ? posts.imageUrl
              : searchedUserPosts.imageUrl
          }
          alt="post picture"
        />
        <p>
          {username !== null && searchedUsername === username
            ? user.content
            : searchedUser.content}
        </p>
        <p>Author: @{usernameParams}</p>
        <button className={style.editPost} type="button">
          <Link
            className={style.editPostLink}
            state={{ oldTitle: title, oldContent: content }}
            to="update"
          >
            Edit post
          </Link>
        </button>
        <button onClick={deletePost} className={style.editPost} type="button">
          Delete post
        </button>
      </div>
    </>
  );
};

export default ViewPost;
