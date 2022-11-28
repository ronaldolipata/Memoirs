import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import style from '@/components/NavBar/style.module.css';

const NavBar = () => {
  const [searchUsername, setSearchUsername] = useState();
  const { username } = useParams();

  const searchUsernameOnChange = (event) => {
    setSearchUsername(event.target.value);
  };

  return (
    <div className={style.navContainer}>
      <nav className={style.nav}>
        <p className={style.logo}>Memoirs</p>
        <div className={style.navRightSide}>
          <input
            onChange={searchUsernameOnChange}
            className={style.searchInput}
            type="text"
            placeholder="Search username"
          />
          <button className={style.searchButton} type="button">
            <Link className={style.searchLink} to={`/${searchUsername}`}>
              Seach
            </Link>
          </button>
          <button className={style.searchButton} type="button">
            <Link to={`/${username}/post`}>Upload</Link>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
