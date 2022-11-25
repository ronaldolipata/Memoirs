import { useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { UserContext } from '@/UserContext';
import style from '@/components/UserProfile/style.module.css';
import UserPosts from '@/components/UserPosts';
import NavBar from '@/components/NavBar';

function UserProfile() {
  const { appendUserDetails, appendUserPosts, user, posts } =
    useContext(UserContext);

  const { username } = useParams();

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
      appendUserDetails(data.userDetails);
      appendUserPosts(data.userPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile(username, limit, offset);
  }, [username]);

  return (
    <>
      <NavBar></NavBar>
      <div className="container">
        <img
          src={user.imageUrl}
          alt="profile picture"
          className={style.profilePicture}
        />
        <div className={style.userDetails}>
          <p className={`${style.fontBold} ${style.name}`}>
            {user.firstName} {user.lastName}
          </p>
          <p className={style.username}>@{username}</p>
          <div className={`${style.flexRowCenter} ${style.followAndLikes}`}>
            <div>
              <p className={style.fontBold}>36</p>
              <p>Following</p>
            </div>
            <div>
              <p className={style.fontBold}>28</p>
              <p>Followers</p>
            </div>
            <div>
              <p className={style.fontBold}>1</p>
              <p>Like</p>
            </div>
          </div>
          <button type="button" className={style.editProfile}>
            Edit profile
          </button>
          <div className={style.bioContainer}>
            {user.bio === null ? (
              <p>Edit your profile to add bio</p>
            ) : (
              <p>{user.bio}</p>
            )}
          </div>
        </div>
        <div>
          {posts.length === 0 ? <p>No post available</p> : <UserPosts />}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
