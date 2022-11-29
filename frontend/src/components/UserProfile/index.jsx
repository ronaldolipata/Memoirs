import { useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { UserContext } from '@/UserContext';
import style from '@/components/UserProfile/style.module.css';
import UserPosts from '@/components/UserPosts';
import NavBar from '@/components/NavBar';

function UserProfile() {
  const {
    user,
    posts,
    userId,
    username,
    appendSearchedUserDetails,
    appendSearchedUserPosts,
    appendSearchedUserId,
    appendSearchedUsername,
    searchedUser,
    searchedUserPosts,
    searchedUsername,
  } = useContext(UserContext);

  const { usernameParams } = useParams();

  // Get limit and offset queries
  const search = useLocation().search;
  const limit = parseInt(new URLSearchParams(search).get('limit')) || 6;
  const offset = parseInt(new URLSearchParams(search).get('offset')) || 0;

  const getUserProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${usernameParams}?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();

      // if (data.Error === 'No User found') {
      //   return setLoginError('Invalid Username');
      // }

      // Save User's data to UserContext
      appendSearchedUserDetails(data.userDetails);
      appendSearchedUserPosts(data.userPosts);
      appendSearchedUserId(data.userDetails.userId);
      appendSearchedUsername(data.userDetails.username);
    } catch (error) {
      // return setLoginError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchedUsername && username === null) {
      getUserProfile();
    }
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <div className={style.container}>
        <img
          src={
            username !== null && usernameParams === username
              ? user.imageUrl
              : searchedUser.imageUrl
          }
          alt="profile picture"
          className={style.profilePicture}
        />
        <div className={style.userDetails}>
          <p className={`${style.fontBold} ${style.name}`}>
            {username !== null && usernameParams === username
              ? `${user.firstName} ${user.lastName}`
              : `${searchedUser.firstName} ${searchedUser.lastName}`}
          </p>
          <p className={style.username}>@{usernameParams}</p>
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
            {username !== null && usernameParams === username ? (
              user.bio === null ? (
                <p>Edit your profile to add bio</p>
              ) : (
                <p>{user.bio}</p>
              )
            ) : searchedUser.bio === null ? (
              <p>Edit your profile to add bio</p>
            ) : (
              <p>{searchedUser.bio}</p>
            )}
          </div>
        </div>
        <UserPosts></UserPosts>
      </div>
    </>
  );
}

export default UserProfile;
