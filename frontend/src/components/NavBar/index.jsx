import { useState, useContext, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { UserContext } from '@/UserContext';
import style from '@/components/NavBar/style.module.css';

const NavBar = () => {
  const {
    user,
    username,
    appendSearchedUserDetails,
    appendSearchedUserPosts,
    appendSearchedUserId,
    appendSearchedUsername,
    updateUserData,
  } = useContext(UserContext);

  const refSearchUsername = useRef(null);

  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const homeNavigation = () => {
    if (username === null) {
      return navigate('/');
    }
    // Update User Data to UserContext when logo is clicked
    updateUserData(username);
    navigate(`/${username}`);
  };

  const profileNavigation = () => {
    refSearchUsername.current.value = '';
    // Update User Data to UserContext when profile picture is clicked
    updateUserData(username);
    navigate(`/${username}`);
  };

  // Get limit and offset queries
  const search = useLocation().search;
  const limit = parseInt(new URLSearchParams(search).get('limit')) || 6;
  const offset = parseInt(new URLSearchParams(search).get('offset')) || 0;

  const getUserProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${refSearchUsername.current.value}?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();

      if (data.Error === 'No User found') {
        return setLoginError('Invalid Username');
      }

      // Save User's data to UserContext
      appendSearchedUserDetails(data.userDetails);
      appendSearchedUserPosts(data.userPosts);
      appendSearchedUserId(data.userDetails.userId);
      appendSearchedUsername(data.userDetails.username);

      setLoginError(null);

      // Navigate to User profile once logged in
      navigate(`/${refSearchUsername.current.value}`);
    } catch (error) {
      return setLoginError(error);
    }
  };

  return (
    <div className={style.navContainer}>
      <nav className={style.nav}>
        <p className={style.logo} onClick={homeNavigation}>
          Memoirs
        </p>
        <div className={style.navRightSide}>
          {loginError && <p>{loginError}</p>}
          <input
            ref={refSearchUsername}
            className={style.searchInput}
            type="text"
            placeholder="Search username"
          />
          <button
            className={style.searchButton}
            onClick={getUserProfile}
            type="button"
          >
            Search
          </button>

          {/* Show upload and user profile picture if logged in */}
          {username && (
            <>
              <Link to={`/${username}/post`} className={style.uploadLink}>
                Upload
              </Link>
              <img
                onClick={profileNavigation}
                src={user.imageUrl}
                alt="profile picture"
                className={style.profilePicture}
              />
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
