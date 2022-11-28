import { useState, useContext, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { UserContext } from '@/UserContext';
import style from '@/components/NavBar/style.module.css';

const NavBar = () => {
  const {
    appendSearchedUserDetails,
    appendSearchedUserPosts,
    appendSearchedUserId,
    appendSearchedUsername,
    username,
    searchedUserId,
  } = useContext(UserContext);

  // const [searchUsername, setSearchUsername] = useState();
  const refSearchUsername = useRef(null);

  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const homeNavigation = () => {
    navigate('/');
  };

  const uploadNavigation = () => {
    navigate(`/${username}/post`);
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
          {searchedUserId && (
            <button
              className={style.searchButton}
              onClick={uploadNavigation}
              type="button"
            >
              Upload
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
