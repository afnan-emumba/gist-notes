import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth, provider } from "../utils/firebaseConfig";

const useGithubLogin = () => {
  const dispatch = useDispatch();

  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      if (!token) return null;

      console.log(token);
      localStorage.setItem("token", token);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user = result.user as any;
      const { email, photoUrl, screenName } = user.reloadUserInfo;
      const displayName = user.displayName;
      localStorage.setItem(
        "user",
        JSON.stringify({ email, photoUrl, screenName, displayName })
      );

      if (user) {
        dispatch(setUser({ email, photoUrl, screenName, displayName }));
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { handleGithubLogin };
};

export default useGithubLogin;
