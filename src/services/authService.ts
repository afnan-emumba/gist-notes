import { signInWithPopup, GithubAuthProvider, User } from "firebase/auth";
import { auth, provider } from "../utils/firebaseConfig";

export const githubLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;
    if (!token) return null;

    console.log(token);
    localStorage.setItem("token", token);

    const user: User = result.user;
    console.log(user);

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
