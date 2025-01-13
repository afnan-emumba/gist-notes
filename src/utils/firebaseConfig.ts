import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "gist-notes-afnan.firebaseapp.com",
  projectId: "gist-notes-afnan",
  storageBucket: "gist-notes-afnan.firebasestorage.app",
  messagingSenderId: "551656089533",
  appId: "1:551656089533:web:4ec6f19dea0e6346e514d4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GithubAuthProvider();
provider.addScope("gist");

export const LoginWithGithub = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      if (!token) return;

      console.log(token);

      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
};
