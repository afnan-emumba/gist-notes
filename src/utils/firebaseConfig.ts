import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";

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
export const auth = getAuth(app);
export const provider = new GithubAuthProvider();
provider.addScope("gist");
