import style from '@/components/NavBar/style.module.css';

const NavBar = () => {
  return (
    <div className={style.navContainer}>
      <nav className={style.nav}>
        <p className={style.logo}>Memoirs</p>
        <div className={style.navRightSide}>
          <input
            className={style.searchInput}
            type="text"
            placeholder="Search username"
          />
          <button type="button">Upload</button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
