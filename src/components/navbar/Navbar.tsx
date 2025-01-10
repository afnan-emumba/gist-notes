import { Button } from "antd";
import Logo from "../../assets/Emumba-logo.svg";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <img src={Logo} alt='emumba-logo' />
      <div className={styles.navItems}>
        <p>Search bar</p>
        <Button
          type='primary'
          style={{
            backgroundColor: "white",
            color: "#003B44",
            height: "40px",
            fontWeight: "bold",
          }}
        >
          Login
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
