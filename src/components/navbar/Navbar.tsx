import { Link } from "react-router-dom";
import { Button, Input, Avatar } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useGithubLogin from "../../hooks/useGithubLogin";
import Logo from "../../assets/Emumba-logo.svg";
import { SearchIconNav } from "../../assets/icons";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const { handleGithubLogin } = useGithubLogin();
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <nav className={styles.navbar}>
      <Link to={"/"}>
        <img src={Logo} alt='emumba-logo' />
      </Link>

      <div className={styles.navItems}>
        <Input
          placeholder='Search gists...'
          prefix={<SearchIconNav />}
          className={styles.navSearch}
          variant='outlined'
        />

        {user ? (
          <div className={styles.userAvatar}>
            <Avatar size={40} src={user.photoURL} />
          </div>
        ) : (
          <Button
            type='primary'
            className={styles.navButton}
            onClick={handleGithubLogin}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
