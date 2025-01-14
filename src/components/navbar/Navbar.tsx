import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "antd";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { User } from "firebase/auth";
import { auth, provider } from "../../utils/firebaseConfig";
import Logo from "../../assets/Emumba-logo.svg";
import { SearchIconNav } from "../../assets/icons";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleGithubLogin = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        if (!token) return;

        console.log(token);

        setUser(result.user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
