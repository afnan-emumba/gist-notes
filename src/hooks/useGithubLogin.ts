import { useDispatch } from "react-redux";
import { signInWithPopup, GithubAuthProvider, User } from "firebase/auth";
import { setUser } from "../redux/slices/userSlice";
import { auth, provider } from "../utils/firebaseConfig";

const useGithubLogin = () => {
  const dispatch = useDispatch();

  const handleGithubLogin = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        if (!token) return;

        console.log(token);
        localStorage.setItem("token", token);

        const user: User = result.user;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(setUser(user));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { handleGithubLogin };
};

export default useGithubLogin;
