import { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '@/UserContext';
import style from '@/components/UserProfile/style.module.css';
import UserPosts from '@/components/UserPosts';
import NavBar from '@/components/NavBar';

function UserProfile() {
  const {
    user,
    appendSearchedUserDetails,
    appendSearchedUserPosts,
    appendSearchedUserId,
    appendSearchedUsername,
    searchedUser,
    searchedUsername,
  } = useContext(UserContext);

  const { firstName, lastName, username, password, email, imageUrl, bio } =
    user;

  const { usernameParams } = useParams();

  const [noUserFound, setNoUserFound] = useState();

  // Get user data if searched or enter username via URL
  const getUserProfile = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${username}?limit=6&offset=0`
      );
      const data = await response.json();

      if (data.Error === 'No User found') {
        return setNoUserFound(null);
      }

      // Save User's data to UserContext
      appendSearchedUserDetails(data.userDetails);
      appendSearchedUserPosts(data.userPosts);
      appendSearchedUserId(data.userDetails.userId);
      appendSearchedUsername(data.userDetails.username);
    } catch (error) {
      setNoUserFound(null);
    }
  };

  useEffect(() => {
    if (searchedUsername === undefined && username === null) {
      getUserProfile(usernameParams);
    }
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <div className={style.container}>
        {noUserFound === null ? (
          <p>No user found.</p>
        ) : (
          <>
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
              {username !== null && usernameParams === username ? (
                <Link
                  to="update"
                  state={{
                    previousFirstName: firstName,
                    previousLastName: lastName,
                    previousUsername: username,
                    previousPassword: password,
                    previousEmail: email,
                    previousImageUrl: imageUrl,
                    previousBio: bio,
                  }}
                  className={style.editProfile}
                >
                  Edit profile
                </Link>
              ) : null}
              <div className={style.bioContainer}>
                {username !== null && usernameParams === username ? (
                  user.bio === null ? (
                    <p>Edit your profile to add bio</p>
                  ) : (
                    <p>{user.bio}</p>
                  )
                ) : searchedUser.bio === null ? (
                  <p>No bio</p>
                ) : (
                  <p>{searchedUser.bio}</p>
                )}
              </div>
            </div>
            <UserPosts></UserPosts>
          </>
        )}
      </div>
    </>
  );
}

export default UserProfile;
