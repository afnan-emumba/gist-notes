import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { githubLogin } from "../services/authService";

const useGithubLogin = () => {
  const dispatch = useDispatch();

  const handleGithubLogin = async () => {
    try {
      const user = await githubLogin();
      if (user) {
        dispatch(setUser(user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { handleGithubLogin };
};

export default useGithubLogin;
