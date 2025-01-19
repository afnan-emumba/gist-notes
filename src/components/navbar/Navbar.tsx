import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Avatar, Dropdown, MenuProps, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { clearUser } from "../../redux/slices/userSlice";
import useGithubLogin from "../../hooks/useGithubLogin";
import Logo from "../../assets/Emumba-logo.svg";
import { SearchIconNav } from "../../assets/icons";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const { handleGithubLogin } = useGithubLogin();
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const inputElement = event.target as HTMLInputElement;
      const gistId = inputElement.value;
      navigate(`/gists/${gistId}`);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div>
          <p>
            Signed in as <br />{" "}
          </p>
          <h3>{user?.displayName}</h3>
        </div>
      ),
      key: "name",
    },
    {
      type: "divider",
    },
    {
      label: <Link to='/my-gists/all'>Your Gists</Link>,
      key: "your-gists",
    },
    {
      label: <Link to='/my-gists/starred'>Starred Gists</Link>,
      key: "starred-gists",
    },
    {
      label: (
        <a href={`https://github.com/${user?.screenName}`} target='_blank'>
          Your Github Profile
        </a>
      ),
      key: "github-profile",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div
          style={{ border: "none", background: "none", cursor: "pointer" }}
          onClick={() => {
            dispatch(clearUser());
            navigate("/");
          }}
        >
          Sign out
        </div>
      ),
      key: "sign-out",
    },
  ];

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
          onKeyDown={handleSearch}
        />

        {user ? (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Space style={{ cursor: "pointer" }}>
              <Avatar size={40} src={user.photoUrl} />
            </Space>
          </Dropdown>
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
