import { Link } from "react-router-dom";
import { Button, Input } from "antd";
import useGithubLogin from "../../hooks/useGithubLogin";
import Logo from "../../assets/Emumba-logo.svg";
import { SearchIconNav } from "../../assets/icons";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const { handleGithubLogin } = useGithubLogin();

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
        <Button
          type='primary'
          className={styles.navButton}
          onClick={handleGithubLogin}
        >
          Login
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
